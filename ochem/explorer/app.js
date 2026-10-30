const state = {
  cards: [],
  current: null,
  mode: "explore",
  representation: "regular-ball-stick",
  rotation: { x: -0.35, y: 0.75 },
  pan: { x: 0, y: 0 },
  interaction: "rotate",
  dragging: false,
  lastPointer: null
};

const els = {
  searchInput: document.querySelector("#searchInput"),
  cardList: document.querySelector("#cardList"),
  sectionLabel: document.querySelector("#sectionLabel"),
  cardTitle: document.querySelector("#cardTitle"),
  geometryLabel: document.querySelector("#geometryLabel"),
  tagLabel: document.querySelector("#tagLabel"),
  structureImage: document.querySelector("#structureImage"),
  formulaList: document.querySelector("#formulaList"),
  reactionList: document.querySelector("#reactionList"),
  factList: document.querySelector("#factList"),
  frontText: document.querySelector("#frontText"),
  backText: document.querySelector("#backText"),
  promptList: document.querySelector("#promptList"),
  exploreMode: document.querySelector("#exploreMode"),
  flashcardMode: document.querySelector("#flashcardMode"),
  moleculeCanvas: document.querySelector("#moleculeCanvas"),
  representationSelect: document.querySelector("#representationSelect"),
  quickControls: document.querySelector("#quickControls"),
  viewExplanation: document.querySelector("#viewExplanation"),
  resetViewButton: document.querySelector("#resetViewButton"),
  rotateToolButton: document.querySelector("#rotateToolButton"),
  panToolButton: document.querySelector("#panToolButton"),
  dragHint: document.querySelector("#dragHint"),
  modeButtons: [...document.querySelectorAll(".mode-button")]
};

// Standard CPK-style colors for organic chemistry models.
const atomStyles = {
  C: { color: "#2b2f33", stroke: "#111827", label: "#ffffff", radius: 25 },
  H: { color: "#ffffff", stroke: "#a8b3c2", label: "#1f2937", radius: 17 },
  N: { color: "#2563eb", stroke: "#1d4ed8", label: "#ffffff", radius: 22 },
  O: { color: "#dc2626", stroke: "#991b1b", label: "#ffffff", radius: 22 },
  F: { color: "#86efac", stroke: "#16a34a", label: "#052e16", radius: 21 },
  Cl: { color: "#22c55e", stroke: "#15803d", label: "#052e16", radius: 31 },
  Br: { color: "#8b4513", stroke: "#5f2f0d", label: "#ffffff", radius: 32 },
  I: { color: "#7c3aed", stroke: "#5b21b6", label: "#ffffff", radius: 34 },
  S: { color: "#facc15", stroke: "#ca8a04", label: "#1f2937", radius: 26 },
  P: { color: "#f97316", stroke: "#c2410c", label: "#ffffff", radius: 27 }
};

const chiralPair = {
  left: [
    { id: "C", element: "C", label: "C*", position: [0, 0, 0] },
    { id: "Cl", element: "Cl", label: "Cl", position: [1.25, 0.15, 0.1] },
    { id: "Br", element: "Br", label: "Br", position: [-0.55, 1.05, 0.7] },
    { id: "F", element: "F", label: "F", position: [-0.55, -1.0, 0.7] },
    { id: "H", element: "H", label: "H", position: [-0.55, -0.1, -1.15] }
  ],
  right: [
    { id: "C", element: "C", label: "C*", position: [0, 0, 0] },
    { id: "Cl", element: "Cl", label: "Cl", position: [-1.25, 0.15, 0.1] },
    { id: "Br", element: "Br", label: "Br", position: [0.55, 1.05, 0.7] },
    { id: "F", element: "F", label: "F", position: [0.55, -1.0, 0.7] },
    { id: "H", element: "H", label: "H", position: [0.55, -0.1, -1.15] }
  ],
  bonds: [["C", "Cl"], ["C", "Br"], ["C", "F"], ["C", "H"]]
};

function renderChem(target, latex) {
  target.textContent = "";
  if (window.katex) {
    katex.render(latex, target, { throwOnError: false });
  } else {
    target.textContent = latex;
  }
}

