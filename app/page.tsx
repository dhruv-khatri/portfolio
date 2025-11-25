"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Code, Database, Dna, ExternalLink, Github, Mail, MapPin, Moon, SunMedium } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Typewriter Effect Component
function TypewriterEffect() {
  const phrases = [
    "Curious Problem Solver",
    "ML engineer, Researcher, and Data Scientist",
    "Translating Data into Meaningful Insights",
    "Creating Fast, Scalable Software Systems",
    "Basketball, Cars, Code, and Coffee",
  ]

  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        // Current phrase
        const phrase = phrases[currentPhrase]

        // If deleting, remove the last character
        // If typing, add the next character
        if (isDeleting) {
          setCurrentText(phrase.substring(0, currentText.length - 1))
        } else {
          setCurrentText(phrase.substring(0, currentText.length + 1))
        }

        // If we've completed typing the phrase
        if (!isDeleting && currentText === phrase) {
          // Wait a bit before starting to delete
          setTimeout(() => setIsDeleting(true), 1500)
        }
        // If we've deleted the phrase
        else if (isDeleting && currentText === "") {
          setIsDeleting(false)
          // Move to the next phrase
          setCurrentPhrase((currentPhrase + 1) % phrases.length)
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentPhrase, phrases])

  return (
    <div className="h-8 flex items-start justify-start">
      <span className="text-xl md:text-2xl text-slate-600 dark:text-slate-300">
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    </div>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const activeTheme = (resolvedTheme ?? theme ?? "light") as string
  const isDark = activeTheme === "dark"
  const toggleTheme = () => setTheme(isDark ? "light" : "dark")

  // Detect active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + 200

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-slate-950 text-slate-50" : "bg-[#f6f1e6] text-slate-900"
      }`}
      ref={containerRef}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-[-10%] h-72 w-72 rounded-full bg-gradient-to-br from-amber-200/30 via-rose-200/25 to-purple-300/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[15%] h-80 w-80 rounded-full bg-gradient-to-br from-amber-300/30 via-rose-300/25 to-purple-400/20 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[20%] h-96 w-96 rounded-full bg-gradient-to-br from-amber-400/20 via-rose-300/15 to-purple-400/10 blur-3xl" />
      </div>
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/70 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">Dhruv Khatri</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {["home", "about", "experience", "projects", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`relative text-sm font-medium transition-colors ${
                  activeSection === section
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                {activeSection === section && (
                  <span className="absolute -bottom-2 left-0 right-0 mx-auto h-0.5 w-6 rounded-full bg-gradient-to-r from-amber-300 via-rose-400 to-purple-500" />
                )}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:inline-flex border-transparent bg-gradient-to-r from-amber-300 via-rose-400 to-purple-500 text-slate-900 font-semibold shadow-lg shadow-orange-200/60 hover:from-amber-200 hover:to-rose-400"
            >
              Resume
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-900 dark:text-slate-100 md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Theme Switcher */}
      <div className="container px-4 pt-12 md:pt-14 flex justify-end translate-y-2 md:translate-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/70 px-3 py-1 shadow-sm hover:border-amber-300/80 dark:hover:border-amber-500/60 transition">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-300">Light</span>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative h-6 w-14 rounded-full bg-gradient-to-r from-amber-200 via-rose-200 to-purple-200 dark:from-slate-800 dark:to-slate-700 transition-colors"
          >
            <span
              className={`absolute top-0.5 left-1 h-5 w-5 rounded-full bg-white dark:bg-slate-900 shadow-sm transition-transform duration-300 ${
                mounted && isDark ? "translate-x-7" : ""
              }`}
            />
            <SunMedium className="absolute left-1 top-1.5 h-3 w-3 text-amber-500" />
            <Moon className="absolute right-1 top-1.5 h-3 w-3 text-slate-600 dark:text-slate-200" />
          </button>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Dark</span>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative pt-8 pb-10 overflow-hidden">
        <div className="container relative z-10 px-4 py-14 md:py-18 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300 w-fit shadow-md shadow-orange-200/50">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                Computational Biology + ML
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                Dhruv Khatri
              </h1>

              <TypewriterEffect />

              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl">
                I specialize in computational biology, machine learning, and software development to solve complex
                biological problems and advance scientific research.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  className="bg-gradient-to-r from-amber-300 via-rose-400 to-purple-500 text-slate-900 font-semibold shadow-lg shadow-orange-200/50 hover:from-amber-200 hover:to-rose-400"
                  onClick={() => scrollToSection("projects")}
                >
                  View My Projects
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-400/70 text-slate-900 dark:text-slate-100 dark:border-slate-700 bg-white/70 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-slate-900/70"
                  onClick={() => scrollToSection("contact")}
                >
                  Contact Me
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                {[
                  { label: "Areas", value: "Bioinformatics · ML" },
                  { label: "Focus", value: "Genomics · Proteins" },
                  { label: "Location", value: "San Diego, CA" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-white/5 px-4 py-3 shadow-sm backdrop-blur"
                  >
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-[0.08em]">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center md:justify-end"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-amber-300/35 via-rose-300/30 to-purple-500/30 blur-3xl" />
                <div className="absolute inset-4 rounded-3xl border border-white/50 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-2xl shadow-orange-200/30" />
                <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-white/60 dark:border-slate-700 animate-spin-slow" />
                <Image
                  src="/Computer_image.png?height=320&width=320"
                  alt="Profile"
                  width={320}
                  height={320}
                  className="rounded-3xl object-cover border-4 border-white/80 dark:border-slate-800 p-1 relative z-10 shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 relative">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-950/50 p-10 shadow-2xl shadow-orange-200/40 backdrop-blur-xl"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">About Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-300 via-rose-400 to-purple-500 rounded-full mx-auto mb-6" />
            </div>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                I'm a computer and data scientist with a focus on applying computational techniques to solve
                challenges in biomedical and biological research. With a foundation in computer science, data
                engineering, and molecular biology, I specialize in designing scalable algorithms and analytical
                tools to extract insights from high-dimensional biological datasets.
              </p>
              <p>
                My work spans machine learning applications in healthcare, large-scale genomic data analysis, and the
                development of AI-driven pipelines for predictive modeling. I'm especially interested in single-cell
                omics, integrative multi-modal analysis, and leveraging deep learning to advance our understanding of
                protein function, gene regulation, and disease mechanisms.
              </p>
              <p>
                In my free time you can catch me playing basketball and golf, trying out new restaurants, or driving
                around southern California. I love exploring new places and experiences which push me out of my comfort
                zone.
              </p>
              <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-300 mt-6">
                <MapPin className="h-4 w-4 text-amber-500" />
                <span>San Diego, California</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {["Python", "R", "Machine Learning", "Genomics", "Data Visualization", "Bioinformatics"].map(
                  (skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="border-transparent bg-amber-50 text-amber-900 dark:bg-amber-500/10 dark:text-amber-200"
                    >
                      {skill}
                    </Badge>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-2">Experience & Skills</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-300 via-rose-400 to-purple-500 rounded-full mx-auto mb-6" />
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              My professional journey combines academic research, industry experience, and continuous learning in the
              rapidly evolving fields of bioinformatics and data science.
            </p>
          </motion.div>

          <Tabs defaultValue="experience" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/60 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur rounded-2xl p-1 shadow-sm">
              <TabsTrigger
                value="experience"
                className="text-slate-600 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-300 data-[state=active]:via-rose-400 data-[state=active]:to-purple-500 data-[state=active]:text-slate-900 font-semibold rounded-xl"
              >
                Work Experience
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="text-slate-600 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-300 data-[state=active]:via-rose-400 data-[state=active]:to-purple-500 data-[state=active]:text-slate-900 font-semibold rounded-xl"
              >
                Technical Skills
              </TabsTrigger>
            </TabsList>
            <TabsContent value="experience" className="space-y-8">
              <TimelineItem
                year="May 2024 - Present"
                title="Undergraduate Research Assistant - Bafna Lab"
                company="UCSD Computer Science and Engineering"
                description={`· Exploring the role of ecDNA on gene knockout results in various cancer cell lines using AmpliconArchitect.\n· Developed gene networks using Cytoscape .js tools to visualize co-amplification events and utilized python libraries for data analysis and statistical testing.`}
              />
              <TimelineItem
                year="June 2024 - September 2024"
                title="Research and Development Intern"
                company="Eli Lilly and Company"
                description={`· Utilized AI and computational tools for protein design and engineering to enhance early large molecule discovery pipeline.\n· Communicated findings in a 30-minute oral presentation to technical stakeholders and executive leaders along with 23 page report in Nature research format.`}
              />
              <TimelineItem
                year="April 2023 - December 2024"
                title="Undergraduate Research Assistant - Rana Lab"
                company="UCSD School of Medicine"
                description={`· Developed a single-cell RNA-seq 10x pipeline using Linux and R to analyze sequenced mouse bone marrow cells for mRNA vaccine study, working with interdisciplinary team of biologists.\n· Data-mined TCGA and GTEx databases to provide insight into gene expression trends across 13 different cancers for ongoing projects.\n· Collaborated with a team of bioinformaticians to optimize pipeline shell scripts for use on remote supercomputer.\n· Developed in-depth tutorials on GitHub for future lab bioinformaticians to understand pipelines and workflow.`}
              />
              <TimelineItem
                year="August 2023 - May 2024"
                title="Research Study Assistant"
                company="UCSD Health - Moores Cancer Center"
                description={`· Assisted in administration of California Educator Tobacco Survey (CETS) with 2,000+ participating schools and 100,000+ participants in collaboration with California Department of Education.\n· Developed a database of school contact information, designed survey using Qualtrics, and distributed to participants using Qualtrics API.\n· Continued to follow up on survey results, regularly cleaning data and generating visualizations to present and publish findings.`}
              />
            </TabsContent>
            <TabsContent value="skills">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkillCategory
                  icon={<Dna className="h-6 w-6 text-amber-500" />}
                  title="Bioinformatics"
                  skills={[
                    "Genomic Analysis",
                    "Sequence Alignment",
                    "Phylogenetics",
                    "Structural Biology",
                    "Next-Gen Sequencing",
                  ]}
                />
                <SkillCategory
                  icon={<Database className="h-6 w-6 text-amber-500" />}
                  title="Data Science"
                  skills={[
                    "Machine Learning",
                    "Statistical Analysis",
                    "Data Visualization",
                    "Big Data Processing",
                    "Predictive Modeling",
                  ]}
                />
                <SkillCategory
                  icon={<Code className="h-6 w-6 text-amber-500" />}
                  title="Programming"
                  skills={["Python", "R", "SQL", "Bash", "C++", "JavaScript"]}
                />
                <SkillCategory
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-flask-conical h-6 w-6 text-amber-500"
                    >
                      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
                      <path d="M8.5 2h7" />
                      <path d="M7 16h10" />
                    </svg>
                  }
                  title="Tools & Technologies"
                  skills={["Docker", "Git", "AWS/Cloud Computing", "Jupyter", "Tensorflow/PyTorch", "Bioconductor"]}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-300 via-rose-400 to-purple-500 rounded-full mx-auto mb-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* <ProjectCard
              title="GenomeViz"
              description="An interactive visualization tool for exploring genomic data, supporting various data types and annotations."
              image="/placeholder.svg?height=200&width=400"
              tags={["Python", "D3.js", "Genomics"]}
              github="https://github.com"
              demo="https://example.com"
            />
            <ProjectCard
              title="ML-DrugResponse"
              description="Machine learning framework for predicting patient drug responses based on genomic biomarkers."
              image="/placeholder.svg?height=200&width=400"
              tags={["Machine Learning", "Python", "Healthcare"]}
              github="https://github.com"
              demo="https://example.com"
            />
            <ProjectCard
              title="ProteinFold-AI"
              description="Deep learning approach to protein structure prediction with improved accuracy over traditional methods."
              image="/placeholder.svg?height=200&width=400"
              tags={["Deep Learning", "PyTorch", "Structural Biology"]}
              github="https://github.com"
              demo="https://example.com"
            /> */}
            <ProjectCard
              title="Health xAI"
              description="Health xAI is a minimalist wellness app that integrates with Apple Health to provide personalized insights 
              for sleep, activity, heart rate variability, and recovery. It uses an AI engine powered by Claude to generate daily 
              health suggestions based on real-time biometric trends. With a clean interface and intuitive visuals, 
              the app helps users optimize longevity and performance through subtle, intelligent nudges."
              image="/HealthxAI_logo.png?height=200&width=400"
              tags={["Swift", "Flask", "Python API", "Generative AI"]}
              // github=
              // demo=
            />
            <ProjectCard
              title="Melanoma Detection"
              description="Computer vision and deep learning to predict whether a skin discolorations are cancerous based on image data. 
              Built with TensorFlow and Python, the model analyzes visual patterns to support early melanoma identification."
              image="/Melanoma_detection_logo.png?height=200&width=400"
              tags={["TensorFlow", "Python", "Computer Vision"]}
              // github="https://github.com"
              // demo="https://example.com"
            />
            <ProjectCard
              title="Connect Four Outcome Prediction"
              description="Machine learning model to predict connect four game winner based on early game board states (8 total turns elapsed)."
              image="/Connect4_logo.png?height=200&width=400"
              tags={["Machine Learning", "Spatial Analysis", "Python", "Jupyter"]}
              github="https://github.com/dhruv-khatri/Connect-4-Prediction"
              // demo="https://example.com"
            />
            <ProjectCard
              title="Breast Cancer Detection"
              description="Machine learning model to classify breast cancer tumors as malignant or benign based on tumor cell nuclei characteristics."
              image="/Breast_cancer_detection_logo.png?height=200&width=400"
              tags={["Sci-kit Learn", "Jupyter", "Python", "Linear Regression"]}
              github="https://github.com/dhruv-khatri/Breast-Cancer-Detection"
              // demo="https://example.com"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-300 via-rose-400 to-purple-500 rounded-full mx-auto mb-6" />
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Interested in collaboration or have questions about my work? Feel free to reach out!
            </p>

            <Card className="bg-white/70 dark:bg-slate-950/60 border-slate-200/60 dark:border-slate-800/60 backdrop-blur-xl shadow-xl">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col items-center p-6 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200/60 dark:border-slate-800/60 shadow-sm">
                    <Mail className="h-10 w-10 text-amber-500 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Email</h3>
                    <a href="mailto:dkhatri383@gmail.com">
                      <Button variant="link" className="text-slate-700 dark:text-slate-200 mt-2">
                        Send an email
                      </Button>
                    </a>
                  </div>
                  <div className="flex flex-col items-center p-6 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200/60 dark:border-slate-800/60 shadow-sm">
                    <Github className="h-10 w-10 text-amber-500 mb-4" />
                    <h3 className="text-lg font-medium mb-2">GitHub</h3>
                    <a href="https://github.com/dhruv-khatri" target="_blank" rel="noopener noreferrer">
                      <Button variant="link" className="text-slate-700 dark:text-slate-200 mt-2">
                        View profile
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-950/60 backdrop-blur">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="font-bold">Dhruv Khatri</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="https://www.linkedin.com/in/dhruvkhatri" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </Button>
              </a>
              <a href="https://github.com/dhruv-khatri" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-github"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Timeline Item Component
function TimelineItem({ year, title, company, description }) {
  // Split description by newlines and render each line
  const descriptionLines = description.split("\n").map((line, index) => (
    <p key={index} className="mt-1 text-slate-600 dark:text-slate-300">
      {line}
    </p>
  ))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex gap-4"
    >
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-orange-200/70" />
        <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-800" />
      </div>
      <div className="pb-8">
        <span className="text-sm font-medium text-amber-500">{year}</span>
        <h3 className="text-xl font-bold mt-1 text-slate-900 dark:text-white">{title}</h3>
        <p className="text-slate-500 dark:text-slate-300">{company}</p>
        <div className="mt-2 space-y-1">{descriptionLines}</div>
      </div>
    </motion.div>
  )
}

// Skill Category Component
function SkillCategory({ icon, title, skills }) {
  return (
    <Card className="bg-white/70 dark:bg-slate-950/60 border-slate-200/60 dark:border-slate-800/60 backdrop-blur-xl shadow-lg shadow-orange-200/40">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-slate-900 dark:text-white">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {skills.map((skill, index) => (
            <li key={index} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

// Project Card Component
function ProjectCard({ title, description, image, tags, github, demo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden bg-white/70 dark:bg-slate-950/60 border-slate-200/60 dark:border-slate-800/60 h-full flex flex-col backdrop-blur-xl shadow-xl shadow-orange-200/40">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">{title}</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-300">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-amber-50 text-amber-900 dark:bg-amber-500/10 dark:text-amber-200 border-transparent"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          {github && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1 border-transparent bg-gradient-to-r from-amber-300 via-rose-400 to-purple-500 text-slate-900 font-semibold shadow-md hover:from-amber-200 hover:to-rose-400"
              asChild
            >
              <Link href={github}>
                <Github className="h-4 w-4" />
                Code
              </Link>
            </Button>
          )}
          {demo && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1 border-slate-400/70 text-slate-900 dark:text-slate-100 dark:border-slate-700 bg-white/70 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-slate-900/70"
              asChild
            >
              <Link href={demo}>
                <ExternalLink className="h-4 w-4" />
                Demo
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
