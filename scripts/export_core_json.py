from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CORE = ROOT / "core"
CARDS = ROOT / "cards" / "core"


TYPE_KEYWORDS = [
    ("theorem", ["theorem", "property", "guarantee", "rules out"]),
    ("proof", ["proof", "prove", "tactic", "unpack", "split", "rewrite", "unfold", "exact", "apply"]),
    ("definition", ["what is", "what are", "state", "mean"]),
    ("example", ["example", "concrete"]),
    ("dependency", ["dependency", "come before", "depends"]),
    ("compare", ["difference", "distinguish"]),
]


def card_type(front: str, back: str) -> str:
    text = f"{front} {back}".lower()
    lowered_front = front.lower()
    if "axiom" in text and (lowered_front.startswith("state") or "as a lean structure field" in lowered_front):
        return "axiom"
    for kind, needles in TYPE_KEYWORDS:
        if any(needle in text for needle in needles):
            return kind
    return "concept"


def parse_remnote(path: Path) -> list[dict[str, str]]:
    prefix = re.sub(r"^\d+-", "", path.stem)
    prefix = re.sub(r"[^a-z0-9]+", "-", prefix.lower()).strip("-")
    if prefix == "peano-systems":
        prefix = "peano"

    cards: list[dict[str, str]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        if ">>" not in stripped:
            continue
        front, back = [part.strip() for part in stripped.split(">>", 1)]
        cards.append(
            {
                "id": f"{prefix}-{len(cards) + 1:03d}",
                "type": card_type(front, back),
                "front": front,
                "back": back,
            }
        )
    return cards


def main() -> None:
    CARDS.mkdir(parents=True, exist_ok=True)
    for source in sorted(CORE.glob("*.md")):
        cards = parse_remnote(source)
        if not cards:
            continue
        output = CARDS / f"{source.stem}.json"
        output.write_text(json.dumps(cards, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        print(f"wrote {output.relative_to(ROOT)} ({len(cards)} cards)")


if __name__ == "__main__":
    main()
