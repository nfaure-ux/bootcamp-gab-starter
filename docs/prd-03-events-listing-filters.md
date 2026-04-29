# PRD 03 - Page Événements avec Filtres

## 📋 Informations du Document

| Champ       | Valeur                          |
| ----------- | ------------------------------- |
| **Projet**  | GAB — GenAI Builders            |
| **Feature** | Page événements avec filtres    |
| **Version** | 1.0                             |
| **Date**    | 2026-04-29                      |
| **Statut**  | Draft                           |
| **Auteur**  | Claude Code                     |

---

## 🎯 Contexte

### Problème

La page `/events` est actuellement un squelette vide qui n'affiche aucun événement. Les membres GAB ne peuvent pas trouver les events à venir ni retrouver les replays passés. Il n'existe aucun moyen de filtrer par ville, type ou période, rendant la page inutilisable dès que le catalogue d'events grossit.

### Utilisateurs cibles

- **Membre GAB actif** — professionnel cherchant des events à rejoindre near him (par ville) ou dans un format précis (webinar vs meetup). Usage typique : visite hebdomadaire, partage de liens filtrés à des collègues.
- **Membre cherchant un replay** — a manqué un event passé, arrive directement sur la page pour le retrouver via le toggle "Passés".

### Déclencheur métier

La page est vide alors que le JSON contient déjà des événements. La communauté grandit (Lille, Paris, Lyon, Remote) et le catalogue va s'enrichir — sans filtres, la page devient rapidement illisible.

### Objectifs & Mesure du succès

- **Objectif 1** — La page affiche tous les events du JSON avec filtrage fonctionnel (signal : 0 état vide par défaut).
- **Objectif 2** — Un lien filtré partagé restaure exactement la même vue (signal : URL persistée, hydratation sans erreur).

### ❌ Hors-scope (cette version)

- Pagination (volume < 100 events, tri côté client suffisant)
- Recherche textuelle full-text
- Filtre multi-sélection sur le type
- Intégration Luma (les données restent dans le JSON local)
- Gestion des états loading (filtrage synchrone côté client)

---

## 👥 User Stories

### 🔴 Must-have

- **US-01** — En tant que membre GAB, je veux voir la liste des events filtrée par défaut sur "À venir" afin de trouver immédiatement quoi rejoindre.
- **US-02** — En tant que membre, je veux filtrer par ville (Toutes / Lille / Paris / Lyon / Remote) afin de ne voir que les events accessibles géographiquement.
- **US-03** — En tant que membre, je veux filtrer par type (Tous / meetup / webinar / workshop / conference) afin de trouver le format qui me convient.
- **US-04** — En tant que membre, je veux que l'URL reflète les filtres actifs et que tout lien partagé restaure la même sélection, afin de partager facilement une vue filtrée à un collègue.
- **US-05** — En tant que membre cherchant un replay, je veux basculer sur "Passés" afin de retrouver un event que j'ai manqué.
- **US-06** — En tant que membre, je veux un état vide explicite quand aucun event ne correspond à mes filtres, afin de comprendre que c'est normal et non un bug.

### 🟡 Should-have

- **US-07** — En tant que membre sur mobile, je veux accéder aux filtres sans scroll excessif afin d'utiliser la page confortablement.
- **US-08** — En tant que membre, je veux un CTA "Réinitialiser les filtres" sur l'état vide afin de ne pas rester bloqué.

---

## 🛠️ Spécifications

### Tâches

**Données**
- [ ] **T-01** — Ajouter le champ `city: "Lille" | "Paris" | "Lyon" | "Remote"` au type `Event` dans `lib/types/content.ts`
- [ ] **T-02** — Enrichir `data/events.json` avec ~12 events fictifs couvrant les 4 villes, les 4 types (`meetup`, `webinar`, `workshop`, `conference`), et les deux états (passés et à venir)

**Composants**
- [ ] **T-03** — Créer `components/events/events-filter.tsx` — barre de filtres (ville, type, période) en Client Component, sync URL via `useSearchParams` + `router.replace`
- [ ] **T-04** — Créer `components/events/events-list.tsx` — liste filtrée + état vide, reçoit tous les events en prop, applique le filtrage et le tri côté client
- [ ] **T-05** — Mettre à jour `components/events/event-card.tsx` — badge ville coloré selon le design system

