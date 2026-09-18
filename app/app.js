import { createSession, passCurrent, failCurrent } from "./review.js";
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

function renderMathInto(element, text) {
  element.textContent = "";
  const parts = text.split(/(\$[^$]+\$)/g);
  for (const part of parts) {
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

async function loadJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error("Could not load " + path);
  return response.json();
}

async function loadDeck(deckId) {
  currentDeck = manifest.decks.find(deck => deck.id === deckId);
  cards = await loadJson("../" + currentDeck.file);
  cardMap = new Map(cards.map(card => [card.id, card]));
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

function showCurrent() {
  if (session.queue.length === 0) {
    finishSession();
    return;
  }

  const card = currentCard();
  renderMathInto(els.front, card.front);
  renderMathInto(els.back, card.back);

  els.answerBlock.classList.add("hidden");
  els.gradeButtons.classList.add("hidden");
  els.showAnswerButton.classList.remove("hidden");
  els.remaining.textContent = session.queue.length + " remaining";
  els.sessionScore.textContent = session.passed + " pass / " + session.failed + " fail";
}

function revealAnswer() {
  els.answerBlock.classList.remove("hidden");
  els.gradeButtons.classList.remove("hidden");
  els.showAnswerButton.classList.add("hidden");
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
    navigator.serviceWorker.register("./sw.js").catch(() => {});
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

init().catch(error => {
  els.deckTitle.textContent = "Load error";
  els.front.textContent = error.message;
});