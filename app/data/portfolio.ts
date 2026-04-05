// Portfolio data for Csík Szabolcs Alex

export const personalInfo = {
  name: "Csík Szabolcs",
  title: "Full Stack Fejlesztő & Szoftverfejlesztő",
  subtitle: "Mérnökinformatikus hallgató | Neumann János Egyetem",
  email: "alexszabi04@gmail.com",
  phone: "+36 70 242 1586",
  location: "Kecskemét, Magyarország",
  birthday: "2004. január 23.",
  github: "https://github.com/csikszabi04",
  linkedin: "https://linkedin.com/in/csszabj",
  avatar: "https://i.imgur.com/M3iJpBH.png",
  avatars: "https://i.imgur.com/go8utBV.png",
  resume: "/resume.pdf",
};

export const skills = {
  frontend: [
    { name: "HTML5", icon: "FaHtml5" },
    { name: "CSS3", icon: "FaCss3Alt" },
    { name: "JavaScript", icon: "FaJs" },
    { name: "React.js", icon: "FaReact" },
    { name: "Next.js", icon: "FaNextjs" },
    { name: "Angular", icon: "FaAngular" },
    { name: "Bootstrap", icon: "FaBootstrap" },
    { name: "Tailwind CSS", icon: "FaTailwindcss" },
  ],
  backend: [
    { name: "Node.js", icon: "FaNodeJs" },
    { name: "Express.js", icon: "SiExpress" },
    { name: "Java", icon: "FaJava" },
    { name: ".NET 8", icon: "SiDotnet" },
    { name: "Spring Boot", icon: "SiSpring" },
    { name: "Laravel", icon: "FaLaravel" },
  ],
  database: [
    { name: "MySQL", icon: "FaDatabase" },
    { name: "MongoDB", icon: "SiMongodb" },
    { name: "Firebase", icon: "SiFirebase" },
    { name: "SQLite", icon: "SiSqlite" },
  ],
  tools: [
    { name: "Git", icon: "FaGitAlt" },
    { name: "GitHub", icon: "FaGithub" },
    { name: "VS Code", icon: "FaCode" },
    { name: "IntelliJ IDEA", icon: "SiIntellijidea" },
    { name: "Docker", icon: "FaDocker" },
    { name: "Figma", icon: "FaFigma" },
    { name: "Postman", icon: "SiPostman" },
  ],
  ai: [
    { name: "ChatGPT", icon: "SiOpenai" },
    { name: "DeepSeek AI", icon: "SiDeepseek" },
    { name: "Claude AI", icon: "SiAnthropic" },
    { name: "Gemini", icon: "SiGoogle" },
    { name: "Google AI Studio", icon: "SiGoogle" },
    { name: "GitHub Copilot", icon: "SiGithub" },
  ],
  hosting: [
    { name: "Netlify", icon: "SiNetlify" },
    { name: "Vercel", icon: "SiVercel" },
    { name: "Render", icon: "SiRender" },
    { name: "Rackhost", icon: "SiRackhost" },
    { name: "Fly.io", icon: "SiFly" },
  ],
};

export const experience = [
  {
    id: 1,
    title: "Promóter",
    company: "Candy & Haier - MediaMarkt Kecskemét",
    location: "Kecskemét",
    date: "2025. augusztus -",
    current: true,
    description: [
      "Promóter a MediaMarkt Kecskemét üzletében Candy és Haier háztartági gépek promóciója",
      "Termékbemutatók és értékesítési támogatás",
      "Ügyfélkommunikáció és termékismeret",
      "Piackutatási adatok gyűjtése",
    ],
  },
  {
    id: 2,
    title: "Programozási Oktató",
    company: "Dr.Code Oktatási Központ",
    location: "Kecskemét",
    date: "2023 - 2025",
    current: false,
    description: [
      "Python és JavaScript alapok oktatása",
      "Webfejlesztési workshopok vezetése",
      "Tananyagfejlesztés és adaptáció",
      "Diákprojektek mentorálása",
    ],
  },
  {
    id: 3,
    title: "Diákmunkás / Kapcsolattartó",
    company: "Hirös Ízek Kft.",
    location: "Kecskemét",
    date: "2022 nyár",
    current: false,
    description: [
      "Adminisztratív feladatok támogatása",
      "Beszerzési folyamatok koordinációja",
      "Riportkészítés és dokumentáció",
    ],
  },
];

