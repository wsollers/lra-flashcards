from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OCHEM = ROOT / "ochem"
DATA_CARDS = OCHEM / "data" / "cards"
LEGACY_CARDS = OCHEM / "data" / "legacy"
GENERATED = OCHEM / "generated"
STRUCTURES = GENERATED / "structures"


DEFAULT_REPRESENTATIONS = [
    {
        "id": "regular-ball-stick",
        "label": "Regular ball-and-stick",
        "explanation": "A rotatable atom-and-bond view using standard chemistry atom colors.",
    },
    {
        "id": "skeletal",
        "label": "Standard skeletal structure",
        "explanation": "The usual organic line-angle drawing: carbon atoms are implied at line ends and intersections unless explicitly labeled.",
    },
    {
        "id": "rotatable-skeletal",
        "label": "Rotatable skeletal cis/trans view",
        "explanation": "A rotatable line-angle style view for seeing ring faces, cis/trans relationships, and conformational orientation.",
    },
    {
        "id": "line-wedge",
        "label": "Rotatable line/wedge structure",
        "explanation": "A stereochemical view for seeing bonds in the plane, toward the viewer, and behind the plane.",
    },
    {
        "id": "polarity-cloud",
        "label": "Electronegativity cloud",
        "explanation": "A qualitative electron-density map: blue marks relatively electron-rich delta-negative regions and red marks electron-poor delta-positive regions.",
    },
    {
        "id": "orbital-overlap",
        "label": "Bond orbital cloud",
        "explanation": "A qualitative orbital-overlap view showing bonding lobes and phase around a sigma bond.",
    },
    {
        "id": "energy-diagram",
        "label": "sigma / sigma* energy diagram",
        "explanation": "A compact orbital-energy diagram for the bonding and antibonding interaction.",
    },
    {
        "id": "chirality",
        "label": "Chirality / stereochemistry comparison",
        "explanation": "A side-by-side stereochemical comparison for enantiomers, mirror planes, and non-superimposable arrangements.",
    },
]


def default_molecule(chapter: int | None, title: str) -> dict:
    if chapter == 4:
        return {
            "name": "Cyclohexane chair scaffold",
            "formula": "C6H12",
            "smiles": "C1CCCCC1",
            "geometry": "cycloalkane scaffold",
            "hybridization": "mostly sp3",
            "bond_angle": "near tetrahedral",
            "atoms": [
                {"id": "C1", "element": "C", "label": "C", "position": [0.9, 0.45, 0.2]},
                {"id": "C2", "element": "C", "label": "C", "position": [0.15, 0.9, -0.35]},
                {"id": "C3", "element": "C", "label": "C", "position": [-0.8, 0.35, 0.2]},
                {"id": "C4", "element": "C", "label": "C", "position": [-0.9, -0.45, -0.25]},
                {"id": "C5", "element": "C", "label": "C", "position": [-0.15, -0.9, 0.35]},
                {"id": "C6", "element": "C", "label": "C", "position": [0.8, -0.35, -0.25]},
            ],
            "bonds": [["C1", "C2"], ["C2", "C3"], ["C3", "C4"], ["C4", "C5"], ["C5", "C6"], ["C6", "C1"]],
            "dipole": {"from": [-0.45, 0, 0], "to": [0.45, 0, 0], "label": "compare ring faces"},
        }

    if chapter == 3:
        return {
            "name": "Ethane conformational scaffold",
            "formula": "C2H6",
            "smiles": "CC",
            "geometry": "tetrahedral carbons",
            "hybridization": "sp3",
            "bond_angle": "about 109.5 deg",
            "atoms": [
                {"id": "C1", "element": "C", "label": "C", "position": [-0.75, 0, 0]},
                {"id": "C2", "element": "C", "label": "C", "position": [0.75, 0, 0]},
                {"id": "H1", "element": "H", "label": "H", "position": [-1.2, 0.95, 0.4]},
                {"id": "H2", "element": "H", "label": "H", "position": [-1.2, -0.95, 0.4]},
                {"id": "H3", "element": "H", "label": "H", "position": [-1.2, 0, -1.0]},
                {"id": "H4", "element": "H", "label": "H", "position": [1.2, 0.95, -0.4]},
                {"id": "H5", "element": "H", "label": "H", "position": [1.2, -0.95, -0.4]},
                {"id": "H6", "element": "H", "label": "H", "position": [1.2, 0, 1.0]},
            ],
            "bonds": [["C1", "C2"], ["C1", "H1"], ["C1", "H2"], ["C1", "H3"], ["C2", "H4"], ["C2", "H5"], ["C2", "H6"]],
            "dipole": {"from": [-0.5, 0, 0], "to": [0.5, 0, 0], "label": "rotate C-C sigma bond"},
        }

    return {
        "name": title,
        "formula": "CH4",
        "smiles": "C",
        "geometry": "tetrahedral scaffold",
        "hybridization": "sp3",
        "bond_angle": "about 109.5 deg",
        "atoms": [
            {"id": "C1", "element": "C", "label": "C", "position": [0, 0, 0]},
            {"id": "H1", "element": "H", "label": "H", "position": [0.9, 0.9, 0.7]},
            {"id": "H2", "element": "H", "label": "H", "position": [-0.9, -0.9, 0.7]},
            {"id": "H3", "element": "H", "label": "H", "position": [-0.9, 0.9, -0.7]},
            {"id": "H4", "element": "H", "label": "H", "position": [0.9, -0.9, -0.7]},
        ],
        "bonds": [["C1", "H1"], ["C1", "H2"], ["C1", "H3"], ["C1", "H4"]],
        "dipole": {"from": [-0.55, 0, 0], "to": [0.55, 0, 0], "label": "tetrahedral reference"},
    }


