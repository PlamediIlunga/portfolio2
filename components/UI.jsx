"use client";
import { useEffect, useRef, useState } from "react";
import { motion, animate, useScroll, useSpring, useMotionValue, useMotionValueEvent } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export function Split({ text, delay = 0, className }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="mask" aria-hidden>
          <motion.span initial={{ y: "115%", rotate: 4 }} whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true }} transition={{ duration: 1, ease, delay: delay + i * 0.05 }}>
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export const Reveal = ({ children, delay = 0, y = 40, className }) => (
  <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease, delay }}>
    {children}
  </motion.div>
);

export function Magnetic({ children }) {
  const r = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 14 }), sy = useSpring(y, { stiffness: 220, damping: 14 });
  return (
    <motion.div ref={r} style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={(e) => { const b = r.current.getBoundingClientRect(); x.set((e.clientX - b.left - b.width / 2) * 0.3); y.set((e.clientY - b.top - b.height / 2) * 0.3); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

export function Loader({ onDone }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const c = animate(0, 100, { duration: 2.2, ease: "easeInOut", onUpdate: (v) => setN(Math.round(v)), onComplete: () => setTimeout(onDone, 250) });
    return () => c.stop();
  }, []);
  return (
    <motion.div className="loader" exit={{ y: "-100%" }} transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}>
      <div className="loader__name">
        {"Plamedi Ilunga".split("").map((c, i) => (
          <motion.span key={i} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.05, duration: 0.7, ease }}>
            {c === " " ? "\u00A0" : c}
          </motion.span>
        ))}
      </div>
      <div className="loader__count">{n}<small>%</small></div>
      <div className="loader__bar" style={{ transform: `scaleX(${n / 100})` }} />
    </motion.div>
  );
}

export function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 45 }), sy = useSpring(y, { stiffness: 600, damping: 45 });
  const [big, setBig] = useState(false);
  useEffect(() => {
    const mv = (e) => { x.set(e.clientX); y.set(e.clientY); setBig(!!e.target.closest?.("a,button,[data-hover]")); };
    window.addEventListener("mousemove", mv);
    return () => window.removeEventListener("mousemove", mv);
  }, []);
  return <motion.div className={`cursor ${big ? "big" : ""}`} style={{ x: sx, y: sy }} />;
}

export function Progress() {
  const { scrollYProgress } = useScroll();
  const s = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return <motion.div className="progress" style={{ scaleX: s }} />;
}

const links = [["À propos", "about"], ["Projets", "projects"], ["Compétences", "skills"], ["Parcours", "experience"], ["Contact", "contact"]];

export function Nav() {
  const [hide, setHide] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setHide(v > (Nav.last || 0) && v > 200) || (Nav.last = v));
  return (
    <motion.header className="nav" animate={{ y: hide ? -100 : 0 }} transition={{ duration: 0.5, ease }}>
      <a href="#top" className="nav__logo">PI</a>
      <nav>{links.map(([l, id]) => <a key={id} href={`#${id}`}>{l}</a>)}</nav>
    </motion.header>
  );
}

export function Field() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, g = c.getContext("2d");
    let w, h, raf; const m = { x: -999, y: -999 }; const P = [];
    const size = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    size();
    for (let i = 0; i < 80; i++) P.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 });
    const mv = (e) => { m.x = e.clientX; m.y = e.clientY; };
    addEventListener("mousemove", mv); addEventListener("resize", size);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loop = () => {
      g.clearRect(0, 0, w, h);
      P.forEach((p, i) => {
        if (!reduce) { p.x += p.vx; p.y += p.vy; }
        if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - m.x, dy = p.y - m.y, d = Math.hypot(dx, dy);
        if (d < 150 && d > 0) { p.x += (dx / d) * 1.6; p.y += (dy / d) * 1.6; }
        g.fillStyle = "rgba(180,255,235,.75)"; g.beginPath(); g.arc(p.x, p.y, 1.3, 0, 7); g.fill();
        for (let j = i + 1; j < P.length; j++) {
          const q = P[j], l = Math.hypot(p.x - q.x, p.y - q.y);
          if (l < 125) { g.strokeStyle = `rgba(120,200,255,${0.22 * (1 - l / 125)})`; g.beginPath(); g.moveTo(p.x, p.y); g.lineTo(q.x, q.y); g.stroke(); }
        }
      });
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); removeEventListener("mousemove", mv); removeEventListener("resize", size); };
  }, []);
  return <canvas ref={ref} className="field" aria-hidden />;
}
