import React, { useState } from "react";
import {
  Menu, X, Moon, Sun, Download, Mail, Linkedin, Github, FileText, Newspaper, User, Globe
} from "lucide-react";

// ==========================
// Economista — Website Base
// ==========================

// --- Links pessoais (substituir) ---
const links = {
  email: "mailto:vitor17reis@gmail.com",
  linkedin: "https://www.linkedin.com/in/vítor-reis",
  github: "https://github.com/seu-utilizador",
  cv: "/cv.pdf",
};

// --- Estado inicial dos artigos (vazio por defeito) ---
const posts = [];

// --- Competências (baseado no CV) ---
const skills = [
  "Data Analysis (Stata, Excel)",
  "Macroeconomia & Regulação Financeira",
  "Política Monetária e Financeira",
  "Econometria e Cálculo Matemático",
  "Office (Word & Excel)",
  "Liderança & Inovação Tecnológica"
];

// --- Idiomas ---
const languages = [
  { name: "Português", level: "Nativo" },
  { name: "Inglês", level: "B1" },
  { name: "Espanhol", level: "B1" },
];

const Container = ({ children }) => (
  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const Section = ({ id, title, icon: Icon, children }) => (
  <section id={id} className="scroll-mt-24 py-12">
    <div className="flex items-center gap-3 mb-6">
      {Icon ? <Icon className="w-5 h-5" aria-hidden /> : null}
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
    {children}
  </section>
);

function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  return { dark, setDark };
}

const Nav = ({ onToggleTheme, dark }) => {
  const [open, setOpen] = useState(false);
  const navItems = [
    { href: "#sobre", label: "Sobre" },
    { href: "#cv", label: "CV" },
    { href: "#analises", label: "Análises" },
    { href: "#contacto", label: "Contacto" },
  ];
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800">
      <Container>
        <div className="flex items-center justify-between h-16">
          <a href="#" className="font-semibold tracking-tight">Vítor Reis</a>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((i) => (
              <a key={i.href} href={i.href} className="hover:underline underline-offset-4">{i.label}</a>
            ))}
            <button onClick={onToggleTheme} aria-label="Alternar tema" className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800">
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </nav>
          <button className="md:hidden p-2" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            {navItems.map((i) => (
              <a key={i.href} href={i.href} className="py-2 border-b border-neutral-200 dark:border-neutral-800">{i.label}</a>
            ))}
            <button onClick={onToggleTheme} className="mt-2 inline-flex items-center gap-2 self-start px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800">
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}<span>Alternar tema</span>
            </button>
          </div>
        )}
      </Container>
    </header>
  );
};

const Card = ({ children }) => (
  <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:shadow-sm transition-shadow">{children}</div>
);

const Hero = () => (
  <section className="pt-10 pb-8 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
    <Container>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">Economista — Vítor Reis</h1>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300">Sou um jovem economista focado em macroeconomia, política monetária e análise de dados. Partilho semanalmente reflexões sobre a Zona Euro, Portugal e tendências globais.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={links.cv} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700">
              <Download className="w-4 h-4" /> Download CV
            </a>
            <a href={links.linkedin} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href={links.github} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
        <Card>
          <h3 className="font-medium flex items-center gap-2"><User className="w-4 h-4"/>Sobre mim</h3>
          <p className="mt-3 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
            Tenho 20 anos, sou disciplinado, proativo e persistente. Interesso-me por análise de dados, economia financeira, regulação e política macroeconómica. Procuro aplicar pensamento crítico e competências técnicas para interpretar fenómenos económicos e contribuir para soluções práticas.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="text-xs px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800">{s}</span>
            ))}
          </div>
        </Card>
      </div>
    </Container>
  </section>
);

