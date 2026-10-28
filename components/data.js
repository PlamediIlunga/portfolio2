export const me = {
  email: "merdiilunga15@gmail.com",
  phone: "581 899-4493",
  github: "https://github.com/PlamediIlunga",
  linkedin: "https://www.linkedin.com/in/plamedi-ilunga-051434300/",
  cv: "/CV_Plamedi_Ilunga.pdf",
};

export const projects = [
  { title: "Find My FIJ", kind: "Application web", url: "https://find-my-fij.vercel.app/", color: "#4de3c1",
    desc: "Trouve la FIJ la plus proche en un instant : géolocalisation, recherche par adresse, filtres avancés et authentification.",
    tags: ["Next.js", "TypeScript", "SCSS", "Supabase", "Nominatim"] },
  { title: "Lia Cuisine", kind: "Site vitrine", url: "https://liacuisine.vercel.app/", color: "#ffb454",
    desc: "Vitrine d'un restaurant africain de Gatineau : design system SCSS, menu dynamique via API route, formulaire avec anti-spam.",
    tags: ["Next.js", "TypeScript", "SCSS", "API Routes"] },
  { title: "FireSecurityShop API", kind: "Backend", url: "https://firesecurityshop.duckdns.org/swagger/index.html", color: "#9b7bff",
    desc: "API REST ASP.NET Core 8 en Clean Architecture : utilisateurs, commandes, JWT. Déployée sur un VPS Debian avec Nginx et MariaDB.",
    tags: ["ASP.NET Core", "C#", "MariaDB", "JWT", "Nginx"] },
  { title: "FireSecurityShop Web", kind: "Application web", url: "https://firesecurityshoprdl-web.vercel.app/", color: "#ff6b8b",
    desc: "Interface React + Vite d'une boutique de sécurité incendie : produits, commandes et utilisateurs branchés sur l'API REST.",
    tags: ["React", "Vite", "SCSS", "REST API"] },
  { title: "Oceario", kind: "Site immersif", url: "https://oceario-site.vercel.app/", color: "#5cb8ff",
    desc: "Site d'une entreprise aquatique : design immersif, animations fluides et expérience utilisateur soignée.",
    tags: ["React", "Next.js", "SCSS", "Animations"] },
];

export const skills = [
  { name: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "SCSS", "Tailwind", "Svelte", "HTML5"] },
  { name: "Backend", items: ["ASP.NET Core", "C#", "Node.js", "REST API", "JWT", "Python"] },
  { name: "Bases de données", items: ["MySQL", "MariaDB", "SQL Server", "MongoDB", "Entity Framework"] },
  { name: "DevOps & outils", items: ["Git / GitHub", "Linux / Debian", "Nginx", "Docker", "Vercel", "Azure", "Playwright", "Postman"] },
  { name: "Architecture", items: ["Clean Architecture", "SOLID", "MVC", "POO", "Agile / Scrum", "UI / UX", "Sécurité web"] },
];

export const experience = [
  { when: "2025", role: "Développeur web full stack — stage", where: "Cégep de Rivière-du-Loup",
    points: ["Interfaces React / Next.js interactives et responsives", "APIs REST en ASP.NET Core et logique métier sécurisée", "Tests unitaires et E2E avec Playwright", "HTTPS, déploiements automatisés, refactorisation en architecture Clean"] },
  { when: "2024", role: "Opérateur informatique", where: "CSS de Kamouraska – Rivière-du-Loup",
    points: ["Installation et configuration de postes, imprimantes et logiciels", "Gestion des comptes avec Active Directory", "Support aux utilisateurs et résolution de billets", "Maintenance et inventaire du parc matériel"] },
  { when: "2022 – 2025", role: "DEC en Techniques de l'informatique", where: "Cégep de Rivière-du-Loup",
    points: ["Nomination au méritas — Prix de la Rigueur 2025", "7 bourses d'exemption de frais de scolarité", "Bourse d'encouragement à la réussite (Fondation du Cégep, 2024)"] },
];
