# Portfolio — Plamedi Ilunga

Portfolio Next.js animé : Framer Motion, SCSS, thèmes clair/sombre et formulaire de contact côté serveur.

## Démarrer

```bash
npm install
copy .env.example .env
npm run dev
```

Ouvrir `http://localhost:3000`.

## Configurer le contact

Dans `.env`, renseigner uniquement l’adresse qui doit recevoir les messages :

```env
CONTACT_EMAIL=votre-adresse@exemple.com
```

Le fichier `.env` est ignoré par Git. Le formulaire utilise FormSubmit depuis la route serveur `/api/contact`, donc l’adresse ne sera pas envoyée au navigateur. Lors du premier envoi, FormSubmit envoie un courriel d’activation à cette adresse : il faut le confirmer avant que les messages soient reçus normalement.

En production, ajouter aussi `CONTACT_EMAIL` dans les variables d’environnement de l’hébergeur. Le projet doit être déployé sur un hébergeur qui exécute Next.js côté serveur, comme Vercel ; un export statique ne peut pas traiter le formulaire.

## Modifier le contenu

Les données sont dans `data/` :

- `profile.json` : identité, liens et coordonnées.
- `projects.json` : réalisations affichées dans les cartes animées.
- `ongoing-projects.json` : projets en cours, dont Trempli-md.
- `skills.json` : compétences.
- `experience.json` : parcours et formation.

Pour ajouter un projet en cours, ajouter un objet dans `data/ongoing-projects.json` :

```json
{
  "name": "Nom du projet",
  "status": "En développement",
  "description": "Description courte et concrète.",
  "tags": ["Next.js", "TypeScript"],
  "url": "https://exemple.com"
}
```

Laisser `url` vide si le projet ne doit pas encore être public. Déposer le CV dans `public/CV_Plamedi_Ilunga.pdf` si le lien CV est conservé dans `profile.json`.

## Vérifier et publier

```bash
npm run build
npm start
```

Vérifier les thèmes, les transitions, la navigation clavier, le menu mobile, les liens des projets et le formulaire après avoir activé FormSubmit. Les règles détaillées de maintenance sont dans [claude.md](./claude.md).
