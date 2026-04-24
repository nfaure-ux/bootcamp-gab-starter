# PRD {{NN}} - {{Nom de la Feature}}

## 📋 Informations du Document

| Champ       | Valeur           |
| ----------- | ---------------- |
| **Projet**  | {{Projet}}       |
| **Feature** | {{Feature}}      |
| **Version** | {{Version}}      |
| **Date**    | {{Date}}         |
| **Statut**  | Draft            |
| **Auteur**  | {{Auteur}}       |

---

## 🎯 Contexte

### Problème

{{Problème concret à résoudre, formulé avec un cas d'usage vécu.}}

### Utilisateurs cibles

- **{{Persona 1}}** — {{description, volume estimé, contexte d'usage}}
- **{{Persona 2}}** — {{...}}

### Déclencheur métier

{{Pourquoi maintenant ? Deadline, plainte client, opportunité, signal produit.}}

### Objectifs & Mesure du succès

- **Objectif 1** — {{KPI ou signal}}
- **Objectif 2** — {{KPI ou signal}}

### ❌ Hors-scope (cette version)

- {{Exclusion explicite 1}}
- {{Exclusion explicite 2}}

---

## 👥 User Stories

### 🔴 Must-have

- **US-01** — En tant que {{persona}}, je veux {{action}}, afin de {{bénéfice}}.
- **US-02** — En tant que {{persona}}, je veux {{action}}, afin de {{bénéfice}}.

### 🟡 Should-have

- **US-03** — En tant que {{persona}}, je veux {{action}}, afin de {{bénéfice}}.

### 🟢 Could-have

- **US-04** — En tant que {{persona}}, je veux {{action}}, afin de {{bénéfice}}.

---

## 🛠️ Spécifications

### Tâches

- [ ] **T-01** — {{tâche technique concrète}}
- [ ] **T-02** — {{tâche technique concrète}}
- [ ] **T-03** — {{tâche technique concrète}}

### Cas limites

| Cas | Comportement attendu |
| --- | -------------------- |
| {{Edge case 1}} | {{...}} |
| {{Edge case 2}} | {{...}} |
| {{Edge case 3}} | {{...}} |

### Contraintes techniques

- **Performance** : {{ex : LCP < 2.5s, p95 API < 200ms}}
- **Accessibilité** : {{ex : WCAG 2.1 AA, navigation clavier}}
- **SEO** : {{ex : metadata, schema.org, SSG}}
- **Sécurité** : {{ex : validation Zod server-side, rate limiting}}
- **Autres** : {{observabilité, i18n, compliance…}}

### Stack technique

- {{Framework, libs principales}}
- {{Base de données, API externes}}

### Patterns obligatoires

- {{ex : Server Actions pour les mutations}}
- {{ex : Server Components par défaut, Client Components justifiés}}
- {{ex : `cn()` pour classes conditionnelles, Zod pour schémas}}

### Dépendances autorisées

- ✅ **Autorisées** : {{liste des libs OK}}
- ⚠️ **À valider** : {{libs nécessitant accord explicite}}
- ❌ **Interdites** : {{libs à ne pas introduire}}

---

## ✅ Critères d'acceptation

### Critères fonctionnels

- [ ] {{Comportement utilisateur 1 mesurable}}
- [ ] {{Comportement utilisateur 2 mesurable}}
- [ ] {{Comportement utilisateur 3 mesurable}}

### Critères techniques

- [ ] `npm run lint` passe sans erreur
- [ ] `npm run build` passe sans erreur
- [ ] {{Coverage minimale, si applicable}}
- [ ] {{Perf mesurée atteinte}}
- [ ] {{Logs / observabilité en place}}

### Critères UX

- [ ] Responsive : mobile (≤640px), tablet (≤1024px), desktop (>1024px)
- [ ] Accessibilité : navigation clavier, contrastes AA, labels ARIA
- [ ] États gérés : loading, empty, error, success
- [ ] Feedback utilisateur : toasts / messages d'erreur explicites
- [ ] {{Micro-interactions, transitions}}

### Scénarios Gherkin — cas critiques

**Scénario 1 — {{Nom du cas critique}}**

```gherkin
Étant donné {{contexte initial}}
Quand {{action utilisateur}}
Alors {{résultat attendu observable}}
Et {{effet secondaire vérifiable}}
```

**Scénario 2 — {{Nom du cas critique}}**

```gherkin
Étant donné {{contexte}}
Quand {{action}}
Alors {{résultat}}
```

---

## 🤔 À décider

_Questions restées ouvertes à la fin du brainstorming. À trancher avant ou pendant l'implémentation._

- [ ] **{{Question 1}}** — Options envisagées : {{A / B / C}}. Impact : {{...}}.
- [ ] **{{Question 2}}** — Options envisagées : {{A / B}}. Impact : {{...}}.

---

## 📝 Historique des versions

| Version | Date       | Changements       | Auteur        |
| ------- | ---------- | ----------------- | ------------- |
| 1.0     | {{Date}}   | Création initiale | {{Auteur}}    |