**Page**
- [ ] **T-06** — Réécrire `app/(public)/events/page.tsx` — Server Component qui lit `data/events.json` via `fs/promises` et passe les données + `searchParams` initiaux aux composants clients
- [ ] **T-07** — Implémenter la logique de filtrage (ville + type + période en AND) et le tri (À venir → date croissante, Passés → date décroissante, Tous → à venir d'abord)

### Cas limites

| Cas | Comportement attendu |
| --- | -------------------- |
| Aucun event à venir (toggle "À venir") | État vide spécifique "Pas d'event à venir pour le moment" + CTA réinitialiser |
| Combinaison ville + type + période sans résultat | État vide générique "Aucun résultat pour ces filtres" + CTA "Réinitialiser les filtres" |
| URL avec `?city=new-york` (valeur invalide) | Ignoré silencieusement, fallback sur "Toutes" |
| URL avec `?period=yesterday` (valeur invalide) | Ignoré silencieusement, fallback sur "À venir" |
| Event sans champ `city` (données legacy) | Traité comme appartenant à "Toutes" (non exclu par un filtre ville actif) |
| `is_past` stale dans le JSON | La période est calculée à la volée via `new Date(event.event_date) < new Date()` |

### Contraintes techniques

- **Performance** : filtrage synchrone côté client, pas de requête réseau — aucune contrainte de latence
- **Accessibilité** : filtres navigables au clavier, labels `aria-label` sur les selects, contraste AA
- **SEO** : page Server Component, metadata statiques, pas d'impact SSG
- **Sécurité** : lecture seule depuis JSON local, aucune mutation, aucune surface d'attaque
- **Hydratation** : les `searchParams` initiaux sont passés en props depuis le Server Component pour éviter tout mismatch SSR/client
- **Tri** : appliqué après filtrage, jamais avant

### Stack technique

- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS + `cn()` pour classes conditionnelles
- shadcn/ui : `Badge`, `Button`, `Select`
- Données : `data/events.json` lu via `fs/promises` dans le Server Component

### Patterns obligatoires

- Server Components par défaut — `EventsFilter` et `EventsList` sont les seuls Client Components
- `cn()` pour toutes les classes conditionnelles
- Aucune Server Action (feature lecture seule)
- `useSearchParams` + `router.replace` pour la sync URL (pas de `router.push` pour éviter d'empiler l'historique)
- Validation des `searchParams` : whitelist explicite des valeurs autorisées, pas de cast aveugle

### Dépendances autorisées

- ✅ **Autorisées** : shadcn/ui existant (`Badge`, `Button`, `Select`), `next/navigation`, `fs/promises`
- ⚠️ **À valider** : `@radix-ui/react-toggle-group` si disponible pour le toggle période — sinon boutons `Button` custom
- ❌ **Interdites** : Zustand, React Query, toute lib de state externe

---

## ✅ Critères d'acceptation

### Critères fonctionnels

- [ ] Par défaut, la page affiche les events "À venir" triés par date croissante
- [ ] Filtrer par ville réduit la liste aux events de cette ville uniquement
- [ ] Filtrer par type réduit la liste aux events de ce type uniquement
- [ ] Les filtres ville + type + période se combinent en AND
- [ ] L'URL est mise à jour à chaque changement de filtre sans rechargement de page
- [ ] Arriver sur `/events?city=paris&type=webinar&period=past` applique les filtres immédiatement
- [ ] Les paramètres URL invalides sont ignorés silencieusement (fallback valeur par défaut)
- [ ] Un état vide s'affiche quand aucun event ne correspond, avec CTA "Réinitialiser les filtres"
- [ ] Cliquer "Réinitialiser" remet les 3 filtres aux valeurs par défaut et met à jour l'URL

### Critères techniques

- [ ] `npm run lint` passe sans erreur
- [ ] `npm run build` passe sans erreur
- [ ] Aucun `console.error` à l'hydratation (pas de mismatch SSR/client)
- [ ] `city` typé en union littérale dans `Event`, pas de `string` générique
- [ ] Tri appliqué après filtrage, jamais avant

### Critères UX

- [ ] Filtres visibles sans scroll sur desktop
- [ ] Sur mobile, les filtres s'empilent proprement sans overflow horizontal
- [ ] Badge ville coloré : Lille (`#14532d`/`#86efac`), Paris (`#1e3a5f`/`#93c5fd`), Lyon (`#7f1d1d`/`#fca5a5`), Remote (`#581c87`/`#d8b4fe`)
- [ ] État vide différencié : "Pas d'event à venir" vs "Aucun résultat pour ces filtres"
- [ ] Aucun état loading nécessaire (filtrage synchrone)

### Scénarios Gherkin — cas critiques

**Scénario 1 — Lien partagé filtré**

```gherkin
Étant donné un utilisateur qui ouvre /events?city=lyon&type=workshop&period=upcoming
Quand la page se charge
Alors le filtre ville affiche "Lyon"
Et le filtre type affiche "Workshop"
Et le filtre période affiche "À venir"
Et seuls les workshops lyonnais à venir sont listés
```

**Scénario 2 — État vide avec réinitialisation**

```gherkin
Étant donné un utilisateur qui filtre sur city=remote, type=conference, period=upcoming
Et qu'aucun event ne correspond
Quand l'état vide s'affiche
Alors un message "Aucun résultat pour ces filtres" est visible
Et un bouton "Réinitialiser les filtres" est présent
Quand l'utilisateur clique "Réinitialiser"
Alors les filtres reviennent aux valeurs par défaut (Toutes / Tous / À venir)
Et l'URL devient /events
```

**Scénario 3 — Paramètre URL invalide**

```gherkin
Étant donné un utilisateur qui ouvre /events?city=new-york&period=yesterday
Quand la page se charge
Alors le filtre ville affiche "Toutes"
Et le filtre période affiche "À venir"
Et aucune erreur n'est levée dans la console
```

---

## 🤔 À décider

_Aucune question ouverte — toutes les décisions ont été tranchées pendant le brainstorming._

---

## 📝 Historique des versions

| Version | Date       | Changements       | Auteur      |
| ------- | ---------- | ----------------- | ----------- |
| 1.0     | 2026-04-29 | Création initiale | Claude Code |
