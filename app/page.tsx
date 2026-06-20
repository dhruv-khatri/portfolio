"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useTheme } from "next-themes"
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Database,
  Dna,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react"
import Image from "next/image"

const navigation = ["about", "experience", "projects", "contact"]

const experience = [
  {
    period: "2025 — Present",
    role: "Scientist",
    company: "Eli Lilly and Company",
    description:
      "Working on Artificial Intelligence, Machine Learning, and Bioinformatics for Large Molecule Discovery.",
  },
  {
    period: "2024 — Present",
    role: "Research Assistant",
    company: "Bafna Lab · UC San Diego",
    description:
      "Studying ecDNA and gene knockout results across cancer cell lines. Building co-amplification networks and statistical analysis tools.",
  },
  {
    period: "Summer 2024",
    role: "Research & Development Intern",
    company: "Eli Lilly and Company",
    description:
      "Applied AI and computational methods to protein design and engineering for early large-molecule discovery.",
  },
  {
    period: "2023 — 2024",
    role: "Research Assistant",
    company: "Rana Lab · UC San Diego School of Medicine",
    description:
      "Developed single-cell RNA-seq pipelines, analyzed TCGA and GTEx datasets, and optimized bioinformatics workflows for HPC environments.",
  },
]

const projects = [
  {
    index: "01",
    title: "Health xAI",
    type: "AI SYSTEM",
    description:
      "A wellness intelligence system that turns Apple Health signals into personalized daily guidance using a generative AI pipeline.",
    image: "/HealthxAI_logo.png",
    details: [
      ["Input", "Apple Health biometrics"],
      ["System", "Contextual insight pipeline"],
      ["Stack", "Swift · Flask · Python · Claude"],
    ],
  },
  {
    index: "02",
    title: "Melanoma Detection",
    type: "COMPUTER VISION",
    description:
      "A deep-learning image classifier designed to identify visual patterns associated with malignant skin lesions.",
    image: "/Melanoma_detection_logo.png",
    details: [
      ["Input", "Dermoscopic imagery"],
      ["Model", "Convolutional neural network"],
      ["Stack", "TensorFlow · Python"],
    ],
  },
  {
    index: "03",
    title: "Connect Four Prediction",
    type: "PREDICTIVE MODELING",
    description:
      "A spatial machine-learning model that predicts game outcomes from incomplete early-game board states.",
    image: "/Connect4_logo.png",
    details: [
      ["Input", "Eight-turn board state"],
      ["Task", "Outcome classification"],
      ["Stack", "Python · Jupyter · ML"],
    ],
    github: "https://github.com/dhruv-khatri/Connect-4-Prediction",
  },
  {
    index: "04",
    title: "Breast Cancer Detection",
    type: "CLASSIFICATION",
    description:
      "A diagnostic classification model that distinguishes malignant and benign tumors from cell-nuclei features.",
    image: "/Breast_cancer_detection_logo.png",
    details: [
      ["Input", "Tumor cell features"],
      ["Task", "Binary classification"],
      ["Stack", "Scikit-learn · Python"],
    ],
    github: "https://github.com/dhruv-khatri/Breast-Cancer-Detection",
  },
]