function searchableText(card) {
  return [
    card.title,
    card.topic,
    card.front,
    card.back,
    ...(card.tags || []),
    ...(card.facts || [])
  ].join(" ").toLowerCase();
}

function renderCardList() {
  const query = els.searchInput.value.trim().toLowerCase();
  const cards = state.cards.filter(card => searchableText(card).includes(query));
  els.cardList.textContent = "";

  for (const card of cards) {
    const button = document.createElement("button");
    button.className = "nav-card" + (state.current?.id === card.id ? " active" : "");
    button.type = "button";
    const title = document.createElement("strong");
    title.textContent = card.title;
    const meta = document.createElement("span");
    meta.textContent = `Chapter ${card.chapter} · ${card.topic}`;
    button.append(title, document.createElement("br"), meta);
    button.addEventListener("click", () => selectCard(card.id));
    els.cardList.append(button);
  }
}

function selectCard(id) {
  state.current = state.cards.find(card => card.id === id) || state.cards[0];
  state.representation = state.current.representations?.[0]?.id || "regular-ball-stick";
  resetViewState();
  renderCardList();
  renderCard();
}

function setMode(mode) {
  state.mode = mode;
  els.exploreMode.classList.toggle("hidden", mode !== "explore");
  els.flashcardMode.classList.toggle("hidden", mode !== "flashcard");
  for (const button of els.modeButtons) {
    button.classList.toggle("active", button.dataset.mode === mode);
  }
  drawMolecule();
}

function currentRepresentation() {
  return (state.current?.representations || []).find(view => view.id === state.representation);
}

function renderRepresentationOptions() {
  const views = state.current?.representations || [];
  els.representationSelect.textContent = "";
  els.quickControls.textContent = "";
  for (const view of views) {
    const option = document.createElement("option");
    option.value = view.id;
    option.textContent = view.label;
    els.representationSelect.append(option);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "quick-control" + (view.id === state.representation ? " active" : "");
    button.textContent = view.label;
    button.addEventListener("click", () => setRepresentation(view.id));
    els.quickControls.append(button);
  }
  els.representationSelect.value = state.representation;
  els.viewExplanation.textContent = currentRepresentation()?.explanation || "";
}

function setRepresentation(id) {
  state.representation = id;
  els.representationSelect.value = id;
  for (const button of els.quickControls.querySelectorAll(".quick-control")) {
    button.classList.toggle("active", button.textContent === currentRepresentation()?.label);
  }
  els.viewExplanation.textContent = currentRepresentation()?.explanation || "";
  drawMolecule();
}

function resetViewState() {
  state.rotation = { x: -0.35, y: 0.75 };
  state.pan = { x: 0, y: 0 };
}

function setInteraction(interaction) {
  state.interaction = interaction;
  els.rotateToolButton.classList.toggle("active", interaction === "rotate");
  els.panToolButton.classList.toggle("active", interaction === "pan");
  els.dragHint.textContent = interaction === "pan" ? "Drag to pan" : "Drag to rotate";
}

