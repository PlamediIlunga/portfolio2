"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader, Cursor, Progress, Nav, Field } from "../components/UI";
import { Hero, About, Projects, Skills, Experience, Contact } from "../components/Sections";

export default function Home() {
  const [ready, setReady] = useState(false);
  return (
    <>
      <AnimatePresence>{!ready && <Loader key="loader" onDone={() => setReady(true)} />}</AnimatePresence>
      <Field />
      <Cursor />
      <Progress />
      <Nav />
      <main>
        <Hero ready={ready} />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
