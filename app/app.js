import { createSession, passCurrent, failCurrent, prepareNextCard } from "./review.js";
import { loadStats, recordResult, resetStats } from "./storage.js";

const els = {
  deckTitle: document.querySelector("#deckTitle"),
  deckSelect: document.querySelector("#deckSelect"),
  newSessionButton: document.querySelector("#newSessionButton"),
  reviewPanel: document.querySelector("#reviewPanel"),
  completePanel: document.querySelector("#completePanel"),
  remaining: document.querySelector("#remaining"),
  sessionScore: document.querySelector("#sessionScore"),
  front: document.querySelector("#front"),
  back: document.querySelector("#back"),
  answerBlock: document.querySelector("#answerBlock"),
  showAnswerButton: document.querySelector("#showAnswerButton"),
  gradeButtons: document.querySelector("#gradeButtons"),
  passButton: document.querySelector("#passButton"),
  failButton: document.querySelector("#failButton"),
  exploreActions: document.querySelector("#exploreActions"),
  exploreCurrentButton: document.querySelector("#exploreCurrentButton"),
  relatedExploreLinks: document.querySelector("#relatedExploreLinks"),
  explorerDialog: document.querySelector("#explorerDialog"),
  explorerDialogTitle: document.querySelector("#explorerDialogTitle"),
  closeExplorerButton: document.querySelector("#closeExplorerButton"),
  explorerFrame: document.querySelector("#explorerFrame"),
  completeSummary: document.querySelector("#completeSummary"),
  restartButton: document.querySelector("#restartButton"),
  statsButton: document.querySelector("#statsButton"),
  statsDialog: document.querySelector("#statsDialog"),
  statsContent: document.querySelector("#statsContent"),
  closeStatsButton: document.querySelector("#closeStatsButton"),
  resetStatsButton: document.querySelector("#resetStatsButton")
};

let manifest;
let cards = [];
let cardMap = new Map();
let session;
let stats = loadStats();
let currentDeck;
let ochemLinkIndex = [];

const explicitOchemLinks = [
  ["axial methylcyclohexane", "c04-4-7-13-diaxial"],
  ["equatorial methylcyclohexane", "c04-4-7-equatorial-preference"],
  ["methylcyclohexane", "c04-4-7-methylcyclohexane-equilibrium"],
  ["axial methyl", "c04-4-7-13-diaxial"],
  ["equatorial methyl", "c04-4-7-equatorial-preference"],
  ["axial", "c04-4-6-axial-definition"],
  ["equatorial", "c04-4-6-equatorial-definition"],
  ["chirality", "ch2-chloromethane-polarity-sp3"],
  ["electronegativity", "ochem-ch02-001"],
  ["dipole", "ochem-ch02-009"],
  ["resonance", "ochem-ch02-024"],
  ["formal charge", "ochem-ch02-016"]
];

function appendTextAndMath(element, text) {
  if (!text) return;
  const parts = text.split(/(\$[^$]+\$)/g);
  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith("$") && part.endsWith("$") && window.katex) {
      const span = document.createElement("span");
      try {
        katex.render(part.slice(1, -1), span, { throwOnError: false });
      } catch {
        span.textContent = part;
      }
      element.append(span);
    } else {
      element.append(document.createTextNode(part));
    }
  }
}

function appendImage(element, alt, src) {
  const figure = document.createElement("figure");
  figure.className = "card-figure";

  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.loading = "lazy";
  figure.append(image);

  if (alt) {
    const caption = document.createElement("figcaption");
    caption.textContent = alt;
    figure.append(caption);
  }

  element.append(figure);
}

function appendInlineExploreButton(element, term, cardId) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "inline-explore-link";
  button.textContent = term;
  button.title = "Open explorer view";
  button.addEventListener("click", () => openExplorer(cardId));
  element.append(button);
}