export const education = [
  {
    id: 1,
    title: "Mérnökinformatikus BSc",
    school: "Neumann János Egyetem GAMF Kar",
    location: "Kecskemét",
    date: "2025 - Jelenleg",
    description: [
      "Szakterületek: Szoftverfejlesztés, Adattudomány, Hálózatok",
      "Átlag: 4.2 / 5.0",
    ],
  },
  {
    id: 2,
    title: "Szoftverfejlesztő és -tesztelő",
    school: "Kecskeméti SZC Kandó Kálmán Technikum",
    location: "Kecskemét",
    date: "2020 - 2025",
    description: [
      "Kiemelt tantárgyak: Programozás, Adatbázis-kezelés, Webfejlesztés",
      "Érettségi átlag: 3.8 / 4.5",
    ],
  },
  {
    id: 3,
    title: "Angol felsőfok/emelt szint felkészítő",
    school: "Kecskeméti SZC Gróf Károlyi Sándor Technikum",
    location: "Kecskemét",
    date: "2020",
    description: [
      "Kiemelt tantárgyak: Grammar, Speech, Listening, Reading & Writing",
      "Átlag: 4.0",
    ],
  },
];

export const projects = [
  {
    id: "dbd-hub",
    title: "Dead by Daylight Community & Builds - DBD Hub",
    category: "Közösségi Portál",
    description: "The ultimate Dead by Daylight fan community. Share posts, discover killer & survivor builds, follow top streamers, and connect with other DBD players.",
    technologies: ["Next.js", "React", "Tailwind CSS", "API"],
    live: "https://www.dbdwiki.eu/",
    github: "https://github.com/csikszabi04/dbdhub", // Placeholder GitHub if not provided, check later
    image: "/dbdwiki.png",
    mobileImage: "/dbdmobile.png",
    featured: true,
  },
  {
    id: "forarch",
    title: "ForArch - Forecast Archaeology Engine",
    category: "DevTool & Automation",
    description: "Modern, comprehensive project auditing ecosystem and 'Digital Archaeologist'. It features parallel dependency analysis, decay forecasting based on GitHub metrics, and a real-time Remote Hub Dashboard for CLI orchestration via Firebase.",
    technologies: ["Python", "React", "Firebase", "Real-time Hub"],
    live: "https://forarch.vercel.app/",
    github: "https://github.com/CsikSzabi04/forarch.git",
    image: "/forarch.png",
    mobileImage: "/forarch_mobile.png",
    featured: true,
    objectPosition: "left", // Custom position request
  },
  {
    id: "gamehub",
    title: "Game Data Hub",
    category: "Webalkalmazás",
    description: "Video game data management platform with comprehensive game database, user profiles, and interactive features.",
    technologies: ["React", "API", "Tailwind CSS"],
    live: "https://gamehub.hu",
    github: "https://github.com/csikszabi04/gamehub",
    image: "/gamehubpc.png",
    mobileImage: "/gamehubmobile.png",
    featured: true,
  },
  {
    id: "hairranch",
    title: "Hair Ranch",
    category: "Webáruház / Weboldal",
    description: "Modern barbershop website with appointment booking system and service catalog.",
    technologies: ["React", "Tailwind CSS", "Node.js"],
    live: "https://hairranch.hu",
    github: "https://github.com/csikszabi04/hairranch",
    image: "/HairRanch.png",
    featured: false,
  },
  {
    id: "insight",
    title: "I.N.S.I.G.H.T.",
    category: "Webalkalmazás",
    description: "Analytics dashboard for business insights with data visualization and reporting tools.",
    technologies: ["React", "Tailwind CSS", "JavaScript"],
    live: "https://insightcore.hu",
    github: "https://github.com/csikszabi04/I.N.S.I.G.H.T.",
    image: "/insight.png",
    featured: false,
  },
];

export const languages = [
  {
    name: "Angol",
    level: "B2",
    progress: 85,
    description: "Emelt szintű érettségi (86%) | B2 komplex nyelvvizsga",
  },
];

export const softSkills = [
  { name: "Csapatmunka", icon: "FaUsers" },
  { name: "Dokumentumkezelés", icon: "FaFileAlt" },
  { name: "Customer-facing experience", icon: "FaComments" },
  { name: "Időmenedzsment", icon: "FaClock" },
  { name: "Folyamatos tanulás", icon: "FaBook" },
  { name: "Sales-oriented kommunikáció", icon: "FaHandshake" },
];

export const stats = [
  { value: "5+", label: "Befejezett Projektek" },
  { value: "3+", label: "Éve tanulok Webfejleszt" },
  { value: "5+", label: "Elégedett Ügyfelek" },
  { value: "200+", label: "Oldal Megtekintések" },
];
