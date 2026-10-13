// Portfolio data for Csík Szabolcs Alex

export const personalInfo = {
  name: "Csík Szabolcs",
  title: "Full Stack Fejlesztő & Szoftverfejlesztő",
  subtitle: "Mérnökinformatikus hallgató | Neumann János Egyetem",
  email: "alexszabi04@gmail.com",
  phone: "+36 70 242 1586",
  location: "Kecskemét, Magyarország",
  birthday: "2004. január 23.",
  birthdayEn: "January 23, 2004",
  locationEn: "Kecskemét, Hungary",
  github: "https://github.com/csikszabi04",
  linkedin: "https://linkedin.com/in/csszabj",
  avatar: "/images/avatar.png",
  avatars: "/images/profile.png",
  resume: "/Csik_Szabolcs_Alex_CV_FullHD.pdf",
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
    titleEn: "Promoter",
    company: "Candy & Haier - MediaMarkt Kecskemét",
    location: "Kecskemét",
    date: "2025. augusztus -",
    dateEn: "August 2025 -",
    current: true,
    description: [
      "Promóter a MediaMarkt Kecskemét üzletében Candy és Haier háztartági gépek promóciója",
      "Termékbemutatók és értékesítési támogatás",
      "Ügyfélkommunikáció és termékismeret",
      "Piackutatási adatok gyűjtése",
    ],
    descriptionEn: [
      "Promoter at the MediaMarkt Kecskemét store, promoting Candy and Haier home appliances",
      "Product demos and sales support",
      "Customer communication and product expertise",
      "Collecting market research data",
    ],
  },
  {
    id: 2,
    title: "Programozási Oktató",
    titleEn: "Programming Instructor",
    company: "Dr.Code Oktatási Központ",
    companyEn: "Dr.Code Education Center",
    location: "Kecskemét",
    date: "2023 - 2025",
    dateEn: "2023 - 2025",
    current: false,
    description: [
      "Python és JavaScript alapok oktatása",
      "Webfejlesztési workshopok vezetése",
      "Tananyagfejlesztés és adaptáció",
      "Diákprojektek mentorálása",
    ],
    descriptionEn: [
      "Teaching Python and JavaScript fundamentals",
      "Leading web development workshops",
      "Curriculum development and adaptation",
      "Mentoring student projects",
    ],
  },
  {
    id: 3,
    title: "Diákmunkás / Kapcsolattartó",
    titleEn: "Student Worker / Liaison",
    company: "Hirös Ízek Kft.",
    location: "Kecskemét",
    date: "2022 nyár",
    dateEn: "Summer 2022",
    current: false,
    description: [
      "Adminisztratív feladatok támogatása",
      "Beszerzési folyamatok koordinációja",
      "Riportkészítés és dokumentáció",
    ],
    descriptionEn: [
      "Supporting administrative tasks",
      "Coordinating procurement processes",
      "Reporting and documentation",
    ],
  },
];

export const education = [
  {
    id: 1,
    title: "Mérnökinformatikus BSc",
    titleEn: "BSc in Computer Engineering",
    school: "Neumann János Egyetem GAMF Kar",
    schoolEn: "Neumann János University, GAMF Faculty",
    location: "Kecskemét",
    date: "2025 - Jelenleg",
    dateEn: "2025 - Present",
    description: [
      "Szakterületek: Szoftverfejlesztés, Adattudomány, Hálózatok",
      "Átlag: 4.2 / 5.0",
    ],
    descriptionEn: [
      "Focus areas: Software Development, Data Science, Networks",
      "GPA: 4.2 / 5.0",
    ],
  },
  {
    id: 2,
    title: "Szoftverfejlesztő és -tesztelő",
    titleEn: "Software Developer & Tester",
    school: "Kecskeméti SZC Kandó Kálmán Technikum",
    schoolEn: "Kandó Kálmán Technical School (Kecskemét SZC)",
    location: "Kecskemét",
    date: "2020 - 2025",
    dateEn: "2020 - 2025",
    description: [
      "Kiemelt tantárgyak: Programozás, Adatbázis-kezelés, Webfejlesztés",
      "Érettségi átlag: 3.8 / 4.5",
    ],
    descriptionEn: [
      "Key subjects: Programming, Database Management, Web Development",
      "Final exam average: 3.8 / 4.5",
    ],
  },
  {
    id: 3,
    title: "Angol felsőfok/emelt szint felkészítő",
    titleEn: "Advanced English Prep (Higher Level)",
    school: "Kecskeméti SZC Gróf Károlyi Sándor Technikum",
    schoolEn: "Gróf Károlyi Sándor Technical School (Kecskemét SZC)",
    location: "Kecskemét",
    date: "2020",
    dateEn: "2020",
    description: [
      "Kiemelt tantárgyak: Grammar, Speech, Listening, Reading & Writing",
      "Átlag: 4.0",
    ],
    descriptionEn: [
      "Key subjects: Grammar, Speaking, Listening, Reading & Writing",
      "GPA: 4.0",
    ],
  },
];