function appendTextMathAndExploreLinks(element, text, enableExploreLinks = false) {
  if (!enableExploreLinks) {
    appendTextAndMath(element, text);
    return;
  }

  const matches = [];
  const lowerText = text.toLowerCase();
  for (const entry of ochemLinkIndex) {
    const lowerTerm = entry.term.toLowerCase();
    let start = lowerText.indexOf(lowerTerm);
    while (start !== -1) {
      const end = start + lowerTerm.length;
      const before = text[start - 1] || " ";
      const after = text[end] || " ";
      if (!/[A-Za-z0-9-]/.test(before) && !/[A-Za-z0-9-]/.test(after)) {
        matches.push({ start, end, term: text.slice(start, end), cardId: entry.cardId });
        break;
      }
      start = lowerText.indexOf(lowerTerm, start + 1);
    }
  }

  matches.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
  const accepted = [];
  let cursor = -1;
  for (const match of matches) {
    if (match.start >= cursor) {
      accepted.push(match);
      cursor = match.end;
    }
  }

  let position = 0;
  for (const match of accepted) {
    appendTextAndMath(element, text.slice(position, match.start));
    appendInlineExploreButton(element, match.term, match.cardId);
    position = match.end;
  }
  appendTextAndMath(element, text.slice(position));
}

function renderCardTextInto(element, text, options = {}) {
  element.textContent = "";
  const parts = text.split(/(!\[[^\]]*]\([^)]+\))/g);
  for (const part of parts) {
    const image = part.match(/^!\[([^\]]*)]\(([^)]+)\)$/);
    if (image) {
      appendImage(element, image[1], image[2]);
    } else {
      appendTextMathAndExploreLinks(element, part, options.exploreLinks);
    }
  }
}

async function loadJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error("Could not load " + path);
  return response.json();
}

async function loadDeck(deckId) {
  currentDeck = manifest.decks.find(deck => deck.id === deckId);
  const payload = await loadJson("../" + currentDeck.file);
  cards = Array.isArray(payload) ? payload : payload.cards;
  cardMap = new Map(cards.map(card => [card.id, card]));
  buildOchemLinkIndex();
  els.deckTitle.textContent = currentDeck.title;
  startSession();
}

function startSession() {
  session = createSession(cards);
  els.reviewPanel.classList.remove("hidden");
  els.completePanel.classList.add("hidden");
  showCurrent();
}

function currentCard() {
  return cardMap.get(session.queue[0]);
}

function isOchemDeck() {
  return currentDeck?.track === "ochem";
}

function buildOchemLinkIndex() {
  if (!isOchemDeck()) {
    ochemLinkIndex = [];
    return;
  }

  const entries = new Map();
  for (const [term, cardId] of explicitOchemLinks) {
    if (cardMap.has(cardId)) entries.set(term.toLowerCase(), { term, cardId });
  }

  for (const card of cards) {
    const candidates = [card.title, card.topic, card.molecule?.name].filter(Boolean);
    for (const term of candidates) {
      const clean = term.replace(/: .*/, "").trim();
      if (clean.length >= 8 && clean.length <= 42) {
        entries.set(clean.toLowerCase(), { term: clean, cardId: card.id });
      }
    }
  }

  ochemLinkIndex = [...entries.values()]
    .sort((a, b) => b.term.length - a.term.length)
    .slice(0, 180);
}

function relatedExplorerTargets(card) {
  if (!isOchemDeck()) return [];
  const text = `${card.title} ${card.topic || ""} ${card.front || ""} ${card.back || ""}`.toLowerCase();
  const seen = new Set([card.id]);
  const targets = [];

  for (const entry of ochemLinkIndex) {
    if (targets.length >= 5) break;
    if (seen.has(entry.cardId)) continue;
    if (text.includes(entry.term.toLowerCase())) {
      seen.add(entry.cardId);
      targets.push(entry);
    }
  }
  return targets;
}

function renderExploreActions(card) {
  els.relatedExploreLinks.textContent = "";
  els.exploreActions.classList.toggle("hidden", !isOchemDeck());
  if (!isOchemDeck()) return;

  els.exploreCurrentButton.textContent = "Explore This Card";

  for (const target of relatedExplorerTargets(card)) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "related-explore-link";
    button.textContent = target.term;
    button.addEventListener("click", () => openExplorer(target.cardId));
    els.relatedExploreLinks.append(button);
  }
}

function openExplorer(cardId) {
  const card = cardMap.get(cardId);
  els.explorerDialogTitle.textContent = card?.title || "Organic Chemistry Explorer";
  els.explorerFrame.src = `../ochem/explorer/?card=${encodeURIComponent(cardId)}`;
  els.explorerDialog.showModal();
}