def fallback_svg(label: str) -> str:
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="520" height="280" viewBox="0 0 520 280" role="img" aria-label="{label}">
  <rect width="520" height="280" rx="12" fill="#ffffff"/>
  <line x1="245" y1="140" x2="365" y2="140" stroke="#334155" stroke-width="8" stroke-linecap="round"/>
  <line x1="245" y1="140" x2="160" y2="74" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
  <line x1="245" y1="140" x2="160" y2="206" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
  <line x1="245" y1="140" x2="220" y2="230" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
  <circle cx="245" cy="140" r="32" fill="#111827"/>
  <circle cx="365" cy="140" r="42" fill="#22c55e"/>
  <circle cx="160" cy="74" r="20" fill="#e5e7eb" stroke="#94a3b8"/>
  <circle cx="160" cy="206" r="20" fill="#e5e7eb" stroke="#94a3b8"/>
  <circle cx="220" cy="230" r="20" fill="#e5e7eb" stroke="#94a3b8"/>
  <text x="245" y="148" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#ffffff">C</text>
  <text x="365" y="148" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#052e16">Cl</text>
  <text x="160" y="82" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#334155">H</text>
  <text x="160" y="214" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#334155">H</text>
  <text x="220" y="238" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#334155">H</text>
  <text x="245" y="95" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#dc2626">δ+</text>
  <text x="365" y="82" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#2563eb">δ−</text>
  <path d="M272 56 H350" stroke="#7c3aed" stroke-width="4" marker-end="url(#arrow)"/>
  <text x="311" y="44" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#4c1d95">dipole</text>
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#7c3aed"/>
    </marker>
  </defs>
