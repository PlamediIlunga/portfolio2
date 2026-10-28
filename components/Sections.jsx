"use client";
import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView, useScroll, useTransform } from "framer-motion";
import { Split, Reveal, Magnetic } from "./UI";
import { me, projects, skills, experience } from "./data";

const ease = [0.16, 1, 0.3, 1];

export function Hero({ ready }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 180]);
  const o = useTransform(scrollY, [0, 500], [1, 0]);
  const roles = ["Full Stack", "React & Next.js", "ASP.NET Core", "Clean Architecture"];
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2200); return () => clearInterval(t); }, []);
  const line = (t, d) => (
    <span className="mask hero__line">
      <motion.span initial={{ y: "110%" }} animate={ready ? { y: 0 } : {}} transition={{ duration: 1.2, ease, delay: d }}>{t}</motion.span>
    </span>
  );
  return (
    <section id="top" className="hero">
      <div className="aurora" aria-hidden><i /><i /><i /></div>
      <motion.div style={{ y, opacity: o }} className="hero__in">
        <motion.p className="hero__avail" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
          <b /> Disponible pour stage, emploi et projets freelance
        </motion.p>
        <h1>{line("Plamedi", 0.1)}{line("Ilunga.", 0.25)}</h1>
        <div className="hero__row">
          <motion.p className="hero__role" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 0.9 }}>
            Développeur{" "}
            <span className="swap">
              <motion.em key={i} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease }}>{roles[i]}</motion.em>
            </span>
            <br />bilingue, basé à Québec. Je conçois des interfaces vivantes et des API solides.
          </motion.p>
          <motion.div className="hero__cta" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.1, duration: 0.8, ease }}>
            <Magnetic><a className="btn" href="#projects">Voir mes projets</a></Magnetic>
            <Magnetic><a className="btn ghost" href="#contact">Me contacter</a></Magnetic>
          </motion.div>
        </div>
      </motion.div>
      <div className="scrollhint"><span /></div>
    </section>
  );
}

function Count({ to, suffix = "+" }) {
  const r = useRef(null); const v = useInView(r, { once: true }); const [n, setN] = useState(0);
  useEffect(() => { if (v) { const c = animate(0, to, { duration: 1.8, ease, onUpdate: (x) => setN(Math.round(x)) }); return () => c.stop(); } }, [v]);
  return <span ref={r}>{n}{suffix}</span>;
}

export function About() {
  return (
    <section id="about" className="sec about">
      <h2><Split text="Du Cégep de Rivière-du-Loup à la production : j'écris du code qui tient la route." /></h2>
      <div className="about__grid">
        <Reveal className="about__txt">
          <p>Développeur full stack bilingue diplômé en Techniques de l'informatique, je maîtrise autant le frontend, de React à Next.js, que le backend avec ASP.NET Core et les bases de données relationnelles.</p>
          <p>J'ai pris l'habitude de la qualité : architecture propre (Clean Architecture, SOLID), sécurité des données, tests automatisés et déploiements continus.</p>
          <div className="stats">
            <div><strong><Count to={2} /></strong><span>ans d'expérience</span></div>
            <div><strong><Count to={5} /></strong><span>projets en ligne</span></div>
            <div><strong><Count to={15} /></strong><span>technologies</span></div>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="code" >
          <div className="code__bar"><i /><i /><i /><span>plamedi.config.ts</span></div>
<pre>{`const developer = {
  name: "Plamedi Ilunga",
  location: "Québec, Canada",
  languages: ["FR", "EN"],
  focus: [
    "Web Applications",
    "REST APIs",
    "Cloud Deployment",
    "Clean Architecture",
  ],
  education: "DEC Informatique, 2025",
  available: true,
};`}</pre>
        </Reveal>
      </div>
    </section>
  );
}

function Card({ p, i }) {
  const move = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
    e.currentTarget.style.setProperty("--mx", `${x * 100}%`);
    e.currentTarget.style.setProperty("--my", `${y * 100}%`);
    e.currentTarget.style.transform = `perspective(1200px) rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 7}deg)`;
  };
  const leave = (e) => (e.currentTarget.style.transform = "");
  return (
    <div className="pcard" style={{ top: `${96 + i * 26}px` }}>
      <motion.a href={p.url} target="_blank" rel="noreferrer" data-hover className="pcard__in" style={{ "--a": p.color }}
        onMouseMove={move} onMouseLeave={leave}
        initial={{ opacity: 0, y: 120, scale: 0.94 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-12%" }} transition={{ duration: 1.1, ease }}>
        <span className="pcard__ghost" aria-hidden>{p.title.split(" ")[0]}</span>
        <div className="pcard__top"><span className="pill">{p.kind}</span><span className="pcard__go">↗</span></div>
        <div>
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
          <ul>{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </motion.a>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="sec projects">
      <h2><Split text="Cinq projets, du prototype à la production." /></h2>
      <div className="stack">{projects.map((p, i) => <Card key={p.title} p={p} i={i} />)}</div>
    </section>
  );
}

export function Skills() {
  const all = skills.flatMap((s) => s.items);
  const row = (list, rev) => (
    <div className={`marquee ${rev ? "rev" : ""}`}><div>{[...list, ...list].map((t, i) => <span key={i}>{t}</span>)}</div></div>
  );
  return (
    <section id="skills" className="sec skills">
      <h2><Split text="Une stack complète, du pixel au serveur." /></h2>
      <div className="marquees">{row(all.slice(0, 22))}{row(all.slice(22).concat(all.slice(0, 10)), true)}</div>
      <div className="sgrid">
        {skills.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.07} className="scard">
            <h3>{s.name}</h3>
            <ul>{s.items.map((t) => <li key={t}>{t}</li>)}</ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 70%"] });
  return (
    <section id="experience" className="sec exp">
      <h2><Split text="Expérience et formation." /></h2>
      <div className="tl" ref={ref}>
        <div className="tl__rail"><motion.div style={{ scaleY: scrollYProgress }} /></div>
        {experience.map((e) => (
          <Reveal key={e.role} className="tl__item">
            <span className="tl__when">{e.when}</span>
            <h3>{e.role}</h3>
            <p className="tl__where">{e.where}</p>
            <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:${me.email}?subject=${encodeURIComponent("Contact depuis ton portfolio")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return (
    <section id="contact" className="sec contact">
      <h2 className="giant"><Split text="Parlons de votre projet." /></h2>
      <div className="contact__grid">
        <Reveal>
          <Magnetic><a className="mail" href={`mailto:${me.email}`}>{me.email}</a></Magnetic>
          <p className="muted">{me.phone} · Québec, Canada</p>
          <div className="contact__links">
            <a href={me.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={me.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={me.cv} download>Télécharger mon CV</a>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <form onSubmit={submit}>
            <label>Nom<input name="name" required autoComplete="name" /></label>
            <label>Courriel<input name="email" type="email" required autoComplete="email" /></label>
            <label>Message<textarea name="message" rows={4} required /></label>
            <button className="btn" type="submit">{sent ? "Ouverture de votre messagerie…" : "Envoyer le message"}</button>
          </form>
        </Reveal>
      </div>
      <footer>© 2026 Plamedi Ilunga · Construit avec Next.js et SCSS</footer>
    </section>
  );
}