function renderCard() {
  const card = state.current;
  if (!card) return;
  const molecule = card.molecule;

  els.sectionLabel.textContent = `Chapter ${card.chapter} · Section ${card.section}`;
  els.cardTitle.textContent = card.title;
  els.geometryLabel.textContent = `${molecule.hybridization} · ${molecule.bond_angle}`;
  els.tagLabel.textContent = card.tags.slice(0, 3).join(" · ");
  els.structureImage.src = card.assets.structure_svg;
  els.structureImage.alt = `${molecule.name} structure`;
  els.frontText.textContent = card.front;
  els.backText.textContent = card.back;
  renderRepresentationOptions();

  els.formulaList.textContent = "";
  for (const formula of card.formulas) {
    const item = document.createElement("div");
    item.className = "formula-card";
    const label = document.createElement("strong");
    label.textContent = formula.label;
    const rendered = document.createElement("span");
    renderChem(rendered, formula.latex);
    item.append(label, rendered);
    els.formulaList.append(item);
  }

  els.reactionList.textContent = "";
  for (const reaction of card.reactions) {
    const item = document.createElement("div");
    item.className = "reaction-card";
    const label = document.createElement("strong");
    label.textContent = reaction.label;
    item.append(label);
    for (const line of reaction.lines) {
      const rendered = document.createElement("span");
      rendered.className = "chem-line";
      renderChem(rendered, line);
      item.append(rendered);
    }
    els.reactionList.append(item);
  }

  els.factList.textContent = "";
  for (const fact of card.facts) {
    const item = document.createElement("li");
    item.textContent = fact;
    els.factList.append(item);
  }

  els.promptList.textContent = "";
  for (const prompt of card.prompts) {
    const item = document.createElement("div");
    item.className = "prompt-card";
    const kind = document.createElement("strong");
    kind.textContent = prompt.kind;
    const question = document.createElement("div");
    question.textContent = prompt.question;
    const answer = document.createElement("div");
    answer.textContent = prompt.answer;
    item.append(kind, question, answer);
    els.promptList.append(item);
  }

  drawMolecule();
}

function rotatePoint([x, y, z]) {
  const cosY = Math.cos(state.rotation.y);
  const sinY = Math.sin(state.rotation.y);
  const cosX = Math.cos(state.rotation.x);
  const sinX = Math.sin(state.rotation.x);

  const x1 = x * cosY - z * sinY;
  const z1 = x * sinY + z * cosY;
  const y1 = y * cosX - z1 * sinX;
  const z2 = y * sinX + z1 * cosX;
  return [x1, y1, z2];
}

function project(point, width, height, options = {}) {
  const [x, y, z] = rotatePoint(point);
  const depth = options.depth || 4.6;
  const base = options.scale || 138;
  const offsetX = options.offsetX || 0;
  const offsetY = options.offsetY || 0;
  const scale = base / (depth + z);
  return {
    x: width / 2 + state.pan.x + offsetX + x * scale,
    y: height / 2 + state.pan.y + offsetY - y * scale,
    z,
    scale
  };
}

function pointAlong(a, b, distance) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.hypot(dx, dy) || 1;
  return {
    x: a.x + (dx / length) * distance,
    y: a.y + (dy / length) * distance
  };
}

function drawBond(ctx, a, b, aRadius, bRadius, width = 7, color = "#667085") {
  const start = pointAlong(a, b, aRadius + 5);
  const end = pointAlong(b, a, bRadius + 5);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

function drawArrow(ctx, from, to, label) {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  ctx.save();
  ctx.strokeStyle = "#6d4fc2";
  ctx.fillStyle = "#6d4fc2";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
  ctx.translate(to.x, to.y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-14, -7);
  ctx.lineTo(-14, 7);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = "#4c1d95";
  ctx.font = "700 15px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, (from.x + to.x) / 2, (from.y + to.y) / 2 - 30);
}

function setCanvas() {
  const canvas = els.moleculeCanvas;
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round(rect.height * ratio);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);
  return { ctx, width: rect.width, height: rect.height };
}

function atomRadius(atom, point, compact = false) {
  const style = atomStyles[atom.element] || atomStyles.C;
  const multiplier = compact ? 0.78 : 1;
  return style.radius * multiplier * Math.max(0.76, point.scale / 32);
}

function drawAtom(ctx, atom, point, radius, options = {}) {
  const style = atomStyles[atom.element] || atomStyles.C;
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = style.color;
  ctx.fill();
  ctx.strokeStyle = style.stroke || "#0f172a";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = style.label || "#111827";
  ctx.font = `${options.small ? 700 : 800} ${options.small ? 13 : 17}px system-ui`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(atom.element, point.x, point.y);
}

function labelOffset(atom, point, center) {
  if (atom.element === "C") {
    return { x: point.x - 46, y: point.y - 40 };
  }
  const dx = point.x - center.x;
  const dy = point.y - center.y;
  const length = Math.hypot(dx, dy) || 1;
  let distance = atom.element === "Cl" ? 50 : 38;
  return {
    x: point.x + (dx / length) * distance,
    y: point.y + (dy / length) * distance
  };
}