const SecCV = () => (
  <Section id="cv" title="CV" icon={FileText}>
    <div className="grid md:grid-cols-3 gap-6">
      <Card>
        <h3 className="font-medium">Educação</h3>
        <ul className="mt-3 space-y-2 text-sm">
          <li><strong>Mestrado em Economia</strong> — FEP, Universidade do Porto (2023–Presente)</li>
          <li><strong>Licenciatura em Economia</strong> — FEUC, Universidade de Coimbra (2019–2023)</li>
          <li><strong>Erasmus+</strong> — Universidade Autónoma de Madrid (2021–2022)</li>
        </ul>
      </Card>
      <Card>
        <h3 className="font-medium">Experiência</h3>
        <ul className="mt-3 space-y-2 text-sm">
          <li><strong>Administrative Assistant</strong> — Ibermetais, Indústria de Trefilagem (Mar. 2023 – Set. 2023). Apoio à cadeia logística, controlo de stocks e departamento comercial.</li>
          <li><strong>Internship</strong> — M. Monteiro Serviços de Contabilidade (Jul. 2022). Apoio à contabilidade e organização administrativa.</li>
        </ul>
      </Card>
      <Card>
        <h3 className="font-medium">Competências &amp; Ferramentas</h3>
        <ul className="mt-3 space-y-2 text-sm">
          <li>Stata, Excel, Word</li>
          <li>Econometria aplicada, Análise de dados</li>
          <li>Quick thinking, foco em resultados</li>
        </ul>
      </Card>
      <Card>
        <h3 className="font-medium flex items-center gap-2"><Globe className="w-4 h-4"/>Idiomas</h3>
        <ul className="mt-3 space-y-2 text-sm">
          {languages.map((lang) => (
            <li key={lang.name}><strong>{lang.name}</strong> — {lang.level}</li>
          ))}
        </ul>
      </Card>
    </div>
  </Section>
);

const SecAnalises = () => (
  <Section id="analises" title="Análises Semanais" icon={Newspaper}>
    {posts.length === 0 ? (
      <Card>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">Ainda não há artigos publicados. Quando criar o primeiro, adicione um objeto no array `posts` com título, data, resumo e url.</p>
      </Card>
    ) : (
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <Card key={p.id}>
            <div className="text-xs text-neutral-500">{p.date}</div>
            <h3 className="mt-1 font-medium leading-snug">{p.title}</h3>
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{p.summary}</p>
            <a href={p.url} className="mt-3 inline-flex text-sm underline underline-offset-4">Ler mais</a>
          </Card>
        ))}
      </div>
    )}
  </Section>
);

const SecContacto = () => (
  <Section id="contacto" title="Contacto" icon={Mail}>
    <Card>
      <form className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-1">
          <label className="block text-sm mb-1">Nome</label>
          <input className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" placeholder="O seu nome" />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm mb-1">Email</label>
          <input type="email" className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" placeholder="nome@exemplo.pt" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Mensagem</label>
          <textarea rows={5} className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" placeholder="Escreva a sua mensagem" />
        </div>
        <div className="md:col-span-2 flex items-center gap-3">
          <button type="button" className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700">Enviar</button>
          <a href={links.email} className="inline-flex items-center gap-2 text-sm underline underline-offset-4"><Mail className="w-4 h-4"/> ou enviar por email</a>
        </div>
      </form>
    </Card>
    <div className="mt-4 flex items-center gap-4 text-sm">
      <a href={links.linkedin} className="underline underline-offset-4">LinkedIn</a>
      <a href={links.github} className="underline underline-offset-4">GitHub</a>
      <a href={links.email} className="underline underline-offset-4">Email</a>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="py-8 border-t border-neutral-200 dark:border-neutral-800 text-sm text-neutral-600 dark:text-neutral-400">
    <Container>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>© {new Date().getFullYear()} Vítor Reis. Todos os direitos reservados.</div>
        <div className="flex items-center gap-4">
          <a href="#sobre" className="underline underline-offset-4">Topo</a>
          <a href="#analises" className="underline underline-offset-4">Análises</a>
          <a href="#contacto" className="underline underline-offset-4">Contacto</a>
        </div>
      </div>
    </Container>
  </footer>
);

export default function EconomistaSiteBase() {
  const { dark, setDark } = useTheme();
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Nav onToggleTheme={() => setDark((d) => !d)} dark={dark} />
      <main>
        <Hero />
        <Container>
          <Section id="sobre" title="Sobre" icon={User}>
            <Card>
              <p className="text-sm leading-7 text-neutral-700 dark:text-neutral-300">
                Sou um jovem economista com formação pela Universidade de Coimbra e atualmente a frequentar o Mestrado em Economia na FEP, Universidade do Porto. Tenho experiência em contabilidade, logística e forte interesse em análise macroeconómica e política monetária. Procuro aplicar competências técnicas e pensamento crítico para compreender fenómenos económicos e comunicar de forma clara os seus impactos.
              </p>
            </Card>
          </Section>
          <SecCV />
          <SecAnalises />
          <SecContacto />
        </Container>
      </main>
      <Footer />
    </div>
  );
}