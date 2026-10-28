# Instructions de maintenance du portfolio

## Intention

Ce portfolio doit rester vivant, immersif et précis. Sa personnalité vient des particules interactives, de l’aurora, du loader, du curseur magnétique, des cartes de projets inclinées, du défilement de technologies et de la timeline progressive. Améliorer cette base au lieu de la remplacer par une mise en page statique ou des cartes génériques.

Le hero doit présenter Plamedi clairement sans faire de son nom un bloc démesuré. Conserver la typographie révélée par lignes et les rôles qui changent, mais privilégier le message, la disponibilité et les actions.

## Stack et commandes

- Next.js 14 avec App Router, React 18, SCSS et Framer Motion.
- Installer avec `npm install`.
- Développer avec `npm run dev`.
- Valider avec `npm run build`.
- Lancer la production avec `npm start` après la compilation.

Ne pas introduire de bibliothèque UI, de framework CSS ou de dépendance d’icônes sans raison concrète. Préserver les transitions existantes et respecter `prefers-reduced-motion`.

## Organisation du contenu

Toutes les données qui évoluent doivent être dans `data/`, pas directement dans des composants :

- `profile.json` : profil, liens et coordonnées.
- `projects.json` : projets publics.
- `ongoing-projects.json` : projets en cours.
- `skills.json` : catégories de compétences.
- `experience.json` : expériences, formation et points clés.

Conserver des tableaux pour les tags et les points. Ne pas inventer de données pour Trempli-md ou tout autre projet : pas de fonctionnalités, de métriques, de date de sortie ni de stack tant qu’elles ne sont pas fournies. Pour un lien non disponible, utiliser une chaîne vide dans `url`.

## Design et interactions

La palette est définie par les variables CSS du début de `app/globals.scss`. Le thème sombre est la direction principale : bleu nuit, turquoise aurora, violet et bleu glacé. Le thème clair garde la même énergie avec un fond vert pâle et des contrastes profonds. Toute nouvelle couleur doit fonctionner dans les deux thèmes.

Le thème est enregistré dans `localStorage` sous `portfolio-theme`. Ne pas supprimer l’attribut `data-theme` de la balise HTML ni le bouton de bascule de la navigation. Éviter les changements de thème qui cassent les effets de glassmorphism, les bordures ou le contraste.

Préserver les animations de révélation, les cartes collantes et leur effet de lumière/tilt, les marquises, le canvas de particules, le curseur pour pointeur précis, et la timeline. Toute nouvelle interaction doit fonctionner au clavier. Les focus doivent rester visibles. Les boutons doivent avoir un type, les champs des labels et les liens externes `rel="noreferrer"`.

## Contact

`CONTACT_EMAIL` est la seule variable nécessaire. Elle va uniquement dans `.env` local et dans l’environnement serveur de production. Ne jamais utiliser `NEXT_PUBLIC_CONTACT_EMAIL`, l’afficher dans un composant client, la logger ou la versionner.

La route `app/api/contact/route.js` valide le formulaire puis envoie à FormSubmit via son endpoint AJAX. Le fournisseur doit être activé par le lien reçu dans le premier courriel. L’interface ne doit afficher un succès que si le fournisseur renvoie une confirmation positive. Conserver le champ honeypot et les validations : nom de deux caractères, courriel valide, message de dix à cinq mille caractères.

Le déploiement doit prendre en charge les routes serveur Next.js. Ajouter la même variable dans le tableau de bord de l’hébergeur, redéployer, soumettre un message de test et confirmer l’activation dans la boîte de réception. Ne jamais tester avec une vraie adresse sans l’accord explicite de son propriétaire.

## Contrôle avant livraison

Exécuter `npm run build`. Vérifier la page en desktop et mobile, les deux thèmes, le menu, les liens, l’absence de débordement horizontal, le mode réduit et le formulaire dans ses états de succès et d’erreur. Contrôler que `.env` est ignoré avec `git check-ignore .env` et que seul `.env.example` vide peut être versionné.