function drawChargeLabel(ctx, atom, point, center, radius) {
  const charge = atom.label.replace(atom.element, "").trim();
  if (!charge) return;
  const label = labelOffset(atom, point, center);
  ctx.fillStyle = atom.charge === "delta-negative" ? "#2563a9" : "#c24132";
  ctx.font = "800 15px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  drawHaloText(ctx, charge, label.x, label.y);
}

function projectedMolecule(molecule, width, height, options = {}) {
  const atoms = new Map(molecule.atoms.map(atom => [atom.id, atom]));
  const projected = new Map();
  for (const atom of molecule.atoms) {
    projected.set(atom.id, project(atom.position, width, height, options));
  }
  return { atoms, projected };
}

function drawBallStick(ctx, card, width, height) {
  const molecule = card.molecule;
  const { atoms, projected } = projectedMolecule(molecule, width, height, { scale: 190, offsetY: 14 });
  const center = projected.get("C1") || { x: width / 2, y: height / 2 };

  for (const [aId, bId] of molecule.bonds) {
    const atomA = atoms.get(aId);
    const atomB = atoms.get(bId);
    const a = projected.get(aId);
    const b = projected.get(bId);
    drawBond(ctx, a, b, atomRadius(atomA, a), atomRadius(atomB, b), 8);
  }

  const dipole = molecule.dipole;
  drawArrow(
    ctx,
    project(dipole.from, width, height, { scale: 190, offsetY: -82 }),
    project(dipole.to, width, height, { scale: 190, offsetY: -82 }),
    dipole.label
  );

  const sortedAtoms = [...molecule.atoms].sort((a, b) => projected.get(b.id).z - projected.get(a.id).z);
  for (const atom of sortedAtoms) {
    const point = projected.get(atom.id);
    const radius = atomRadius(atom, point);
    drawAtom(ctx, atom, point, radius);
    drawChargeLabel(ctx, atom, point, center, radius);
  }

  ctx.fillStyle = "#ad6b14";
  ctx.font = "800 17px system-ui";
  ctx.textAlign = "left";
  ctx.fillText(molecule.bond_angle, 24, height - 30);
}

function drawRegularBallStick(ctx, card, width, height) {
  const molecule = card.molecule;
  const { atoms, projected } = projectedMolecule(molecule, width, height, { scale: 210, offsetY: 8 });

  for (const [aId, bId] of molecule.bonds) {
    const atomA = atoms.get(aId);
    const atomB = atoms.get(bId);
    const a = projected.get(aId);
    const b = projected.get(bId);
    drawBond(ctx, a, b, atomRadius(atomA, a, true), atomRadius(atomB, b, true), 7, "#8b98a8");
  }

  const sortedAtoms = [...molecule.atoms].sort((a, b) => projected.get(b.id).z - projected.get(a.id).z);
  for (const atom of sortedAtoms) {
    const point = projected.get(atom.id);
    drawAtom(ctx, atom, point, atomRadius(atom, point, true), { small: true });
  }
}