function NeuralBackground({ activeSection, isLight }: { activeSection: string; isLight: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    let frame = 0
    let animationFrame = 0
    let pointer = { x: window.innerWidth * 0.72, y: window.innerHeight * 0.42, active: false }
    let scrollProgress = 0
    let nodes: Array<{
      x: number
      y: number
      originX: number
      originY: number
      vx: number
      vy: number
      radius: number
      layer: number
    }> = []

    const sectionBias: Record<string, number> = {
      home: 0.8,
      about: 0.9,
      experience: 1,
      projects: 1,
      contact: 0.7,
    }

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const isMobile = window.innerWidth < 768
      const columns = isMobile ? 6 : 10
      const rows = isMobile ? 8 : 7
      const graphWidth = window.innerWidth * 0.92
      const graphHeight = window.innerHeight * 0.78
      const startX = window.innerWidth * 0.02
      const startY = window.innerHeight * 0.12

      nodes = Array.from({ length: columns * rows }, (_, index) => {
        const column = index % columns
        const row = Math.floor(index / columns)
        const offsetX = row % 2 === 0 ? 0 : graphWidth / columns / 2
        const originX = startX + (column / (columns - 1)) * graphWidth + offsetX
        const originY = startY + (row / (rows - 1)) * graphHeight

        return {
          x: originX,
          y: originY,
          originX,
          originY,
          vx: 0,
          vy: 0,
          radius: index % 9 === 0 ? 3.2 : index % 4 === 0 ? 2.2 : 1.5,
          layer: column,
        }
      })
    }

    const handlePointer = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY, active: true }
    }

    const handlePointerLeave = () => {
      pointer.active = false
    }

    const handleScroll = () => {
      const availableScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress = availableScroll > 0 ? window.scrollY / availableScroll : 0
    }

    const draw = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const activity = sectionBias[activeSection] ?? 0.5
      context.clearRect(0, 0, width, height)

      nodes.forEach((node, index) => {
        if (!reduceMotion) {
          const distanceX = pointer.x - node.x
          const distanceY = pointer.y - node.y
          const distance = Math.hypot(distanceX, distanceY)
          if (pointer.active && distance < 210 && distance > 0) {
            const force = (1 - distance / 210) * 0.085
            node.vx -= (distanceX / distance) * force
            node.vy -= (distanceY / distance) * force
          }

          const scrollWave = Math.sin(scrollProgress * Math.PI * 4 + node.layer * 0.7 + index * 0.08) * 12
          const targetY = node.originY + scrollWave * activity
          node.vx += (node.originX - node.x) * 0.008
          node.vy += (targetY - node.y) * 0.008
          node.x += node.vx
          node.y += node.vy
          node.vx *= 0.9
          node.vy *= 0.9
        }

        const pulse = reduceMotion ? 0 : Math.sin(frame * 0.018 + index * 0.7) * 0.08
        context.beginPath()
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        context.fillStyle = isLight
          ? `rgba(64, 96, 108, ${0.24 + activity * 0.1 + pulse})`
          : `rgba(145, 181, 195, ${0.3 + activity * 0.14 + pulse})`
        context.fill()
      })

      nodes.forEach((node, nodeIndex) => {
        nodes.slice(nodeIndex + 1).forEach((otherNode) => {
          const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y)
          const layerDistance = Math.abs(node.layer - otherNode.layer)
          const threshold = layerDistance <= 1 ? 155 : 112
          if (distance < threshold) {
            context.beginPath()
            context.moveTo(node.x, node.y)
            context.lineTo(otherNode.x, otherNode.y)
            context.strokeStyle = isLight
              ? `rgba(70, 100, 112, ${(1 - distance / threshold) * 0.2 * activity})`
              : `rgba(92, 126, 140, ${(1 - distance / threshold) * 0.28 * activity})`
            context.lineWidth = 0.75
            context.stroke()
          }
        })
      })

      if (pointer.active) {
        context.beginPath()
        context.arc(pointer.x, pointer.y, 34, 0, Math.PI * 2)
        context.strokeStyle = isLight ? "rgba(68, 97, 108, 0.2)" : "rgba(127, 159, 171, 0.22)"
        context.lineWidth = 1
        context.stroke()

        nodes
          .map((node) => ({
            node,
            distance: Math.hypot(node.x - pointer.x, node.y - pointer.y),
          }))
          .filter(({ distance }) => distance > 34 && distance < 260)
          .sort((first, second) => first.distance - second.distance)
          .slice(0, 4)
          .forEach(({ node, distance }) => {
            const directionX = (node.x - pointer.x) / distance
            const directionY = (node.y - pointer.y) / distance

            context.beginPath()
            context.moveTo(pointer.x + directionX * 34, pointer.y + directionY * 34)
            context.lineTo(node.x, node.y)
            context.strokeStyle = isLight
              ? `rgba(68, 97, 108, ${(1 - distance / 260) * 0.14})`
              : `rgba(127, 159, 171, ${(1 - distance / 260) * 0.16})`
            context.lineWidth = 0.65
            context.stroke()
          })
      }

      frame += 1
      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    handleScroll()
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", handlePointer)
    window.addEventListener("pointerdown", handlePointer)
    document.documentElement.addEventListener("pointerleave", handlePointerLeave)
    window.addEventListener("scroll", handleScroll, { passive: true })
    draw()

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", handlePointer)
      window.removeEventListener("pointerdown", handlePointer)
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [activeSection, isLight, reduceMotion])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[2]" aria-hidden="true" />
}

