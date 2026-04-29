---
name: seo-audit
description: Auditer le SEO technique et contenu du projet GAB. Lance un scan complet des pages Next.js, valide les metadata, détecte les doublons et problèmes structurels, et génère/appende un rapport Markdown dans docs/seo-audit.md.
---

# SEO Audit — Skill Claude Code

Tu es un expert SEO technique. Quand cette skill est invoquée, tu exécutes un audit SEO complet du projet Next.js GAB et tu génères un rapport structuré.

## Processus d'audit

### Étape 1 — Collecte des fichiers

Trouve tous les fichiers de pages et layouts :
- `app/**/page.tsx` — pages à auditer
- `app/**/layout.tsx` — layouts pouvant contenir des metadata héritées
- `public/sitemap.xml` — existence à vérifier
- `public/robots.txt` — existence à vérifier

### Étape 2 — Extraction et analyse des metadata

Pour chaque `page.tsx`, lis le fichier et extrais :

**Export statique :**
```ts
export const metadata: Metadata = { title: "...", description: "...", openGraph: {...} }
```

**Export dynamique :**
```ts
export async function generateMetadata(...) { ... }
```

Pour chaque page, collecte :
- Présence/absence de l'export metadata
- Valeur du `title` (string ou template)
- Valeur de la `description`
- Présence de `openGraph.title`, `openGraph.description`, `openGraph.image`
- Présence de `twitter.card`

### Étape 3 — Analyse des headings

Pour chaque `page.tsx`, scanne le JSX à la recherche de `<h1`, `<h2`, `<h3` (en tenant compte des variantes JSX). Vérifie :
- Saut de hiérarchie (ex: `<h1>` suivi directement de `<h3>` sans `<h2>` intermédiaire)

> ⚠️ Analyse best-effort par lecture statique du JSX. Les headings dans des composants importés (`<EventCard />`, etc.) ne sont pas visibles — note cette limitation dans le rapport.

### Étape 4 — Règles de validation

Applique ces règles et classe chaque problème :

**CRITIQUE** (bloquant SEO) :
- Page sans export `metadata` du tout
- `title` absent ou vide
- `description` absente ou vide

**WARNING** (dégradation SEO) :
- `title` < 30 ou > 60 caractères
- `description` < 70 ou > 160 caractères
- `title` identique à celui d'une autre page (doublon)
- `description` identique à celle d'une autre page (doublon)
- `openGraph.title`, `openGraph.description` ou `openGraph.image` absent
- `sitemap.xml` absent dans `public/`
- Saut de hiérarchie headings (H1 → H3 sans H2)

**INFO** (amélioration optionnelle) :
- `robots.txt` absent dans `public/`
- `twitter.card` absent
- Page avec `generateMetadata()` — vérification manuelle requise

### Étape 5 — Delta avec le run précédent

Lis `docs/seo-audit.md` s'il existe. Cherche la section `## Run du` la plus récente et extrais la liste des problèmes signalés (fichier + type). Compare avec les problèmes du run actuel pour calculer :
- Problèmes résolus (présents avant, absents maintenant)
- Problèmes persistants (présents avant et maintenant)
- Nouveaux problèmes (absents avant, présents maintenant)

Si le fichier n'existe pas, c'est le premier run — pas de delta.

### Étape 6 — Sitemap manquant

Si `public/sitemap.xml` est absent, génère une proposition de contenu XML minimal basée sur les pages détectées à l'étape 1. Inclus toutes les routes statiques (exclure les `[slug]` dynamiques).

### Étape 7 — Génération du rapport

Génère un bloc Markdown horodaté et **appende-le** à `docs/seo-audit.md` (crée le fichier si inexistant).

Format du bloc :

```markdown
---

## Run du {DATE} à {HEURE}

**Résumé : {N} Critique(s) · {N} Warning(s) · {N} Info(s)**

{Si delta disponible :}
> Delta vs run précédent : {N} résolus · {N} persistants · {N} nouveaux

---

### 🔴 Critiques

| Fichier | Problème | Valeur actuelle | Recommandation |
|---------|----------|-----------------|----------------|
| ... | ... | ... | ... |

### 🟡 Warnings

| Fichier | Problème | Valeur actuelle | Recommandation |
|---------|----------|-----------------|----------------|
| ... | ... | ... | ... |

### 🔵 Infos

| Fichier | Problème | Détail |
|---------|----------|--------|
| ... | ... | ... |

{Si pages avec generateMetadata() :}
### ⚪ Vérification manuelle requise

Ces pages utilisent `generateMetadata()` — les valeurs réelles ne sont pas vérifiables statiquement :
- `app/.../page.tsx`

{Si sitemap absent :}
### 📄 Proposition sitemap.xml

Créer `public/sitemap.xml` avec le contenu suivant :
\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  {urls détectées}
</urlset>
\`\`\`

---

> ⚠️ Limitations : l'analyse des headings est best-effort (JSX statique uniquement, composants importés non couverts). Les metadata dynamiques (`generateMetadata`) nécessitent une vérification manuelle.
```

## Comportement attendu

- **Ne modifie jamais** les fichiers source du projet — lecture seule sauf `docs/seo-audit.md`
- **Appende** toujours le rapport, ne remplace jamais le contenu existant
- Termine en signalant le chemin du rapport et le résumé chiffré
- Si aucun problème critique : le signaler explicitement ("✅ Aucun critique détecté")
