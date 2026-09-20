from __future__ import annotations

from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "organic"


GROUPS = {
    "alkane": "R-CH3",
    "alkene": "R-CH=CH-R",
    "alkyne": "R-C≡C-R",
    "arene": "benzene ring",
    "alcohol": "R-OH",
    "ether": "R-O-R",
    "epoxide": "three-membered cyclic ether",
    "peroxide": "R-O-O-R",
    "aldehyde": "R-C(=O)-H",
    "ketone": "R-C(=O)-R",
    "carboxylic-acid": "R-C(=O)-OH",
    "ester": "R-C(=O)-O-R",
    "acid-chloride": "R-C(=O)-Cl",
    "amide": "R-C(=O)-NR2",
    "amine": "R-NR2",
    "nitrile": "R-C≡N",
    "thiol": "R-SH",
    "thioether": "R-S-R",
}


def svg(label: str) -> str:
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="420" height="220" viewBox="0 0 420 220" role="img" aria-label="{label}">
  <rect width="420" height="220" rx="18" fill="#ffffff"/>
  <text x="210" y="104" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="700" fill="#111827">{label}</text>
  <text x="210" y="160" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#64748b">functional group pattern</text>
</svg>
"""


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, label in GROUPS.items():
        path = OUT / f"{name}.svg"
        path.write_text(svg(label), encoding="utf-8")
        print(f"wrote {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