function drawSkeletal(ctx, card, width, height) {
  const molecule = card.molecule;
  const projected = new Map();
  for (const atom of molecule.atoms) {
    projected.set(atom.id, project(atom.position, width, height, { scale: 250, offsetY: 8 }));
  }

  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  for (const [aId, bId] of molecule.bonds) {
    const a = projected.get(aId);
    const b = projected.get(bId);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  for (const atom of molecule.atoms) {
    const point = projected.get(atom.id);
    if (atom.element === "C") {
      ctx.fillStyle = "#111827";
      ctx.font = "800 18px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      drawHaloText(ctx, "CH3", point.x - 28, point.y - 20);
    } else {
      ctx.fillStyle = (atomStyles[atom.element] || atomStyles.C).stroke;
      ctx.font = "800 20px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      drawHaloText(ctx, atom.element, point.x, point.y);
    }
  }
}

function drawRotatableSkeletal(ctx, card, width, height) {
  const molecule = card.molecule;
  const projected = new Map();
  for (const atom of molecule.atoms) {
    projected.set(atom.id, project(atom.position, width, height, { scale: 265, offsetY: 18 }));
  }

  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const [aId, bId] of molecule.bonds) {
    const a = projected.get(aId);
    const b = projected.get(bId);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  const carbonPoints = molecule.atoms
    .filter(atom => atom.element === "C")
    .map(atom => projected.get(atom.id))
    .filter(Boolean);
  if (carbonPoints.length >= 3) {
    const avgY = carbonPoints.reduce((sum, point) => sum + point.y, 0) / carbonPoints.length;
    ctx.strokeStyle = "rgba(37, 99, 169, 0.45)";
    ctx.setLineDash([8, 7]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(34, avgY);
    ctx.lineTo(width - 34, avgY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#2563a9";
    ctx.font = "800 14px system-ui";
    ctx.textAlign = "left";
    ctx.fillText("above ring face", 34, avgY - 12);
    ctx.fillText("below ring face", 34, avgY + 20);
  }

  for (const atom of molecule.atoms) {
    const point = projected.get(atom.id);
    if (!point) continue;
    if (atom.element !== "C" || molecule.atoms.length <= 8) {
      ctx.fillStyle = atom.element === "C" ? "#111827" : (atomStyles[atom.element] || atomStyles.C).stroke;
      ctx.font = atom.element === "C" ? "800 16px system-ui" : "800 18px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      drawHaloText(ctx, atom.element, point.x, point.y);
    }
  }

  ctx.fillStyle = "#475569";
  ctx.font = "700 14px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("Rotate to compare same-face cis and opposite-face trans relationships.", width / 2, height - 24);
}

function drawPolarityCloud(ctx, card, width, height) {
  const molecule = card.molecule;
  const { projected } = projectedMolecule(molecule, width, height, { scale: 150, offsetY: 12 });

  ctx.save();
  ctx.globalAlpha = 0.88;
  for (const atom of molecule.atoms) {
    const point = projected.get(atom.id);
    const isNegative = atom.charge === "delta-negative";
    const gradient = ctx.createRadialGradient(point.x, point.y, 6, point.x, point.y, isNegative ? 115 : 80);
    gradient.addColorStop(0, isNegative ? "rgba(37, 99, 169, 0.62)" : "rgba(194, 65, 50, 0.42)");
    gradient.addColorStop(0.55, isNegative ? "rgba(56, 189, 248, 0.28)" : "rgba(248, 113, 113, 0.18)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(point.x, point.y, isNegative ? 128 : 88, isNegative ? 86 : 64, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  for (const [aId, bId] of molecule.bonds) {
    const a = projected.get(aId);
    const b = projected.get(bId);
    ctx.strokeStyle = "rgba(75, 85, 99, 0.48)";
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 7]);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  for (const atom of molecule.atoms) {
    const point = projected.get(atom.id);
    drawAtom(ctx, atom, point, atomRadius(atom, point, true), { small: true });
  }

  const dipole = molecule.dipole;
  drawArrow(
    ctx,
    project(dipole.from, width, height, { scale: 150, offsetY: -82 }),
    project(dipole.to, width, height, { scale: 150, offsetY: -82 }),
    "electron density shifts toward Cl"
  );

  ctx.font = "800 14px system-ui";
  ctx.textAlign = "left";
  ctx.fillStyle = "#2563a9";
  ctx.fillText("blue = electron-rich / δ−", 24, 32);
  ctx.fillStyle = "#c24132";
  ctx.fillText("red = electron-poor / δ+", 24, 54);
}

function drawWedgeBond(ctx, from, to, kind) {
  if (kind === "dash") {
    const segments = 7;
    for (let i = 0; i < segments; i += 1) {
      const t = (i + 1) / (segments + 1);
      const x = from.x + (to.x - from.x) * t;
      const y = from.y + (to.y - from.y) * t;
      const width = 3 + i * 1.2;
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - width, y);
      ctx.lineTo(x + width, y);
      ctx.stroke();
    }
    return;
  }

  if (kind === "wedge") {
    const angle = Math.atan2(to.y - from.y, to.x - from.x) + Math.PI / 2;
    const spread = 12;
    ctx.fillStyle = "#475569";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x + Math.cos(angle) * spread, to.y + Math.sin(angle) * spread);
    ctx.lineTo(to.x - Math.cos(angle) * spread, to.y - Math.sin(angle) * spread);
    ctx.closePath();
    ctx.fill();
    return;
  }

  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}

function drawLineWedge(ctx, card, width, height) {
  const molecule = card.molecule;
  const projected = new Map();
  for (const atom of molecule.atoms) {
    projected.set(atom.id, project(atom.position, width, height, { scale: 260, offsetY: 18 }));
  }
  const center = projected.get("C1");
  const bondKinds = new Map([
    ["C1-Cl1", "line"],
    ["C1-H1", "wedge"],
    ["C1-H2", "line"],
    ["C1-H3", "dash"]
  ]);

  for (const [aId, bId] of molecule.bonds) {
    drawWedgeBond(ctx, projected.get(aId), projected.get(bId), bondKinds.get(`${aId}-${bId}`) || "line");
  }

  for (const atom of molecule.atoms) {
    const point = projected.get(atom.id);
    ctx.fillStyle = atom.element === "C" ? "#111827" : (atomStyles[atom.element] || atomStyles.C).stroke;
    ctx.font = atom.element === "C" ? "800 18px system-ui" : "800 20px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(atom.element, point.x, point.y);
    if (atom.element !== "C") {
      drawChargeLabel(ctx, atom, point, center, 12);
    }
  }

  ctx.fillStyle = "#334155";
  ctx.font = "700 15px system-ui";
  ctx.textAlign = "left";
  ctx.fillText("solid wedge = toward viewer", 24, 32);
  ctx.fillText("dashed wedge = behind plane", 24, 54);
}

function drawSmallStereoCenter(ctx, atoms, bonds, width, height, offsetX, title) {
  const projected = new Map();
  for (const atom of atoms) {
    projected.set(atom.id, project(atom.position, width, height, { scale: 250, offsetX, offsetY: 28 }));
  }
  const bondKinds = new Map([
    ["C-Cl", "line"],
    ["C-Br", "wedge"],
    ["C-F", "line"],
    ["C-H", "dash"]
  ]);

  for (const [aId, bId] of bonds) {
    drawWedgeBond(ctx, projected.get(aId), projected.get(bId), bondKinds.get(`${aId}-${bId}`) || "line");
  }
  const center = projected.get("C");
  for (const atom of atoms) {
    const point = projected.get(atom.id);
    const label = atom.id === "C" ? point : substituentLabelPoint(center, point, atom.element);
    ctx.fillStyle = (atomStyles[atom.element] || atomStyles.C).stroke;
    ctx.font = "800 18px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    drawHaloText(ctx, atom.label, label.x, label.y);
  }
  ctx.fillStyle = "#17201c";
  ctx.font = "800 16px system-ui";
  ctx.fillText(title, width / 2 + offsetX, 46);
}

function substituentLabelPoint(center, point, element) {
  const dx = point.x - center.x;
  const dy = point.y - center.y;
  const length = Math.hypot(dx, dy) || 1;
  const extra = element === "H" ? 28 : 24;
  return {
    x: point.x + (dx / length) * extra,
    y: point.y + (dy / length) * extra
  };
}

function drawHaloText(ctx, text, x, y) {
  ctx.save();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.92)";
  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawChirality(ctx, width, height) {
  drawSmallStereoCenter(ctx, chiralPair.left, chiralPair.bonds, width, height, -width * 0.24, "enantiomer A");
  drawSmallStereoCenter(ctx, chiralPair.right, chiralPair.bonds, width, height, width * 0.24, "enantiomer B");

  ctx.strokeStyle = "#94a3b8";
  ctx.setLineDash([8, 8]);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2, 58);
  ctx.lineTo(width / 2, height - 58);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#475569";
  ctx.font = "700 15px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("mirror plane", width / 2, height - 36);
  ctx.fillText("Non-superimposable mirror images require a tetrahedral center with four different groups.", width / 2, height - 14);
}