</svg>
"""


def rdkit_svg(smiles: str, label: str) -> str:
    smiles = smiles.strip().rstrip(";").strip()
    try:
        from rdkit import Chem
        from rdkit.Chem import Draw
    except Exception:
        return fallback_svg(label)

    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        return fallback_svg(label)
    drawer = Draw.MolDraw2DSVG(520, 280)
    options = drawer.drawOptions()
    options.addAtomIndices = False
    options.padding = 0.18
    drawer.DrawMolecule(mol)
    drawer.FinishDrawing()
    return drawer.GetDrawingText()


def as_list(value) -> list:
    if value is None:
        return []
    if isinstance(value, list):
        return value
    return [value]


def fact_text(value) -> str:
    if isinstance(value, str):
        return value
    if isinstance(value, dict):
        parts = [value.get("statement"), value.get("details"), value.get("note")]
        return " ".join(part for part in parts if part)
    return str(value)


def infer_chapter(data: dict, card: dict | None = None) -> int | None:
    for candidate in (card or {}, data.get("source") or {}):
        chapter = candidate.get("chapter")
        if isinstance(chapter, int):
            return chapter
        if isinstance(chapter, str) and chapter.isdigit():
            return int(chapter)
    return None


def infer_legacy_chapter(raw: dict) -> int | None:
    chapter_guess = raw.get("chapter_guess")
    if isinstance(chapter_guess, int):
        return chapter_guess
    if isinstance(chapter_guess, str):
        for char in chapter_guess:
            if char.isdigit():
                return int(char)
    return None


def normalize_molecule(value, title: str):
    if not isinstance(value, dict):
        return value
    molecule = dict(value)
    smiles = molecule.get("smiles")
    if isinstance(smiles, str) and ";" in smiles:
        examples = [part.strip() for part in smiles.split(";") if part.strip()]
        if examples:
            molecule["original_smiles"] = smiles
            molecule["smiles_examples"] = examples
            molecule["smiles"] = examples[0]
            molecule.setdefault("name", title)
    return molecule


def normalize_card(raw: dict, data: dict, section: dict | None = None) -> dict:
    chapter = infer_chapter(data, raw)
    section_id = raw.get("section") or (section or {}).get("section") or (section or {}).get("section_id") or ""
    topic = raw.get("topic") or (section or {}).get("title") or data.get("title") or "Organic chemistry"
    front = raw.get("front") or raw.get("prompt") or raw.get("question") or topic
    back = raw.get("back") or raw.get("answer") or raw.get("answer_rule") or raw.get("explanation") or ""
    title = raw.get("title") or topic
    if title == topic and raw.get("type"):
        title = f"{topic}: {str(raw['type']).replace('_', ' ').title()}"

    section_facts = as_list((section or {}).get("facts"))
    facts = [fact_text(fact) for fact in (as_list(raw.get("facts")) or section_facts[:5])]
    tags = [f"chapter-{chapter:02d}" if chapter else "organic-chemistry"]
    tags.extend(as_list(raw.get("tags")))
    tags.extend(str(v).replace("_", "-") for v in as_list(raw.get("visual_requirements")))

    prompts = as_list(raw.get("prompts"))
    if not prompts:
        prompts = [{"kind": raw.get("type", "review"), "question": front, "answer": back}]

    representations = raw.get("representations") or []
    representation_ids = {view.get("id") for view in representations}
    representations = representations + [
        view for view in DEFAULT_REPRESENTATIONS if view["id"] not in representation_ids
    ]

    card = {
        "id": raw["id"],
        "chapter": chapter or "",
        "section": section_id,
        "title": title,
        "type": raw.get("type", "review"),
        "topic": topic,
        "tags": list(dict.fromkeys(tag for tag in tags if tag)),
        "front": front,
        "back": back,
        "molecule": normalize_molecule(raw.get("molecule"), title) or default_molecule(chapter, title),
        "formulas": as_list(raw.get("formulas")),
        "reactions": as_list(raw.get("reactions")),
        "facts": facts,
        "prompts": prompts,
        "representations": representations,
        "source": data.get("source", {}),
    }
    if raw.get("visual_requirements"):
        card["visual_requirements"] = raw["visual_requirements"]
    if raw.get("difficulty"):
        card["difficulty"] = raw["difficulty"]
    if raw.get("assets"):
        card["assets"] = raw["assets"]
    return card


def normalize_legacy_card(raw: dict, data: dict, path: Path) -> dict:
    chapter = infer_legacy_chapter(raw)
    topic = raw.get("topic") or "Legacy Organic Chemistry I"
    front = raw.get("front") or raw.get("question") or topic
    back = raw.get("back") or raw.get("answer") or ""
    title = raw.get("title") or topic
    tags = ["legacy", "organic-chemistry-i"]
    if chapter:
        tags.append(f"chapter-{chapter:02d}")
    tags.extend(as_list(raw.get("tags")))
    tags.extend(str(v).replace("_", "-") for v in as_list(raw.get("visual_requirements")))

    prompts = as_list(raw.get("prompts"))
    if not prompts:
        prompts = [{"kind": raw.get("type", "review"), "question": front, "answer": back}]

    representations = raw.get("representations") or []
    representation_ids = {view.get("id") for view in representations}
    representations = representations + [
        view for view in DEFAULT_REPRESENTATIONS if view["id"] not in representation_ids
    ]

    source = {
        **(data.get("source") or {}),
        "kind": "legacy",
        "batch_id": data.get("id") or path.stem,
        "path": str(path.relative_to(ROOT)).replace("\\", "/"),
        "legacy_id": raw.get("legacy_id"),
        "chapter_guess": raw.get("chapter_guess"),
        "merge_notes": raw.get("merge_notes"),
    }

    card = {
        "id": raw["id"],
        "legacy_id": raw.get("legacy_id"),
        "chapter": chapter or raw.get("chapter_guess") or "",
        "section": raw.get("section") or "legacy",
        "title": title,
        "type": raw.get("type", "review"),
        "topic": topic,
        "tags": list(dict.fromkeys(tag for tag in tags if tag)),
        "front": front,
        "back": back,
        "molecule": normalize_molecule(raw.get("molecule"), title) or default_molecule(chapter, title),
        "formulas": as_list(raw.get("formulas")),
        "reactions": as_list(raw.get("reactions")),
        "facts": as_list(raw.get("facts")),
        "prompts": prompts,
        "representations": representations,
        "source": source,
        "visual_requirements": as_list(raw.get("visual_requirements")),
        "decorations_needed": as_list(raw.get("decorations_needed")),
        "merge_notes": raw.get("merge_notes", ""),
    }
    if raw.get("chapter_guess"):
        card["chapter_guess"] = raw["chapter_guess"]
    if raw.get("explorer_target"):
        card["explorer_target"] = raw["explorer_target"]
    if raw.get("assets"):
        card["assets"] = raw["assets"]
    return card


def load_cards() -> list[dict]:
    cards: list[dict] = []
    for path in sorted(DATA_CARDS.glob("*.json")):
        data = json.loads(path.read_text(encoding="utf-8"))
        for raw in data.get("cards", []):
            cards.append(normalize_card(raw, data))
        for section in data.get("sections", []):
            for raw in section.get("candidate_cards", []):
                cards.append(normalize_card(raw, data, section))
    for path in sorted(LEGACY_CARDS.glob("*.json")):
        data = json.loads(path.read_text(encoding="utf-8"))
        for raw in data.get("cards", []):
            cards.append(normalize_legacy_card(raw, data, path))
    return cards


def main() -> None:
    GENERATED.mkdir(parents=True, exist_ok=True)
    STRUCTURES.mkdir(parents=True, exist_ok=True)
    cards = load_cards()

    for card in cards:
        molecule = card.get("molecule") or {}
        smiles = molecule.get("smiles")
        svg_name = f"{card['id']}.svg"
        svg_path = STRUCTURES / svg_name
        svg = rdkit_svg(smiles, molecule.get("name", card["title"])) if smiles else fallback_svg(card["title"])
        svg_path.write_text(svg, encoding="utf-8")
        card["assets"] = {
            **card.get("assets", {}),
            "structure_svg": f"../generated/structures/{svg_name}",
        }

    (GENERATED / "cards.json").write_text(
        json.dumps({"version": 1, "cards": cards}, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"wrote {GENERATED / 'cards.json'}")
    print(f"wrote {len(cards)} card(s)")


if __name__ == "__main__":
    main()