export interface Project {
  id: string;
  title: string;
  category: string;
  /** English category when `category` is Hungarian. */
  categoryEn?: string;
  /** English description (shown for the English UI). */
  description: string;
  /** Hungarian description (shown for the Hungarian UI). */
  descriptionHu?: string;
  technologies: string[];
  live: string;
  github?: string;
  image: string;
  mobileImage?: string;
  /** Shown on a laptop mockup instead of the phone mockup (desktop apps). */
  laptopImage?: string;
  /** Direct download link; adds a "Download" button next to "View Project". */
  downloadUrl?: string;
  featured?: boolean;
  objectPosition?: string;
}

export const projects: Project[] = [
  {
    id: "climarkai",
    title: "CliMarkAI - AI Marketing Platform",
    category: "AI SaaS Platform",
    description: "AI-powered marketing platform that helps businesses generate, optimize and automate their marketing content and campaigns with modern, data-driven tools.",
    descriptionHu: "MI-alapú marketingplatform, amely segít a vállalkozásoknak marketingtartalmaik és kampányaik létrehozásában, optimalizálásában és automatizálásában modern, adatvezérelt eszközökkel.",
    technologies: ["Next.js", "React", "AI API", "Tailwind CSS"],
    live: "https://www.climarkai.com/",
    image: "/climark.png",
    mobileImage: "/climark_mobile.png",
    featured: true,
  },
  {
    id: "lumen",
    title: "LUMEN - Glass UI & System Toolkit for Windows",
    category: "Desktop alkalmazás",
    categoryEn: "Desktop App",
    description: "An iOS/macOS-style glass shell for Windows 10 with a memory wiper, task manager, analytics, developer hub and an embedded terminal, built in C# and WPF with the compiler that ships with Windows.",
    descriptionHu: "iOS/macOS-stílusú „glass” felület Windows 10-hez memóriatisztítóval, feladatkezelővel, analitikával, fejlesztői központtal és beágyazott terminállal, C# és WPF alapokon, a Windowsba beépített fordítóval.",
    technologies: ["C#", "WPF", ".NET Framework 4.8", "Windows"],
    live: "https://github.com/CsikSzabi04/LUMEN",
    downloadUrl: "https://github.com/CsikSzabi04/LUMEN/releases/latest/download/Lumen-win-x64.zip",
    image: "/lumen.png",
    laptopImage: "/lumen_in_use.png",
    featured: true,
  },
  {
    id: "aurigpt",
    title: "AuriGPT - AI Assistant",
    category: "AI Assistant",
    description: "A sleek conversational AI assistant powered by large language models, delivering fast and helpful responses through a clean, modern interface.",
    descriptionHu: "Letisztult, beszélgetős MI-asszisztens nagy nyelvi modellekre építve, amely gyors és hasznos válaszokat ad egy modern, áttekinthető felületen.",
    technologies: ["Next.js", "React", "AI API", "Tailwind CSS"],
    live: "https://aurigpt.vercel.app/",
    image: "/aurigpt.png",
    mobileImage: "/aurigpt_mobile.png",
    featured: false,
  },
  {
    id: "debater",
    title: "Debater - Online Debate Platform",
    category: "Közösségi Platform",
    categoryEn: "Social Platform",
    description: "A modern debate platform where users can start discussions, argue their positions, and explore different viewpoints through a clean, responsive interface.",
    descriptionHu: "Modern vitaplatform, ahol a felhasználók beszélgetéseket indíthatnak, kiállhatnak az álláspontjuk mellett, és különböző nézőpontokat ismerhetnek meg egy letisztult, reszponzív felületen.",
    technologies: ["Next.js", "React", "Tailwind CSS", "API"],
    live: "https://debaterweb.vercel.app/",
    image: "/debaterweb.png",
    mobileImage: "/debatermobile.png",
    featured: true,
  },
  {
    id: "vharaz",
    title: "Alexander x Vharaz - Dark Fantasy Webcomic",
    category: "Webképregény",
    categoryEn: "Webcomic",
    description: "An original dark fantasy webcomic with an immersive, book-like reader featuring realistic page-flip animations and a cinematic, atmospheric design.",
    descriptionHu: "Eredeti dark fantasy webképregény magával ragadó, könyvszerű olvasóval, valósághű lapozó animációkkal és filmszerű, hangulatos dizájnnal.",
    technologies: ["React", "Vite", "PageFlip", "JavaScript"],
    live: "https://vharazcomic.vercel.app/",
    github: "https://github.com/CsikSzabi04/Vharaz_comic",
    image: "/vharaz.png",
    mobileImage: "/vharaz_mobile.png",
    featured: true,
  },
  {
    id: "dbd-hub",
    title: "Dead by Daylight Community & Builds - DBD Hub",
    category: "Közösségi Portál",
    categoryEn: "Community Portal",
    description: "The ultimate Dead by Daylight fan community. Share posts, discover killer & survivor builds, follow top streamers, and connect with other DBD players.",
    descriptionHu: "A Dead by Daylight rajongók végső közösségi oldala: posztok megosztása, gyilkos- és túlélő-buildek felfedezése, top streamerek követése és kapcsolatépítés más DBD játékosokkal.",
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
    descriptionHu: "Modern, átfogó projektauditáló ökoszisztéma és „digitális régész”. Párhuzamos függőség-elemzés, GitHub-metrikákon alapuló elavulás-előrejelzés és valós idejű Remote Hub dashboard a CLI-vezérléshez Firebase-en keresztül.",
    technologies: ["Python", "React", "Firebase", "Real-time Hub"],
    live: "https://forarch.vercel.app/",
    github: "https://github.com/CsikSzabi04/forarch.git",
    image: "/forarch.png",
    mobileImage: "/forarch_mobile.png",
    featured: false,
    objectPosition: "left", // Custom position request
  },
  {
    id: "gamehub",
    title: "Game Data Hub",
    category: "Webalkalmazás",
    categoryEn: "Web Application",
    description: "Video game data management platform with comprehensive game database, user profiles, and interactive features.",
    descriptionHu: "Videojáték-adatkezelő platform átfogó játékadatbázissal, felhasználói profilokkal és interaktív funkciókkal.",
    technologies: ["React", "API", "Tailwind CSS"],
    live: "https://gamedatahub.netlify.app/",
    github: "https://github.com/csikszabi04/gamehub",
    image: "/gamehubpc.png",
    mobileImage: "/gamehubmobile.png",
    featured: false,
  },
];

