"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Code, Database, Dna, ExternalLink, Github, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Typewriter Effect Component
function TypewriterEffect() {
  const phrases = [
    "Bioinformatician",
    "Data Scientist",
    "Computer Scientist",
    "Genomics Researcher",
    "Machine Learning Engineer",
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
      <span className="text-xl md:text-2xl text-zinc-400">
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    </div>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const containerRef = useRef<HTMLDivElement>(null)

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
    <div className="min-h-screen bg-zinc-950 text-white" ref={containerRef}>
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">Dhruv Khatri</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {["home", "about", "experience", "projects", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm font-medium hover:text-zinc-300 transition-colors ${
                  activeSection === section ? "text-zinc-300" : "text-zinc-500"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex border-zinc-400 text-zinc-400 hover:bg-zinc-400/10"
          >
            Resume
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
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
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-zinc-950" />

        <div className="container relative z-10 px-4 py-24 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Dhruv Khatri</h1>

              <TypewriterEffect />

              <p className="text-lg text-zinc-400 max-w-xl">
                I specialize in computational biology, machine learning, and software development to solve complex
                biological problems and advance scientific research.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                className="bg-zinc-700 hover:bg-zinc-600"
                onClick={() => scrollToSection("projects")}
              >
                View My Projects
              </Button>
                <Button
                  variant="outline"
                  className="border-zinc-700 hover:bg-zinc-800"
                  onClick={() => scrollToSection("contact")}
                >
                  Contact Me
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center md:justify-end"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-zinc-500 to-zinc-700 blur-xl opacity-20" />
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-zinc-500/30 animate-spin-slow" />
                <Image
                  src="/placeholder.svg?height=320&width=320"
                  alt="Profile"
                  width={320}
                  height={320}
                  className="rounded-full object-cover border-4 border-zinc-800 p-1 relative z-10"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">About Me</h2>
              <div className="w-20 h-1 bg-zinc-500 rounded-full mx-auto mb-6" />
            </div>
            <div className="space-y-4 text-zinc-300">
              <p>
                I'm a bioinformatician and data scientist with a passion for developing computational methods to analyze
                complex biological data. With a background in computer science and molecular biology, I bridge the gap
                between cutting-edge technology and biological research.
              </p>
              <p>
                My research focuses on genomic data analysis, machine learning applications in healthcare, and
                developing tools that make complex data more accessible to researchers. I'm particularly interested in
                single-cell genomics and the application of deep learning to predict protein structures and functions.
              </p>
              <div className="flex items-center justify-center gap-2 text-zinc-400 mt-6">
                <MapPin className="h-4 w-4 text-zinc-400" />
                <span>San Diego, California</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                <Badge variant="outline" className="border-zinc-700 bg-zinc-800/50">
                  Python
                </Badge>
                <Badge variant="outline" className="border-zinc-700 bg-zinc-800/50">
                  R
                </Badge>
                <Badge variant="outline" className="border-zinc-700 bg-zinc-800/50">
                  Machine Learning
                </Badge>
                <Badge variant="outline" className="border-zinc-700 bg-zinc-800/50">
                  Genomics
                </Badge>
                <Badge variant="outline" className="border-zinc-700 bg-zinc-800/50">
                  Data Visualization
                </Badge>
                <Badge variant="outline" className="border-zinc-700 bg-zinc-800/50">
                  Bioinformatics
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-zinc-900/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-2">Experience & Skills</h2>
            <div className="w-20 h-1 bg-zinc-500 rounded-full mx-auto mb-6" />
            <p className="text-zinc-400 max-w-2xl mx-auto">
              My professional journey combines academic research, industry experience, and continuous learning in the
              rapidly evolving fields of bioinformatics and data science.
            </p>
          </motion.div>

          <Tabs defaultValue="experience" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="experience">Work Experience</TabsTrigger>
              <TabsTrigger value="skills">Technical Skills</TabsTrigger>
            </TabsList>
            <TabsContent value="experience" className="space-y-8">
              <TimelineItem
                year="May 2024 - Present"
                title="Undergraduate Research Assistant"
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
                title="Undergraduate Research Assistant"
                company="UCSD School of Medicine"
                description={`· Developed a single-cell RNA-seq 10x pipeline using Linux and R to analyze sequenced mouse bone marrow cells for mRNA vaccine study, working with interdisciplinary team of biologists.\n· Data-mined TCGA and GTEx databases to provide insight into gene expression trends across 13 different cancers for ongoing projects.\n· Collaborated with a team of bioinformaticians to optimize pipeline shell scripts for use on remote supercomputer.\n· Developed in-depth tutorials on GitHub for future lab bioinformaticians to understand pipelines and workflow.`}
              />
              <TimelineItem
                year="April 2023 - December 2024"
                title="Research Study Assistant"
                company="UCSD Health - Moores Cancer Center"
                description={`· Assisted in administration of California Educator Tobacco Survey (CETS) with 2,000+ participating schools and 100,000+ participants in collaboration with California Department of Education.\n· Developed a database of school contact information, designed survey using Qualtrics, and distributed to participants using Qualtrics API.\n· Continued to follow up on survey results, regularly cleaning data and generating visualizations to present and publish findings.`}
              />
            </TabsContent>
            <TabsContent value="skills">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkillCategory
                  icon={<Dna className="h-6 w-6 text-zinc-400" />}
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
                  icon={<Database className="h-6 w-6 text-zinc-400" />}
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
                  icon={<Code className="h-6 w-6 text-zinc-400" />}
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
                      className="lucide lucide-flask-conical h-6 w-6 text-zinc-400"
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
      <section id="projects" className="py-24">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
            <div className="w-20 h-1 bg-zinc-500 rounded-full mx-auto mb-6" />
            <p className="text-zinc-400 max-w-2xl mx-auto">
              A selection of research projects and software tools I've developed to advance bioinformatics and data
              science.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
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
            />
            <ProjectCard
              title="BioSeqAnalyzer"
              description="Command-line tool for rapid analysis of biological sequences with customizable workflows."
              image="/placeholder.svg?height=200&width=400"
              tags={["Bioinformatics", "CLI", "Python"]}
              github="https://github.com"
              demo="https://example.com"
            />
            <ProjectCard
              title="Single-Cell Explorer"
              description="Web application for interactive exploration of single-cell RNA sequencing data."
              image="/placeholder.svg?height=200&width=400"
              tags={["R", "Shiny", "Single-cell"]}
              github="https://github.com"
              demo="https://example.com"
            />
            <ProjectCard
              title="PathwayNet"
              description="Network analysis tool for identifying significant biological pathways in multi-omics datasets."
              image="/placeholder.svg?height=200&width=400"
              tags={["Network Analysis", "R", "Systems Biology"]}
              github="https://github.com"
              demo="https://example.com"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-zinc-900/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
            <div className="w-20 h-1 bg-zinc-500 rounded-full mx-auto mb-6" />
            <p className="text-zinc-400 mb-8">
              Interested in collaboration or have questions about my work? Feel free to reach out!
            </p>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col items-center p-6 rounded-lg bg-zinc-800/50 border border-zinc-700">
                    <Mail className="h-10 w-10 text-zinc-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Email</h3>
                    <a href="mailto:dkhatri383@gmail.com">
                      <Button variant="link" className="text-zinc-400 mt-2">
                        Send an email
                      </Button>
                    </a>
                  </div>
                  <div className="flex flex-col items-center p-6 rounded-lg bg-zinc-800/50 border border-zinc-700">
                    <Github className="h-10 w-10 text-zinc-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">GitHub</h3>
                    <a href="https://github.com/dhruv-khatri" target="_blank" rel="noopener noreferrer">
                      <Button variant="link" className="text-zinc-400 mt-2">
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
      <footer className="py-8 border-t border-zinc-800">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="font-bold">Dhruv Khatri</span>
            </div>
            <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://www.linkedin.com/in/dhruvkhatri" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
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
                className="rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex gap-4"
    >
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-zinc-500" />
        <div className="w-0.5 h-full bg-zinc-700" />
      </div>
      <div className="pb-8">
        <span className="text-sm font-medium text-zinc-400">{year}</span>
        <h3 className="text-xl font-bold mt-1">{title}</h3>
        <p className="text-zinc-400">{company}</p>
        <p className="mt-2 text-zinc-300">{description}</p>
      </div>
    </motion.div>
  )
}

// Skill Category Component
function SkillCategory({ icon, title, skills }) {
  return (
    <Card className="bg-zinc-800/50 border-zinc-700">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {skills.map((skill, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
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
      <Card className="overflow-hidden bg-zinc-900 border-zinc-800 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-zinc-400">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-zinc-800 text-zinc-300">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 gap-1" asChild>
            <Link href={github}>
              <Github className="h-4 w-4" />
              Code
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-1" asChild>
            <Link href={demo}>
              <ExternalLink className="h-4 w-4" />
              Demo
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