function drawOrbitalLobe(ctx, x, y, radiusX, radiusY, color, label, flip = false) {
  const gradient = ctx.createRadialGradient(x, y, 5, x, y, Math.max(radiusX, radiusY));
  gradient.addColorStop(0, color.replace("0.70", "0.82"));
  gradient.addColorStop(0.68, color);
  gradient.addColorStop(1, color.replace(/0\.\d+\)/, "0)"));
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(flip ? Math.PI : 0);
  ctx.fillStyle = gradient;
  ctx.strokeStyle = color.replace("0.70", "0.90");
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.fillStyle = "#334155";
  ctx.font = "800 14px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(label, x, y + radiusY + 34);
}

function drawOrbitalOverlap(ctx, card, width, height) {
  const y = height * 0.52;
  const cX = width * 0.36;
  const clX = width * 0.64;

  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cX, y);
  ctx.lineTo(clX, y);
  ctx.stroke();

  drawOrbitalLobe(ctx, cX + 48, y, 72, 34, "rgba(239, 68, 68, 0.70)", "C sp3");
  drawOrbitalLobe(ctx, cX - 34, y, 34, 22, "rgba(37, 99, 235, 0.70)", "small back lobe");
  drawOrbitalLobe(ctx, clX - 62, y, 86, 38, "rgba(250, 204, 21, 0.70)", "Cl valence orbital");
  drawOrbitalLobe(ctx, clX + 52, y, 50, 27, "rgba(37, 99, 235, 0.48)", "opposite phase");

  ctx.fillStyle = atomStyles.C.color;
  ctx.beginPath();
  ctx.arc(cX - 74, y, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 17px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("C", cX - 74, y);

  ctx.fillStyle = atomStyles.Cl.color;
  ctx.beginPath();
  ctx.arc(clX + 100, y, 31, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#052e16";
  ctx.fillText("Cl", clX + 100, y);

  ctx.fillStyle = "#17201c";
  ctx.font = "800 18px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("σ overlap along the C-Cl bond axis", width / 2, 44);
  ctx.fillStyle = "#64748b";
  ctx.font = "700 14px system-ui";
  ctx.fillText("colored lobes show orbital phase; larger overlap means stronger bonding interaction", width / 2, height - 32);
}

function drawElectronPair(ctx, x, y) {
  ctx.strokeStyle = "#17201c";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 10, y - 13);
  ctx.lineTo(x - 10, y + 13);
  ctx.moveTo(x + 10, y - 13);
  ctx.lineTo(x + 10, y + 13);
  ctx.stroke();
  ctx.fillStyle = "#17201c";
  ctx.beginPath();
  ctx.arc(x - 15, y - 2, 3, 0, Math.PI * 2);
  ctx.arc(x + 5, y - 2, 3, 0, Math.PI * 2);
  ctx.fill();
}

