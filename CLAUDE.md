# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Corrections et compléments

### Route group réelle
Le groupe de routes publiques est `(public)/` (non `(marketing)/` comme indiqué ci-dessus).

### Couche données actuelle
Les données sont stockées dans des fichiers JSON locaux dans `data/` (ex: `data/events.json`). Les types correspondants sont dans `lib/types/content.ts`. Aucune base de données externe n'est connectée pour l'instant.

### Variables d'environnement complètes

```
RESEND_API_KEY=        # Newsletter (non implémenté — route retourne 501)
NEXT_PUBLIC_SITE_URL=  # URL du site pour les métadonnées OpenGraph
```

### Classes Tailwind typographie

- `font-heading` → police `Mode` (variable CSS `--font-mode`, fichier local `public/fonts/`)
- `font-body` → police `Capriola` (variable CSS `--font-capriola`, Google Fonts)

### Utilitaires `lib/utils.ts`

`cn()`, `formatDate()`, `formatEventDate()` (locale fr-FR), `slugify()`, `truncate()`
