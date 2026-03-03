export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "A React 19 megérkezett - Minden, amit tudnod kell róla",
    slug: "react-19-ujdonsagok",
    excerpt: "A React 19 egy forradalmi frissítés, amely megváltoztatja a way we build web applications. Ebben a cikkben deep dive-ot végzünk az új funkciókon.",
    category: "Frontend",
    date: "2025. január 15.",
    readTime: "15 perc",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200",
    tags: ["React", "JavaScript", "Frontend", "Web Development"],
    content: `
<p class="lead">A React 19 végre itt van, és rengeteg izgalmas új funkciót hoz! Ebben a részletes útmutatóban áttekintem mindazt, amit tudnod kell a legújabb verzióról.</p>

<h2>Bevezetés</h2>
<p>A React az egyik legnépszerűbb JavaScript könyvtár a világon. Az évek során folyamatosan fejlődött, és a 19-es verzió egy igazi mérföldkő. Az új funkciók nem csak a fejlesztők életét könnyítik meg, hanem a felhasználók számára is jobb élményt nyújtanak.</p>

<h2>Az új React Compiler</h2>
<p>Talán a legizgalmasabb újítás a React Compiler. Ez egy forradalmi eszköz, amely automatikusan optimalizálja a kódot. Hidd el, ez megváltoztatja a way we think about performance in React.</p>

<p>A compiler képes elemezni a komponenseket és megérteni, mikor szükséges újrarenderelni egy elemet. Ez azt jelenti, hogy a kódod automatikusan gyorsabb lesz anélkül, hogy kézzel kellene optimalizálnod.</p>

<pre><code>// A compiler automatikusan kezeli a memoizációt
function Counter() {
  const [count, setCount] = useState(0);
  
  // Nincs szükség useMemo-ra vagy useCallback-re!
  const doubled = count * 2;
  
  return <div>{doubled}</div>;
}</code></pre>

<h2>Server Actions - A jövő interaktivitása</h2>
<p>Az Actions funkció egyszerűbbé teszi a szerveroldali műveletek kezelését. Most már közvetlenül a komponensekből hívhatunk szerveroldali függvényeket, és az űrlapok kezelése is sokkal könnyebb lett.</p>

<p>Gondolj bele: korábban egy űrlap beküldéséhez rengeteg boilerplate kódot kellett írni. Most? Egy sor és kész!</p>

<pre><code>// Egyszerű mint az 1x1
async function submitForm(formData) {
  'use server'
  const name = formData.get('name')
  await db.users.create({ name })
  revalidatePath('/users')
}

// Használata a komponensben
<form action={submitForm}>
  <input name="name" />
  <button type="submit">Küldés</button>
</form></code></pre>

<h2>Document Metadata API</h2>
<p>Végre! A React 19-ben könnyedén kezelhetjük a dokumentum metaadatait közvetlenül a komponensekből. Nincs szükség külön head komponensekre vagy external könyvtárakra.</p>

<pre><code>// Metaadatok közvetlenül a komponensből
export default function AboutPage() {
  return (
    <>
      <title>Rólam</title>
      <meta name="description" content="Ismerj meg!" />
      <About />
    </>
  )
}</code></pre>

<h2>Új use() Hook</h2>
<p>A use() hook egy Game Changer. Lehetővé teszi Promise-ok kezelését közvetlenül a komponensekben, szükségtelen async/await wrapper nélkül.</p>

<pre><code>// Korábban
async function UserProfile({ userId }) {
  const user = await fetchUser(userId);
  return <div>{user.name}</div>;
}

// Most a use() használatával
function UserProfile({ userPromise }) {
  const user = use(userPromise);
  return <div>{user.name}</div>;
}</code></pre>

<h2>Form Actions</h2>
<p>A form actionök most már támogatják a pending state-et, a validációt és az optimistic update-eket. Ez azt jelenti, hogy az űrlapok soha nem voltak ilyen egyszerűek!</p>

<h2>Teljesítmény javulások</h2>
<p>A React 19 számos teljesítményoptimalizálást hoz:</p>
<ul>
  <li><strong>Automatikus kódfelosztás</strong> - A compiler automatically code-splits</li>
  <li><strong>Javított batchelés</strong> - Kevesebb re-render</li>
  <li><strong>SSR optimalizálások</strong> - Gyorsabb first contentful paint</li>
</ul>

<h2>Hogyan frissíts?</h2>
<p>A frissítés egyszerű, de van néhány dolog, amire figyelned kell:</p>

<ol>
  <li>Frissítsd a React és ReactDOM csomagokat a legújabb verzióra</li>
  <li>Ellenőrizd a használt könyvtárakat, hogy kompatibilisek-e</li>
  <li>Runnold a linter-t a warning-ok ellenőrzésére</li>
  <li>Testelj alaposan az új funkciókat</li>
</ol>

<h2>Összegzés</h2>
<p>A React 19 nem csak egy apró frissítés - ez egy teljes paradigmaváltás. Az új compiler, az Actions, és a use() hook mind azt mutatják, hogy a React továbbra is az élen jár a webfejlesztésben.</p>

<p>Érdemes kipróbálni az új funkciókat, és fokozatosan átállni az újabb verzióra. A változások nem csak a teljesítményt javítják, hanem a kódolási élményt is sokkal jobbá teszik.</p>

<p>Te már kipróbáltad a React 19-et? Írd meg kommentben!</p>
    `
  },
  {
    id: 2,
    title: "Teljes útmutató: Full Stack fejlesztés Next.js 14-gyel",
    slug: "full-stack-nextjs",
    excerpt: "Tanulj meg professzionális full stack alkalmazásokat építeni a Next.js és a modern webtechnológiák segítségével. Ez az ultimate guide.",
    category: "Tutorial",
    date: "2025. január 8.",
    readTime: "25 perc",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200",
    tags: ["Next.js", "Full Stack", "API", "Web Development", "JavaScript"],
    content: `
<p class="lead">A full stack fejlesztés a legkeresettebb tudás a tech iparban. Ebben az átfogó útmutatóban megtanulsz professzionális alkalmazásokat építeni a Next.js segítségével.</p>

<h2>Miért Next.js?</h2>
<p>A Next.js az egyik legnépszerűbb keretrendszer React-alapú alkalmazásokhoz. De miért is olyan jó választás?</p>

<h3>Előnyök</h3>
<ul>
  <li><strong>Server-side rendering (SSR)</strong> - A JavaScript a szerver oldalon fut, jobb SEO és gyorsabb betöltés</li>
  <li><strong>Static Site Generation (SSG)</strong> - A leggyorsabb lehetséges betöltési idők</li>
  <li><strong>API Route-ok</strong> - Nincs szükség külön backend szerverre</li>
  <li><strong>Automatikus optimalizálás</strong> - Képek, betűtípusok, és még sok más</li>
  <li><strong>Zero config</strong> - Kezdj el azonnal, konfigurálj később</li>
</ul>

<h2>A projekt létrehozása</h2>
<p>Első lépésként hozzuk létre az új projektet:</p>

<pre><code>npx create-next-app@latest my-fullstack-app
# Válasszuk az alábbiakat:
# - TypeScript: Yes
# - ESLint: Yes
# - Tailwind CSS: Yes
# - src/ directory: Yes
# - App Router: Yes</code></pre>

<h2>Projekt struktúra</h2>
<p>A Next.js 14 egy teljesen új fájlstruktúrát használ. Nézzük meg:</p>

<pre><code>my-fullstack-app/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Főoldal
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css       # Global stílusok
│   │   └── api/              # API route-ok
│   │       └── users/
│   │           └── route.ts
│   ├── components/           # Komponensek
│   ├── lib/                  # Utility-k
│   └── types/                # TypeScript típusok
├── public/                   # Statikus fájlok
├── package.json
└── next.config.js</code></pre>

<h2>Első API route létrehozása</h2>
<p>Az API route-ok lehetővé teszik, hogy backend funkcionalitást építsünk az alkalmazásunkba:</p>

<pre><code>// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });
  return NextResponse.json(user);
}</code></pre>

<h2>Adatbázis integráció: Prisma</h2>
<p>A Prisma a legjobb választás adatbázis kezeléshez Next.js alkalmazásokban:</p>

<pre><code>// 1. Telepítsük a Prismát
npm install prisma --save-dev
npx prisma init

// 2. Adjuk hozzá a schema.prisma fájlt
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}</code></pre>

<h2>Hitelesítés: NextAuth.js</h2>
<p>A hitelesítés kritikus része bármely alkalmazásnak. A NextAuth (most már Auth.js) a legjobb megoldás:</p>

<pre><code>// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub
      return session
    },
  },
})

export { handler as GET, handler as POST }</code></pre>

<h2>Form kezelés Server Actions-szal</h2>
<p>A Next.js 14 Server Actions segítségével egyszerűen kezelhetjük az űrlapokat:</p>

<pre><code>// src/app/actions.ts
'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  
  await db.user.create({
    data: { name, email }
  })
  
  revalidatePath('/users')
}

// Használata:
<form action={createUser}>
  <input name="name" placeholder="Név" />
  <input name="email" placeholder="Email" />
  <button type="submit">Küldés</button>
</form></code></pre>

<h2>State management</h2>
<p>A Next.js 14-ben többféle state management megoldás közül választhatsz:</p>

<h3>Server Components + Server Actions</h3>
<p>A legtöbb esetben nincs szükség kliensoldali state-re. A Server Components és Server Actions mindent megoldanak.</p>

<h3>Zustand (ha mégis kell state)</h3>
<pre><code>import { create } from 'zustand'

interface CounterStore {
  count: number
  increment: () => void
}

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))</code></pre>

<h2>Deployment</h2>
<p>A Next.js alkalmazásokat a Vercel-en a legegyszerűbb deployolni:</p>

<ol>
  <li>Pushold a kódot GitHub-ra</li>
  <li>Importáld a projektet a Vercel-en</li>
  <li>A Vercel automágikusan detektálja a Next.js-t</li>
  <li>Állítsd be a környezeti változókat</li>
  <li>Deploy!</li>
</ol>

<h2>Best practices</h2>
<ul>
  <li>Mindig használj TypeScript-et</li>
  <li>Kerüld a kliensoldali fetch-et, ha lehetséges</li>
  <li>Használj Server Components-et, ahol csak lehet</li>
  <li>Implementálj error és loading state-eket</li>
  <li>Optimalizáld a képeket a next/image használatával</li>
</ul>

<h2>Összegzés</h2>
<p>A Next.js 14 a legjobb választás modern full stack alkalmazások építéséhez. Az SSR, SSG, API route-ok és Server Actions kombinációja lehetővé teszi, hogy egyetlen projektben megoldjunk mindent.</p>

<p>Gyakorolj sokat, és hamarosan profi full stack fejlesztő leszel!</p>
    `
  },
  {
    id: 3,
    title: "A tökéletes portfolióépítés - Útmutató fejlesztőknek",
    slug: "portfolio-epites-utmutato",
    excerpt: "Szeretnéd, hogy a portfoliód kiemelkedjen? Ebben a cikkben megtanulsz egy olyan portfoliót építeni, amely valóban munkához juttat.",
    category: "Karrier",
    date: "2025. január 1.",
    readTime: "20 perc",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
    tags: ["Portfolio", "Karrier", "Web Development", "Design"],
    content: `
<p class="lead">A portfóliód az egyik legfontosabb eszközöd a munkakeresésben. Ez az első dolog, amit a potenciális munkaadók megnéznek. Ebben az útmutatóban megtanulod, hogyan építs egy valóban hatékony portfóliót.</p>

<h2>Miért fontos a portfólió?</h2>
<p>A CV-d megmutatja, mit csináltál, de a portfóliód megmutatja, hogyan gondolkodsz és dolgozol. Ez a különbség a "fejlesztő" és a "jó fejlesztő" között.</p>

<p>Egy jó portfólió:</p>
<ul>
  <li>Megmutatja a készségeidet</li>
  <li>Bizonyítja a tapasztalatodat</li>
  <li>Kiemel a tömegből</li>
  <li>Lehetőséget ad a kreativitásra</li>
  <li>Konverziót eredményez (megkeresések)</li>
</ul>

<h2>A tökéletes portfólió elemei</h2>

<h3>1. Erős hero szekció</h3>
<p>Az első benyomás a legfontosabb. A hero szekciónak azonnal meg kell ragadnia a látogató figyelmét és közölnie kell, ki vagy és mit csinálsz.</p>

<p>Tippek:</p>
<ul>
  <li>Használj dinamikus animációkat</li>
  <li>Mutasd be egyedi személyiségedet</li>
  <li>Legyen világos a call-to-action</li>
  <li>Kerüld a túlzsúfolt designt</li>
</ul>

<h3>2. Rólam szekció</h3>
<p>Az emberek nem csak a kódodat, hanem TÉGED is szeretnének megismerni. Mesélj a hátodról, a szenvedélyeidről és a motivációdról.</p>

<p>Ne csak felsorold a technológiákat - mutasd be, hogyan oldod meg a problémákat!</p>

<h3>3. Projekt bemutatók</h3>
<p>Mindegyik projekt legyen részletesen bemutatva:</p>

<ul>
  <li><strong>A probléma</strong> - Milyen kihívással szembesültél?</li>
  <li><strong>A megoldás</strong> - Hogyan oldottad meg?</li>
  <li><strong>A technológia</strong> - Mit használtál és miért?</li>
  <li><strong>Az eredmény</strong> - Mi lett a végeredmény?</li>
  <li><strong>A tanulságok</strong> - Mit tanultál a projektből?</li>
</ul>

<h3>4. Készségek</h3>
<p>Mutatsd be a technikai készségeidet, de ne csak felsorold őket! Használj vizuális elemeket, mint például:</p>
<ul>
  <li>Skill bar-ok</li>
  <li>Projekt carousel</li>
  <li>Interaktív demo-k</li>
</ul>

<h3>5. Kapcsolatfelvétel</h3>
<p>Végül legyen egyszerű módja a kapcsolatfelvételnek. Ne csak egy email címet adj meg - legyen egy szép űrlap is!</p>

<h2>A design fontossága</h2>
<p>A design nem csak a "szépségről" szól. A jó design:</p>
<ul>
  <li>Megkönnyíti a navigációt</li>
  <li>Professzionális benyomást kelt</li>
  <li>Megmutatja a figyelmet a részletekre</li>
  <li>Elkülönít a versenytársaktól</li>
</ul>

<h3>Színek és tipográfia</h3>
<p>Válassz egy konzisztens színpalettát és betűtípust. A kék a bizalmat és a profizmust sugallz - ezért olyan népszerű a tech világban.</p>

<h3>Whitespace</h3>
<p>Ne félj a üres tér használatától! A whitespace segít a tartalomnak lélegezni és megkönnyíti az olvasást.</p>

<h2>Technikai megvalósítás</h2>
<p>Modern tech stack használata a portfóliónál:</p>

<pre><code>// Ajánlott stack
- Next.js - Gyors és SEO-barát
- TypeScript - Típusbiztos kód
- Tailwind CSS - Gyors styling
- Framer Motion - Animációk
- Vercel - Ingyenes hosting</code></pre>

<h2>Gyakori hibák, amiket kerülj</h2>
<ul>
  <li><strong>Túl sok projekt</strong> - 3-5 kiválasztott projekt jobb, mint 20 silány</li>
  <li><strong>Másolás</strong> - Légy egyedi!</li>
  <li><strong>Elavult tartalom</strong> - Rendszeresen frissíts</li>
  <li><strong>rossz képek</strong> - Használj professzionális screenshotokat</li>
  <li><strong>Nem reszponzív</strong> - Minden eszközön működnie kell</li>
</ul>

<h2>A/B tesztelés</h2>
<p>Ne félj kísérletezni! Teszteld különböző:</p>
<ul>
  <li>Design megoldásokat</li>
  <li>Copywriting-et</li>
  <li>Call-to-action-eket</li>
  <li>Színeket és elrendezéseket</li>
</ul>

<h2>Következő lépések</h2>
<ol>
  <li>Készíts egy listát a legjobb projektjeidről</li>
  <li>Írd meg a projekt leírásokat</li>
  <li>Válassz design stílust</li>
  <li>Építsd meg a weboldalt</li>
  <li>Deployold és teszteld</li>
  <li>Gyűjts visszajelzéseket</li>
  <li>Iterálj és fejleszd tovább</li>
</ol>

<h2>Összegzés</h2>
<p>A tökéletes portfólió nem egy nap alatt készül el. Folyamatosan fejleszd, és idővel egy olyan eszközzé válik, amely valóban munkához juttat.</p>

<p>Sok sikert az építéshez!</p>
    `
  },
  {
    id: 4,
    title: "Docker és Kubernetes a mindennapokban - Kezdőknek",
    slug: "docker-kubernetes-kezdo",
    excerpt: "A konténerizáció és az orkesztráció ma már elengedhetetlen tudás. Ez a cikk végigvezet a Docker és Kubernetes alapjain.",
    category: "DevOps",
    date: "2024. december 20.",
    readTime: "22 perc",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200",
    tags: ["Docker", "Kubernetes", "DevOps", "Backend"],
    content: `
<p class="lead">A DevOps kultúra és a konténerizáció forradalmasította a szoftverfejlesztést és üzemeltetést. Ebben az útmutatóban megtanulsz konténereket létrehozni és kezelni.</p>

<h2>Miért konténerizáció?</h2>
<p>Emlékszel, amikor a kódod működött a gépeden, de nem a szerveren? A konténerizáció ezt a problémát oldja meg.</p>

<p>A konténerizáció előnyei:</p>
<ul>
  <li><strong>Konzisztencia</strong> - Ugyanúgy fut everywhere</li>
  <li><strong>Izoláció</strong> - A konténerek függetlenek egymástól</li>
  <li><strong>Skálázhatóság</strong> - Könnyű horizontalisan növelni</li>
  <li><strong>Hatékonyság</strong> - Kevesebb erőforrás, mint a VM-ek</li>
  <li><strong>Gyorsaság</strong> - Másodpercek alatt elindul</li>
</ul>

<h2>A Docker alapjai</h2>

<h3>Telepítés</h3>
<pre><code># macOS
brew install --cask docker

# Linux (Ubuntu)
sudo apt-get update
sudo apt-get install docker.io
sudo systemctl start docker
sudo systemctl enable docker

# Windows
# Töltsd le a Docker Desktop-ot</code></pre>

<h3>Az első konténer</h3>
<pre><code># Futtassuk a Hello World-et
docker run hello-world

# Futtassunk egy interaktív konténert
docker run -it ubuntu bash

# Futtassunk egy web szervert
docker run -d -p 8080:80 nginx</code></pre>

<h2>Dockerfile írása</h2>
<p>A Dockerfile a konténer "receptje". Itt adod meg, hogyan épüljön fel a konténer:</p>

<pre><code># A legjobb gyakorlatok
FROM node:18-alpine

# Munkakönyvtár beállítása
WORKDIR /app

# Csak a szükséges fájlok másolása
COPY package*.json ./

# Függőségek telepítése
RUN npm ci --only=production

# Forráskód másolása
COPY . .

# Port beállítása
EXPOSE 3000

# Indítási parancs
CMD ["npm", "start"]</code></pre>

<h3>Build és futtatás</h3>
<pre><code># Build
docker build -t my-app .

# Futtatás
docker run -p 3000:3000 my-app

# Futtatás háttérben
docker run -d -p 3000:3000 my-app

# Interaktív mód
docker run -it -p 3000:3000 my-app bash</code></pre>

<h2>Docker Compose</h2>
<p>A Docker Compose-szal több konténert kezelhetsz egyszerre:</p>

<pre><code>version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

volumes:
  postgres_data:</code></pre>

<pre><code># Futtatás
docker-compose up -d

# Logok megtekintése
docker-compose logs -f

# Leállítás
docker-compose down</code></pre>

<h2>Bevezetés a Kubernetes-be</h2>
<p>A Kubernetes (K8s) egy konténer orkesztrációs platform. Konténereket kezel, skáláz és hibaelhárít.</p>

<h3>Alapfogalmak</h3>
<ul>
  <li><strong>Pod</strong> - A legkisebb egység (1+ konténer)</li>
  <li><strong>Deployment</strong> - Pod-ok kezelése</li>
  <li><strong>Service</strong> - Hálózati hozzáférés</li>
  <li><strong>ConfigMap</strong> - Konfiguráció</li>
  <li><strong>Secret</strong> - Érzékeny adatok</li>
  <li><strong>Ingress</strong> - Külső hozzáférés</li>
</ul>

<h3>Deployment létrehozása</h3>
<pre><code>apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:latest
        ports:
        - containerPort: 3000
        resources:
          limits:
            memory: "256Mi"
            cpu: "500m"</code></pre>

<h3>Service létrehozása</h3>
<pre><code>apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer</code></pre>

<h2>Helm - A Kubernetes Package Manager</h2>
<p>A Helm segít komplex alkalmazásokat telepíteni Kubernetes-re:</p>

<pre><code># Helm telepítése
brew install helm

# Chart keresése
helm search nginx

# Telepítés
helm install my-release nginx/nginx-ingress

# Frissítés
helm upgrade my-release nginx/nginx-ingress

# Listázás
helm list</code></pre>

<h2>Gyakorlati tippek</h2>
<ul>
  <li>Mindig használj .dockerignore fájlt</li>
  <li>Multi-stage build-ek használata a kisebb képekért</li>
  <li>Security: ne root-ként futtasd a konténereket</li>
  <li>Health check-ek beállítása</li>
  <li>Resource limit-ek megadása</li>
  <li>Log-ok megfelelő kezelése</li>
</ul>

<h2>CI/CD integráció</h2>
<p>A konténerizáció és a CI/CD kéz a kézben járnak:</p>

<pre><code># GitHub Actions példa
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t my-app:COMMIT_SHA .
      
      - name: Push to registry
        run: |
          docker push my-registry/my-app:COMMIT_SHA
      
      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/my-app my-app=my-registry/my-app:COMMIT_SHA</code></pre>

<h2>Összegzés</h2>
<p>A Docker és Kubernetes az modern fejlesztés alapvető eszközei. Nem kell mindent egyszerre megtanulnod - kezd a Dockerrel, és fokozatosan haladj a Kubernetes felé.</p>

<p>A konténerizáció megváltoztatja a way you think about deployment!</p>
    `
  },
  {
    id: 5,
    title: "TypeScript mesterré válás - 10 haladó tipp",
    slug: "typescript-master-tips",
    excerpt: "Szeretnél jobb TypeScript kódot írni? Ezek a haladó tippek és trükkök segítenek mesterré válni.",
    category: "Backend",
    date: "2024. december 12.",
    readTime: "18 perc",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200",
    tags: ["TypeScript", "JavaScript", "Programming", "Tips"],
    content: `
<p class="lead">A TypeScript nem csak "JavaScript + típusok". Sokkal több van benne, mint gondolnád. Ezek a haladó tippek segítenek profi szinten használni.</p>

<h2>1. Strict Mode mindenhol</h2>
<p>A strict mode bekapcsolása az egyik legjobb dolog, amit tehetsz:</p>

<pre><code>// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}</code></pre>

<h2>2. Template Literal Types</h2>
<p>Hozz létre dinamikus típusokat stringekből:</p>

<pre><code>type EventName = 'click' | 'focus' | 'blur';
type EventHandler<T extends EventName> = \`on\${Capitalize<T>}\`;
// "onClick" | "onFocus" | "onBlur"

type Route = '/home' | '/about' | '/contact';
type ApiEndpoint<T extends Route> = \`https://api.example.com\${T}\`;
// "https://api.example.com/home" | ...

// Gyakorlati példa
type HttpMethod = 'get' | 'post' | 'put' | 'delete';
type Handler<M extends HttpMethod> = \`handle\${Capitalize<M>}\`;
// "handleGet" | "handlePost" | "handlePut" | "handleDelete"</code></pre>

<h2>3. Discriminated Unions</h2>
<p>Tökéletes state management-hez:</p>

<pre><code>type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function handleState(state: RequestState<User>) {
  switch (state.status) {
    case 'idle':
      return 'Várakozás...';
    case 'loading':
      return 'Betöltés...';
    case 'success':
      return \`Sikeres: \${state.data.name}\`; // TypeScript tudja, hogy state.data létezik
    case 'error':
      return \`Hiba: \${state.error.message}\`; // TypeScript tudja, hogy state.error létezik
  }
}</code></pre>

<h2>4. Satisfies Operator</h2>
<p>A legújabb TypeScript 4.9+ feature - típusellenőrzés maximális rugalmassággal:</p>

<pre><code>// Korábban
const colors = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  success: '#10b981',
} as const;

// Most - satisfies-szel
const colors = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  success: '#10b981',
} satisfies Record<string, string>;

// Előnye: megőrzi a literal típusokat ÉS ellenőrzi a típust
type PrimaryColor = typeof colors.primary;
// "#3b82f6" (nem string!)</code></pre>

<h2>5. Generics haladó használata</h2>
<pre><code>// Függvény, ami bármilyen tömböt rendez
function sortBy<T, K extends keyof T>(
  array: T[], 
  key: K,
  direction: 'asc' | 'desc' = 'asc'
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

// Használat
const users = [
  { name: 'Anna', age: 25 },
  { name: 'Béla', age: 30 },
  { name: 'Cili', age: 20 },
];

sortBy(users, 'age', 'desc');
// [{ name: 'Béla', age: 30 }, { name: 'Anna', age: 25 }, { name: 'Cili', age: 20 }]</code></pre>

<h2>6. Type Guards</h2>
<p>Saját típusellenőrzések létrehozása:</p>

<pre><code>type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim(); // TypeScript tudja, hogy Fish
  } else {
    pet.fly(); // TypeScript tudja, hogy Bird
  }
}

// Másik példa
function isString(value: unknown): value is string {
  return typeof value === 'string';
}</code></pre>

<h2>7. Mapped Types</h2>
<p>Típusok transzformálása:</p>

<pre><code>type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// Gyakorlati példa
type User = {
  id: number;
  name: string;
  email: string;
};

type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }

type NullableUser = Nullable<User>;
// { id: number | null; name: string | null; email: string | null; }</code></pre>

<h2>8. Conditional Types</h2>
<p>Típusok, amik típusokból számítanak ki:</p>

<pre><code>// Egyszerű példa
type IsString<T> = T extends string ? true : false;
type Test1 = IsString<'hello'>; // true
type Test2 = IsString<42>; // false

// Haladó példa - típusból típus kinyerése
type ExtractArrayType<T> = T extends (infer U)[] ? U : never;
type StringArray = ExtractArrayType<string[]>; // string
type NumberArray = ExtractArrayType<number[]>; // number

// Promise típusból a megoldott típus
type Awaited<T> = T extends Promise<infer U> ? U : T;
type PromiseResult = Awaited<Promise<string>>; // string</code></pre>

<h2>9. Never típus használata</h2>
<p>A never azt jelenti, hogy "soha nem fog megtörténni":</p>

<pre><code>// Exhaustiveness checking
type Color = 'red' | 'green' | 'blue';

function getColorName(color: Color): string {
  switch (color) {
    case 'red':
      return 'Piros';
    case 'green':
      return 'Zöld';
    case 'blue':
      return 'Kék';
    default:
      // Ha új Color-t adunk hozzá, itt hiba lesz!
      const _exhaustive: never = color;
      throw new Error(\`Unknown color: \${_exhaustive}\`);
  }
}

// Vagy assertionnel
function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}</code></pre>

<h2>10. Utility Types深度</h2>
<p>Használd a beépített utility típusokat:</p>

<pre><code>// Pick - kiválasztás
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - kihagyás
type UserWithoutEmail = Omit<User, 'email'>;

// Partial & Required
type PartialUser = Partial<User>;
type RequiredUser = Required<User>;

// Record - gyors objektum típus
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;

// ReturnType - függvény visszatérési típusa
type FnReturn = ReturnType<typeof fetchUser>;

// Parameters - függvény paramétereinek típusa
type FnParams = Parameters<typeof updateUser>;</code></pre>

<h2>Összegzés</h2>
<p>A TypeScript haladó funkciói segítenek:</p>
<ul>
  <li>Type-safe kód írásában</li>
  <li>Refactoring biztonságában</li>
  <li>Automatikus hibafelismerésben</li>
  <li>Jobb IDE támogatásban</li>
</ul>

<p>Gyakorolj sokat, és hamarosan profi TypeScript fejlesztő leszel!</p>
    `
  },
  {
    id: 6,
    title: "Az én utam a programozásban - Személyes történetem",
    slug: "sajat-tortenetem",
    excerpt: "Hogyan lettem full stack fejlesztő? Ebben a személyes posztban megosztom a történetemet, a kihívásokat és a tanulságokat.",
    category: "Személyes",
    date: "2024. december 1.",
    readTime: "12 perc",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200",
    tags: ["Személyes", "Karrier", "Történet", "Motivation"],
    content: `
<p class="lead">Sokan kérdezik, hogyan lettem programozó. Ez a cikk az én történetem - a kezdetektől mostanáig. Remélem, motivateál és segít azoknak, akik most kezdik.</p>

<h2>A kezdet</h2>
<p>Gyerekként mindig is érdekelt a technológia. Az első számítógépem egy öreg asztali gép volt, amin játszottam és néha elgondolkodtam, hogyan működhetnek ezek a játékok.</p>

<p>De soha nem gondoltam volna, hogy egyszer én is fejlesztő leszek. Az iskolában a matek és a fizika ment, de a programozás távolinak tűnt.</p>

<h2>Középiskola - Az első találkozás</h2>
<p>Középiskolában informatika órán tanultunk egy kicsit HTML-t és Pascal-t. Őszintén szólva unalmasnak tűnt. Nem értettem, miért írunk parancsokat, amikor a Word is ugyanúgy működik.</p>

<p>De valami megmaradt: a "ha ezt írod, azt csinálja" érzés. Ez volt az első pillantás a logikára.</p>

<h2>Egyetem - A fordulópont</h2>
<p>Az egyetemen mérnök-informatikus szakra jelentkeztem. Nem tudom, miért - talán mert a "jól fizet" és "jövője van" érvek meggyőzték a szüleimet.</p>

<p>Az első év szörnyű volt. C++, pointerek, rekurzió - minden értelmetlennek tűnt. Majdnem feladtam.</p>

<p>Aztán jött a második év, és a webfejlesztés. HTML, CSS, és végül JavaScript. És egyszerre minden megváltozott.</p>

<h3>Aha pillanat</h3>
<p>Emlékszem, mikor először csináltam egy működő űrlapot JavaScript-tel. Nem volt szép, nem volt tökéletes - de működött. És ami fontosabb: ÉN csináltam.</p>

<p>Az a pillanat, amikor a böngészőben megjelent az eredmény - ez volt az a momentum, ami mindent megváltoztatott.</p>

<h2>A tanulás évei</h2>
<p>Onnantól kezdve nem kellett motivateálni. Tanultam:</p>

<ul>
  <li>JavaScript - rengeteget</li>
  <li>React - a legújabb verziókat követtem</li>
  <li>Node.js - backend is</li>
  <li>TypeScript - mert a típusok fontosak</li>
  <li>SQL és NoSQL adatbázisok</li>
  <li>DevOps alapok (Docker, CI/CD)</li>
</ul>

<h3>Hogyan tanultam?</h3>
<ul>
  <li><strong>Online kurzusok</strong> - Udemy, Coursera, freeCodeCamp</li>
  <li><strong>Projektek</strong> - Minden, ami érdekelt, megcsináltam</li>
  <li><strong>Open source</strong> - Kisebb贡献ások nyílt forráskódú projektekhez</li>
  <li><strong>Stack Overflow</strong> - Sok olvasás, néha írás</li>
  <li><strong>Meetupok</strong> - Networking és tanulás másoktól</li>
</ul>

<h2>Az első munkahely</h2>
<p>Az álláskeresés nehéz volt. Rengeteg cv-t küldtem, kevés válasz jött. De végül megjött az első ajánlat: egy kisebb webügynökség, ahol frontend fejlesztőként dolgoztam.</p>

<p>Az első hónapok ijesztőek voltak. Minden új volt: a kódbázis, a csapat, a folyamatok. De a kollégák segítettek, és lassan belerázódtam.</p>

<h3>Amit ott tanultam:</h3>
<ul>
  <li>Valódi projektek menedzselése</li>
  <li>Csapatmunka (Git, code review)</li>
  <li>Határidők kezelése</li>
  <li>Ügyféllel való kommunikáció alapjai</li>
</ul>

<h2>A most</h2>
<p>Most már senior full stack fejlesztő vagyok. De a tanulás nem állt meg. A technológia folyamatosan változik, és ahhoz, hogy releváns maradj, muszáj lépést tartani.</p>

<p>Emellett mentorálok is kezdő fejlesztőket. Szeretek visszaadni a közösségnek, és segíteni azokon, akik most ott vannak, ahol én voltam évekkel ezelőtt.</p>

<h2>Tanulságok, amiket megosztanék</h2>

<h3>1. Ne félj a hibáktól</h3>
<p>Minden programozó hibázik. A kód nem működik, a bug-ok megjelennek. Ez normális. A lényeg, hogy megtanulj belőlük.</p>

<h3>2. Gyakorolj sokat</h3>
<p>Nem elég csak olvasni a kódot - írni kell. Minél többet kódolsz, annál jobb leszel. A "muscle memory" nagyon fontos.</p>

<h3>3. Találj mentort</h3>
<p>Egy jó mentor felbecsülhetetlen. Valaki, aki már végigment ezen az úton, és segíthet elkerülni a buktatókat.</p>

<h3>4. Ne hasonlítsd magad másokhoz</h3>
<p>Mindenkinek megvan a saját tempója. Én lassan kezdtem, de most itt vagyok. Te is ott leszel, csak ne add fel!</p>

<h3>5. A technológia csak eszköz</h3>
<p>Ne ragadj le egy technológiánál. A fontos a problémamegoldó képesség, nem a konkrét framework ismerete.</p>

<h2>Köszönet</h2>
<p>Köszönöm mindenkinek, aki segített az utamon: a családomnak, a barátaimnak, a kollégáimnak, és mindenkinek, akit megismerhettem a tech közösségben.</p>

<p>Ha te is most kezded - ne add fel. Éri meg.</p>

<p class="text-center text-xl mt-12"></p>
    `
  }
];