function drawEnergyLevel(ctx, x, y, label, electrons = false, color = "#17201c") {
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - 48, y);
  ctx.lineTo(x + 48, y);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.font = "800 17px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(label, x, y - 12);
  if (electrons) drawElectronPair(ctx, x, y - 28);
}

function drawEnergyDiagram(ctx, card, width, height) {
  const midX = width / 2;
  const leftX = width * 0.25;
  const rightX = width * 0.75;
  const lowY = height * 0.68;
  const parentY = height * 0.48;
  const highY = height * 0.25;

  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(58, height - 52);
  ctx.lineTo(58, 72);
  ctx.lineTo(50, 88);
  ctx.moveTo(58, 72);
  ctx.lineTo(66, 88);
  ctx.stroke();
  ctx.save();
  ctx.translate(34, height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = "#111827";
  ctx.font = "800 15px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("energy", 0, 0);
  ctx.restore();

  drawEnergyLevel(ctx, leftX, parentY, "C sp3 AO", true, "#475569");
  drawEnergyLevel(ctx, rightX, parentY, "Cl AO", false, "#15803d");
  drawEnergyLevel(ctx, midX, lowY, "σ C-Cl", true, "#1f7a4d");
  drawEnergyLevel(ctx, midX, highY, "σ* C-Cl", false, "#b91c1c");

  ctx.strokeStyle = "#94a3b8";
  ctx.setLineDash([7, 8]);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(leftX + 54, parentY);
  ctx.lineTo(midX - 56, lowY);
  ctx.moveTo(rightX - 54, parentY);
  ctx.lineTo(midX + 56, lowY);
  ctx.moveTo(leftX + 54, parentY);
  ctx.lineTo(midX - 56, highY);
  ctx.moveTo(rightX - 54, parentY);
  ctx.lineTo(midX + 56, highY);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#17201c";
  ctx.font = "800 18px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("C-Cl orbital interaction", width / 2, 42);
  ctx.fillStyle = "#64748b";
  ctx.font = "700 14px system-ui";
  ctx.fillText("bonding orbital is stabilized; antibonding orbital is destabilized", width / 2, height - 28);
}

function drawMolecule() {
  const card = state.current;
  if (!card || state.mode !== "explore") return;
  const { ctx, width, height } = setCanvas();

  if (state.representation === "polarity-cloud" || state.representation === "electronegativity-cloud") {
    drawPolarityCloud(ctx, card, width, height);
  } else if (state.representation === "regular-ball-stick") {
    drawRegularBallStick(ctx, card, width, height);
  } else if (state.representation === "skeletal") {
    drawSkeletal(ctx, card, width, height);
  } else if (state.representation === "rotatable-skeletal") {
    drawRotatableSkeletal(ctx, card, width, height);
  } else if (state.representation === "line-wedge") {
    drawLineWedge(ctx, card, width, height);
  } else if (state.representation === "orbital-overlap" || state.representation === "bond-cloud") {
    drawOrbitalOverlap(ctx, card, width, height);
  } else if (state.representation === "energy-diagram") {
    drawEnergyDiagram(ctx, card, width, height);
  } else if (state.representation === "chirality" || state.representation === "stereo-comparison") {
    drawChirality(ctx, width, height);
  } else {
    drawBallStick(ctx, card, width, height);
  }
}

async function init() {
  const response = await fetch("../generated/cards.json", { cache: "no-store" });
  if (!response.ok) throw new Error("Could not load generated organic chemistry cards.");
  const data = await response.json();
  state.cards = data.cards;
  const params = new URLSearchParams(window.location.search);
  const requestedCard = params.get("card");
  selectCard(state.cards.find(card => card.id === requestedCard)?.id || state.cards[0].id);
}

els.searchInput.addEventListener("input", renderCardList);
els.representationSelect.addEventListener("change", event => {
  setRepresentation(event.target.value);
});
els.resetViewButton.addEventListener("click", () => {
  resetViewState();
  drawMolecule();
});
els.rotateToolButton.addEventListener("click", () => setInteraction("rotate"));
els.panToolButton.addEventListener("click", () => setInteraction("pan"));
for (const button of els.modeButtons) {
  button.addEventListener("click", () => setMode(button.dataset.mode));
}

els.moleculeCanvas.addEventListener("pointerdown", event => {
  state.dragging = true;
  state.lastPointer = { x: event.clientX, y: event.clientY };
  els.moleculeCanvas.setPointerCapture(event.pointerId);
});
els.moleculeCanvas.addEventListener("pointermove", event => {
  if (!state.dragging || !state.lastPointer) return;
  const dx = event.clientX - state.lastPointer.x;
  const dy = event.clientY - state.lastPointer.y;
  if (state.interaction === "pan") {
    state.pan.x += dx;
    state.pan.y += dy;
  } else {
    state.rotation.y += dx * 0.01;
    state.rotation.x += dy * 0.01;
  }
  state.lastPointer = { x: event.clientX, y: event.clientY };
  drawMolecule();
});
els.moleculeCanvas.addEventListener("pointerup", () => {
  state.dragging = false;
  state.lastPointer = null;
});
els.moleculeCanvas.addEventListener("pointercancel", () => {
  state.dragging = false;
  state.lastPointer = null;
});
window.addEventListener("resize", drawMolecule);

init().catch(error => {
  els.cardTitle.textContent = "Load error";
  els.sectionLabel.textContent = error.message;
});
