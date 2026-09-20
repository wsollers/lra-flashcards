# LRA Flashcards

Canonical flashcard source for the Learn Abstract Mathematics / Real Analysis study program.

## Design

GitHub is the source of truth for card content. RemNote is the live study system and stores spaced-repetition state.

Three tracks are maintained:

- `core/` — axioms, definitions, theorem statements, hypotheses, quantified forms, relationships, proof architecture.
- `counterexamples/` — nonexamples, failed converses, missing-hypothesis failures, incomplete structures.
- `computation/` — arithmetic, algebra, bounds, suprema/infima, limits, epsilon work, metric calculations.
- `decks/` / `cards/lean/` — Lean and Mathlib study cards, with Anki TSV export.

## RemNote convention

Cards use RemNote text syntax:

```
Question >> Answer
```

Import approved batches rather than repeatedly re-importing the whole repository.

## Curriculum

1. Peano Systems
2. Natural Numbers
3. Well-Ordering and Induction
4. Integers
5. Rational Numbers
6. Fields
7. Ordered Fields
8. Archimedean Property
9. Density
10. Dedekind Cuts
11. Real Numbers
12. Bounds
13. Supremum and Infimum
14. LUB / Order Completeness
15. Sequences
16. Sequence Limits
17. Limit Properties
18. Subsequences
19. Cauchy Sequences
20. Sequential Completeness
21. Function Limits
22. Limit Laws
23. Continuity
24. Metric Spaces
25. Metric Convergence
26. Complete Metric Spaces
27. Metric Topology
28. IECE: Identity, Equality, Congruence, Equivalence
29. Logic: Orders, Quantifiers, Natural Deduction
30. ZFC Set Theory
31. Relations, Functions, Order, Well-Ordering
32. Well-Founded and Well-Defined
33. Calculus I

## Completeness convention

Do not call an ordered field complete until the least-upper-bound property has been established.

Order completeness and metric/sequential completeness are kept conceptually distinct and related only after both are defined.


## App v0.1

The repository includes a small browser/PWA review app in `app/`.

GitHub Pages URL after deployment:

```
https://wsollers.github.io/lra-flashcards/
```

Features:
- bundled card data from this repository;
- randomized session queue;
- Show Answer;
- Pass removes the card from the session;
- Fail reinserts the card a few positions later;
- session ends only when every selected card has passed;
- per-card pass/fail statistics stored in browser localStorage;
- deck-level statistics;
- inline LaTeX rendering with KaTeX;
- installable PWA shell.

### Run locally

From the repository root, serve the repository over HTTP. For example:

```bash
python -m http.server 8000
```

Then open:

```
http://localhost:8000/app/
```

Do not open `index.html` directly with a `file://` URL because the app loads JSON card files with `fetch()`.

### Deploy on GitHub Pages

The repository includes `.github/workflows/pages.yml`, which deploys the static
site from `main` to GitHub Pages. In the GitHub repository settings, set Pages
to use **GitHub Actions** as the source. After the next push to `main`, the root
Pages URL redirects to `app/`.

### Card data

The app reads `card-index.json`, which points to JSON deck files under `cards/`.

The first bundled deck is:

```
cards/core/01-peano-systems.json
```

Review statistics are device-local and are not committed to GitHub.

## Anki export

Lean/Mathlib source cards live in `decks/*.md`. Regenerate Anki TSV files in
`dist/` and app JSON files in `cards/lean/` with:

```bash
python scripts/export_tsv.py
```

Import the generated TSV files into Anki with fields mapped as `Front`, `Back`,
and `Tags`, with HTML enabled for the answer field.