function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
      <span className="text-steel-300">{index}</span>
      <span className="h-px w-10 bg-slate-700" />
      <span>{children}</span>
    </div>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const isLight = mounted && resolvedTheme === "light"

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: "-30% 0px -60% 0px" },
    )

    document.querySelectorAll("section[id]").forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  return (
    <main
      className={`min-h-screen overflow-hidden bg-ink-950 text-slate-200 selection:bg-steel-400/30 ${
        isLight ? "portfolio-light" : ""
      }`}
    >
      <NeuralBackground activeSection={activeSection} isLight={isLight} />
      <div className="page-atmosphere pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_50%_35%,rgba(35,49,58,0.24),transparent_52%)]" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-ink-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <button onClick={() => scrollToSection("home")} className="flex items-center gap-3 text-left">
            <span className="flex h-7 w-7 items-center justify-center border border-steel-400/40 font-mono text-[10px] text-steel-200">
              DK
            </span>
            <span className="hidden text-sm font-medium tracking-wide text-slate-300 sm:block">Dhruv Khatri</span>
          </button>

          <nav className="hidden items-center gap-7 md:flex">
            {navigation.map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  activeSection === item ? "text-steel-200" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                0{index + 1} {item}
              </button>
            ))}
          </nav>

          <a
            href="mailto:dkhatri383@gmail.com"
            className="hidden items-center gap-2 border border-white/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400 transition hover:border-steel-400/40 hover:text-steel-200 md:flex"
          >
            Connect <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </a>

          <button
            className="text-slate-400 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-white/[0.06] bg-ink-950 px-5 py-5 md:hidden">
            {navigation.map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="flex w-full items-center gap-4 border-b border-white/[0.05] py-4 text-left font-mono text-xs uppercase tracking-[0.16em] text-slate-400"
              >
                <span className="text-steel-300">0{index + 1}</span> {item}
              </button>
            ))}
          </nav>
        )}
      </header>

      <section id="home" className="relative z-10 flex min-h-screen items-center px-5 pb-16 pt-28 md:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1fr_340px] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-steel-300">
              <BrainCircuit size={15} />
              Computational Biology · AI Systems
            </div>
            <p className="mb-5 text-5xl font-semibold leading-none tracking-[-0.055em] text-white sm:text-7xl lg:text-[104px]">
              Dhruv Khatri
            </p>
            <h1 className="max-w-3xl text-3xl font-medium leading-[1.05] tracking-[-0.04em] text-slate-300 sm:text-5xl lg:text-[58px]">
              Building computational systems for biological discovery.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
              Computational biology and machine learning applied to scientific discovery.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <button
                onClick={() => scrollToSection("experience")}
                className="group flex items-center gap-3 bg-slate-200 px-5 py-3 text-sm font-medium text-ink-950 transition hover:bg-white"
              >
                View experience
                <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="flex items-center gap-3 border border-white/10 px-5 py-3 text-sm text-slate-400 transition hover:border-steel-400/40 hover:text-slate-200"
              >
                Explore selected work
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="border-l border-white/[0.08] pl-6"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">Current focus</p>
            {["Applied machine learning", "Computational biology", "Scalable research systems"].map((item) => (
              <div key={item} className="flex items-center gap-3 border-b border-white/[0.06] py-4 text-sm text-slate-400">
                <span className="h-1 w-1 rounded-full bg-steel-300" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="about" className="relative z-10 border-t border-white/[0.06] px-5 py-28 md:px-8 md:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionLabel index="01">Profile</SectionLabel>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <h2 className="max-w-sm text-3xl font-medium tracking-[-0.03em] text-slate-100 md:text-4xl">
              Applying computation to biomedical and biological research.
            </h2>
            <div className="max-w-3xl">
              <p className="text-xl leading-8 text-slate-300 md:text-2xl md:leading-10">
                I develop computational and machine-learning systems for biomedical research, combining expertise in
                computer science, data engineering, and molecular biology.
              </p>
              <p className="mt-7 max-w-2xl leading-7 text-slate-400">
                My work focuses on scalable biological data analysis, AI-driven discovery, genomics, and predictive
                modeling.
              </p>
              <div className="mt-12 grid gap-px bg-white/[0.06] sm:grid-cols-3">
                {[
                  ["Domain", "Biology + Healthcare"],
                  ["Methods", "ML + Statistical Modeling"],
                  ["Output", "Models + Data Systems"],
                ].map(([label, value]) => (
                  <div key={label} className="bg-ink-950 p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">{label}</p>
                    <p className="mt-3 text-sm text-slate-300">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="relative z-10 border-t border-white/[0.06] px-5 py-28 md:px-8 md:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionLabel index="02">Experience + Capabilities</SectionLabel>
          <div className="grid gap-16 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              {experience.map((item, index) => (
                <motion.article
                  key={`${item.company}-${item.period}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.05 }}
                  className="group grid gap-4 border-t border-white/[0.08] py-7 sm:grid-cols-[140px_1fr]"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel-300">{item.period}</p>
                  <div>
                    <h3 className="text-lg font-medium text-slate-200">{item.role}</h3>
                    <p className="mt-1 text-sm text-slate-400">{item.company}</p>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="lg:pl-10">
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">Technical domains</p>
              <div className="space-y-px bg-white/[0.06]">
                <Capability icon={<BrainCircuit size={18} />} title="Machine Learning" items="PyTorch · TensorFlow · Scikit-learn" />
                <Capability icon={<Dna size={18} />} title="Computational Biology" items="Genomics · Single-cell · Protein design" />
                <Capability icon={<Database size={18} />} title="Data Systems" items="Python · R · SQL · HPC · Cloud" />
                <Capability icon={<Code2 size={18} />} title="Software Engineering" items="APIs · Pipelines · Visualization" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="relative z-10 border-t border-white/[0.06] px-5 py-28 md:px-8 md:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionLabel index="03">Selected Systems</SectionLabel>
          <div className="space-y-5">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                className="group grid overflow-hidden border border-white/[0.08] bg-ink-900/70 transition-colors hover:border-steel-400/30 md:grid-cols-[0.85fr_1.15fr]"
              >
                <div className="relative min-h-64 overflow-hidden border-b border-white/[0.08] bg-black/20 md:min-h-[390px] md:border-b-0 md:border-r">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 42vw"
                    className="object-cover grayscale-[75%] brightness-[55%] contrast-125 transition duration-700 group-hover:scale-[1.025] group-hover:grayscale-[35%] group-hover:brightness-[65%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/15 to-transparent" />
                  <div className="absolute left-5 top-5 font-mono text-[10px] tracking-[0.2em] text-slate-400">
                    {project.index} / {project.type}
                  </div>
                </div>
                <div className="flex flex-col justify-between p-6 md:p-10">
                  <div>
                    <div className="flex items-start justify-between gap-5">
                      <h3 className="text-3xl font-medium tracking-[-0.03em] text-slate-100 md:text-4xl">{project.title}</h3>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View ${project.title} on GitHub`}
                          className="text-slate-400 transition hover:text-steel-200"
                        >
                          <ArrowUpRight size={22} />
                        </a>
                      )}
                    </div>
                    <p className="mt-6 max-w-xl text-base leading-7 text-slate-400">{project.description}</p>
                  </div>
                  <dl className="mt-12 border-t border-white/[0.08]">
                    {project.details.map(([label, value]) => (
                      <div key={label} className="grid grid-cols-[90px_1fr] border-b border-white/[0.06] py-3 text-sm">
                        <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate-400">{label}</dt>
                        <dd className="text-slate-400">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 border-t border-white/[0.06] px-5 py-28 md:px-8 md:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionLabel index="04">Contact</SectionLabel>
          <div className="grid gap-12 lg:grid-cols-[1fr_440px] lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel-300">Start a conversation</p>
              <h2 className="mt-5 max-w-3xl text-4xl font-medium tracking-[-0.04em] text-slate-100 sm:text-6xl">
                Interested in computational research, AI, or building something useful?
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "GitHub", value: "dhruv-khatri", href: "https://github.com/dhruv-khatri" },
                { label: "LinkedIn", value: "dhruvkhatri", href: "https://www.linkedin.com/in/dhruvkhatri" },
                { label: "Email", value: "Send a message", href: "mailto:dkhatri383@gmail.com" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group relative min-h-28 rounded-xl border border-white/10 bg-ink-950/70 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-steel-400/50 hover:bg-ink-900"
                >
                  <span className="block">
                    <span className="block text-base font-medium text-slate-200 transition group-hover:text-white">
                      {link.label}
                    </span>
                    <span className="mt-2 block text-sm text-slate-400">{link.value}</span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="absolute right-4 top-4 text-slate-600 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-steel-200 group-hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.06] bg-ink-950 px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dhruv Khatri</p>
          <div className="flex items-center gap-5">
            <a href="mailto:dkhatri383@gmail.com" className="transition hover:text-steel-200" aria-label="Email">
              <Mail size={16} />
            </a>
            <a
              href="https://github.com/dhruv-khatri"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-steel-200"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/dhruvkhatri"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-steel-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <span className="h-4 w-px bg-white/10" />
            <button
              type="button"
              onClick={() => setTheme(isLight ? "dark" : "light")}
              className="flex items-center gap-2 transition hover:text-steel-200"
              aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
              title={`Switch to ${isLight ? "dark" : "light"} mode`}
            >
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
              <span className="font-mono text-[10px] uppercase tracking-[0.12em]">
                {isLight ? "Dark" : "Light"}
              </span>
            </button>
          </div>
        </div>
      </footer>
    </main>
  )
}

function Capability({ icon, title, items }: { icon: ReactNode; title: string; items: string }) {
  return (
    <div className="bg-ink-950 p-5">
      <div className="flex items-center gap-3 text-steel-300">
        {icon}
        <h3 className="text-sm font-medium text-slate-300">{title}</h3>
      </div>
      <p className="mt-3 pl-[30px] text-xs leading-5 text-slate-400">{items}</p>
    </div>
  )
}