function showCurrent() {
  if (!prepareNextCard(session)) {
    finishSession();
    return;
  }

  const card = currentCard();
  renderCardTextInto(els.front, card.front, { exploreLinks: isOchemDeck() });
  renderCardTextInto(els.back, card.back, { exploreLinks: isOchemDeck() });
  renderExploreActions(card);

  els.answerBlock.classList.add("hidden");
  els.gradeButtons.classList.add("hidden");
  els.showAnswerButton.classList.remove("hidden");
  const waiting = session.retryQueue.length;
  els.remaining.textContent =
    session.queue.length + " remaining" +
    (waiting ? " / " + waiting + " retry later" : "");
  els.sessionScore.textContent = session.passed + " pass / " + session.failed + " fail";
}

function revealAnswer() {
  els.answerBlock.classList.remove("hidden");
  els.gradeButtons.classList.remove("hidden");
  els.showAnswerButton.classList.add("hidden");
  els.exploreActions.classList.toggle("hidden", !isOchemDeck());
}

function grade(result) {
  const card = currentCard();
  recordResult(stats, card.id, result);

  if (result === "pass") passCurrent(session);
  else failCurrent(session);

  showCurrent();
}

function finishSession() {
  els.reviewPanel.classList.add("hidden");
  els.completePanel.classList.remove("hidden");
  els.completeSummary.textContent =
    "Passed all " + cards.length + " cards. " +
    session.failed + " failed attempt" + (session.failed === 1 ? "" : "s") +
    " were recycled during the session.";
}

function renderStats() {
  const ids = cards.map(card => card.id);
  const deckStats = ids.map(id => stats[id]).filter(Boolean);
  const seen = deckStats.reduce((n, s) => n + s.seen, 0);
  const passed = deckStats.reduce((n, s) => n + s.passed, 0);
  const failed = deckStats.reduce((n, s) => n + s.failed, 0);
  const rate = seen ? Math.round((passed / seen) * 100) : 0;

  els.statsContent.innerHTML = `
    <p class="muted">${currentDeck?.title || ""}</p>
    <div class="stat-grid">
      <div class="stat-box"><strong>${seen}</strong><br>Attempts</div>
      <div class="stat-box"><strong>${passed}</strong><br>Passes</div>
      <div class="stat-box"><strong>${failed}</strong><br>Fails</div>
      <div class="stat-box"><strong>${rate}%</strong><br>Pass rate</div>
      <div class="stat-box"><strong>${deckStats.length}</strong><br>Cards seen</div>
      <div class="stat-box"><strong>${cards.length}</strong><br>Deck size</div>
    </div>`;
}

async function init() {
  manifest = await loadJson("../card-index.json");
  for (const deck of manifest.decks) {
    const option = document.createElement("option");
    option.value = deck.id;
    option.textContent = deck.title;
    els.deckSelect.append(option);
  }
  await loadDeck(manifest.decks[0].id);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
      .then(registration => registration.update())
      .catch(() => {});
  }
}

els.showAnswerButton.addEventListener("click", revealAnswer);
els.passButton.addEventListener("click", () => grade("pass"));
els.failButton.addEventListener("click", () => grade("fail"));
els.newSessionButton.addEventListener("click", startSession);
els.restartButton.addEventListener("click", startSession);
els.deckSelect.addEventListener("change", event => loadDeck(event.target.value));
els.statsButton.addEventListener("click", () => {
  renderStats();
  els.statsDialog.showModal();
});
els.closeStatsButton.addEventListener("click", () => els.statsDialog.close());
els.resetStatsButton.addEventListener("click", () => {
  if (confirm("Reset all locally stored review statistics?")) {
    resetStats();
    stats = {};
    renderStats();
  }
});
els.exploreCurrentButton.addEventListener("click", () => {
  const card = currentCard();
  if (card) openExplorer(card.id);
});
els.closeExplorerButton.addEventListener("click", () => {
  els.explorerDialog.close();
  els.explorerFrame.src = "about:blank";
});

init().catch(error => {
  els.deckTitle.textContent = "Load error";
  els.front.textContent = error.message;
});
