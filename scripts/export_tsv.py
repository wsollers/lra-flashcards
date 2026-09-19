from __future__ import annotations

import csv
import html
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DECKS = ROOT / "decks"
DIST = ROOT / "dist"
CARDS = ROOT / "cards" / "lean"


TYPE_TAGS = {
    "axiom",
    "classical",
    "classes",
    "concept",
    "declarations",
    "definition",
    "elaboration",
    "example",
    "fields",
    "headers",
    "limits",
    "modeling",
    "proof-design",
    "proof-patterns",
    "proof-state",
    "rings",
    "structures",
    "tactics",
    "theorem",
    "types",
    "universes",
    "workflow",
}


def inline_markup(text: str) -> str:
    escaped = html.escape(text)
    return re.sub(r"`([^`]+)`", r"<code>\1</code>", escaped)


def markdown_to_html(markdown: str) -> str:
    lines = markdown.strip().splitlines()
    output: list[str] = []
    paragraph: list[str] = []
    in_code = False
    code_lines: list[str] = []

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            output.append("<p>" + "<br>".join(inline_markup(line) for line in paragraph) + "</p>")
            paragraph = []

    for line in lines:
        stripped = line.rstrip()
        if stripped.startswith("```"):
            if in_code:
                output.append("<pre><code>" + html.escape("\n".join(code_lines)) + "</code></pre>")
                code_lines = []
                in_code = False
            else:
                flush_paragraph()
                in_code = True
            continue
        if in_code:
            code_lines.append(stripped)
            continue
        if stripped == "":
            flush_paragraph()
        elif stripped.startswith("- "):
            flush_paragraph()
            output.append("<p>&bull; " + inline_markup(stripped[2:]) + "</p>")
        else:
            paragraph.append(stripped)

    flush_paragraph()
    if in_code:
        output.append("<pre><code>" + html.escape("\n".join(code_lines)) + "</code></pre>")
    return "".join(output)


def markdown_to_text(markdown: str) -> str:
    lines = []
    for line in markdown.strip().splitlines():
        stripped = line.rstrip()
        if stripped.startswith("```"):
            continue
        lines.append(stripped)
    return "\n".join(lines).strip()


def card_type(tags: str) -> str:
    tag_set = tags.split()
    for tag in tag_set:
        if tag in TYPE_TAGS:
            return tag
    return "concept"


def parse_deck(path: Path) -> list[dict[str, str]]:
    text = path.read_text(encoding="utf-8")
    cards: list[dict[str, str]] = []
    prefix = re.sub(r"[^a-z0-9]+", "-", path.stem.lower()).strip("-")
    for index, block in enumerate(re.split(r"(?m)^---\s*$", text), start=1):
        block = block.strip()
        if not block or block.startswith("# "):
            continue
        lines = block.splitlines()
        if not lines[0].startswith("## "):
            raise ValueError(f"{path}: card must start with ## front")
        front = lines[0][3:].strip()
        if len(lines) < 2 or not lines[1].startswith("Tags: "):
            raise ValueError(f"{path}: card {front!r} missing Tags line")
        tags = lines[1][6:].strip()
        body = "\n".join(lines[2:]).strip()
        cards.append(
            {
                "id": f"{prefix}-{len(cards) + 1:03d}",
                "type": card_type(tags),
                "front": front,
                "back": markdown_to_text(body),
                "tags": tags,
                "anki_back": markdown_to_html(body),
            }
        )
    return cards


def main() -> None:
    DIST.mkdir(exist_ok=True)
    CARDS.mkdir(parents=True, exist_ok=True)
    for deck in sorted(DECKS.glob("*.md")):
        cards = parse_deck(deck)
        tsv_out = DIST / f"{deck.stem}.tsv"
        with tsv_out.open("w", encoding="utf-8", newline="") as handle:
            writer = csv.writer(handle, delimiter="\t", lineterminator="\n")
            writer.writerow(["Front", "Back", "Tags"])
            writer.writerows((card["front"], card["anki_back"], card["tags"]) for card in cards)
        json_out = CARDS / f"{deck.stem}.json"
        app_cards = [
            {key: card[key] for key in ("id", "type", "front", "back")}
            for card in cards
        ]
        json_out.write_text(json.dumps(app_cards, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        print(f"wrote {tsv_out.relative_to(ROOT)} ({len(cards)} cards)")
        print(f"wrote {json_out.relative_to(ROOT)} ({len(cards)} cards)")


if __name__ == "__main__":
    main()