export const languages = [
  {
    name: "Angol",
    nameEn: "English",
    level: "B2",
    progress: 85,
    description: "Emelt szintű érettségi (86%) | B2 komplex nyelvvizsga",
    descriptionEn: "Advanced-level final exam (86%) | B2 complex language exam",
  },
];

export const softSkills = [
  { name: "Csapatmunka", nameEn: "Teamwork", icon: "FaUsers" },
  { name: "Dokumentumkezelés", nameEn: "Document management", icon: "FaFileAlt" },
  { name: "Customer-facing experience", nameEn: "Customer-facing experience", icon: "FaComments" },
  { name: "Időmenedzsment", nameEn: "Time management", icon: "FaClock" },
  { name: "Folyamatos tanulás", nameEn: "Continuous learning", icon: "FaBook" },
  { name: "Sales-oriented kommunikáció", nameEn: "Sales-oriented communication", icon: "FaHandshake" },
];

export const stats = [
  { value: "5+", label: "Befejezett Projektek", labelEn: "Completed Projects" },
  { value: "5+", label: "Éve tanulok webfejlesztést", labelEn: "Years Learning Web Dev" },
  { value: "5+", label: "Elégedett Ügyfelek", labelEn: "Happy Clients" },
  { value: "1000+", label: "Oldal Megtekintések", labelEn: "Page Views" },
];
