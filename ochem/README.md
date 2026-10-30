# Organic Chemistry Pipeline

This folder holds source data and generated outputs for the organic chemistry
explorer and flashcard pipeline.

## Layout

- `data/` - canonical source records written and reviewed by people.
- `generated/` - build output consumed by the browser app.
- `explorer/` - standalone chemistry explorer single-page app.

## Build

From the repository root:

```bash
docker compose run --rm lra-flashcards python scripts/build_ochem.py
```

Then serve the repository and open:

```text
http://localhost:8000/ochem/explorer/
```
