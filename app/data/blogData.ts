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
    title: "A React 19 megérkezett – Minden, amit tudnod kell róla",
    slug: "react-19-ujdonsagok",
    excerpt: "A React 19 nem csak egy sima frissítés – ez egy forradalom. Ebben a részletes, gyakorlati példákkal teli útmutatóban minden új funkciót megnézünk: React Compiler, Server Actions, use() hook, Document Metadata és még sok más. Mutatom, hogyan változtatja meg a fejlesztés mindennapjait.",
    category: "Frontend",
    date: "2025. január 15.",
    readTime: "22 perc",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200",
    tags: ["React", "JavaScript", "Frontend", "Web Development", "React 19"],
    content: `
<p class="lead">🎉 Végre itt van a React 19! Hónapok óta vártuk, és megérte. Ez nem egy apró verziószám ugrás – tele van olyan funkciókkal, amelyek alapjaiban változtatják meg a React-alkalmazások fejlesztését. Ebben a cikkben nem csak felsorolom az újdonságokat, hanem valódi, használható példákon keresztül mutatom be, hogyan gyorsíthatod fel a munkádat és írhatsz jobb kódot.</p>

<h2>Miért olyan nagy durranás a React 19?</h2>
<p>Az elmúlt években a React elsősorban a stabilitásról és a fokozatos fejlesztésekről szólt. A 18-as verzió bevezette a concurrent rendering-et, de a fejlesztői élmény sok tekintetben ugyanaz maradt. A 19-es verzió viszont <strong>forradalmi váltást</strong> hoz a komponensek írásának módjában.</p>

<p>A legnagyobb változások:</p>
<ul>
  <li>✅ <strong>React Compiler</strong> – automatikus memoizáció, nincs több useMemo/useCallback</li>
  <li>✅ <strong>Server Actions</strong> – szerveroldali függvények közvetlenül a komponensekből</li>
  <li>✅ <strong>use() hook</strong> – Promise-ok és kontextusok egyszerű kezelése</li>
  <li>✅ <strong>Document Metadata</strong> – title, meta leírások komponens szinten</li>
  <li>✅ <strong>Form Actions</strong> – űrlapkezelés soha nem volt ilyen egyszerű</li>
</ul>

<p>Nézzük is meg őket egyesével, rengeteg kódpéldával!</p>

<h2>1. React Compiler – A memoizáció vége</h2>
<p>Eddig ha optimalizálni akartad a komponensedet, kézzel kellett pakolnod a <code>useMemo</code>, <code>useCallback</code> és <code>React.memo</code> függvényeket. Nem csak hogy plusz munka volt, de könnyű volt elrontani, és gyakran több kódot jelentett, mint maga a logika.</p>

<p>A React 19 új kompilátora <strong>automatikusan elemzi a komponenseidet</strong>, és csak akkor renderel újra, amikor szükséges. Nézd meg ezt a példát:</p>

<pre><code>// React 18 – kézi optimalizálás
import React, { useMemo, useCallback } from 'react';

function ExpensiveComponent({ items, onItemClick }) {
  const expensiveValue = useMemo(() => {
    return items.filter(item => item.active).map(item => item.value);
  }, [items]);

  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);

  return (/* ... */);
}

// React 19 – a compiler mindent megcsinál
function ExpensiveComponent({ items, onItemClick }) {
  // A compiler rájön, hogy ez függ items-től
  const expensiveValue = items.filter(item => item.active).map(item => item.value);
  
  // A compiler látja, hogy ez egy stabil függvény
  const handleClick = (id) => onItemClick(id);
  
  return (/* ... */);
}</code></pre>

<p>✨ <strong>Tanács:</strong> A compiler a build folyamat része, nem kell semmit sem telepítened külön. Csak frissíts a React 19-re, és a Next.js vagy Vite automatikusan használja.</p>

<h2>2. Server Actions – Backend a frontendben</h2>
<p>Ez a funkció igazi game changer. Korábban ha szerveroldali műveletet akartál végezni (pl. adatbázisba írni, fájlt feltölteni), külön API endpoint-ot kellett írnod, majd fetch-el meghívnod. A React 19-ben egyszerűen definiálhatsz egy <code>'use server'</code> függvényt, és meghívhatod közvetlenül a komponensedből.</p>

<pre><code>// app/actions.ts
'use server';
import { db } from './db';
import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  await db.post.create({
    data: { title, content, publishedAt: new Date() }
  });
  
  // Frissíti a cache-t, hogy megjelenjen az új bejegyzés
  revalidatePath('/posts');
}

// app/components/CreatePostForm.tsx
import { createPost } from '../actions';

export function CreatePostForm() {
  return (
    &lt;form action={createPost}&gt;
      &lt;input name="title" placeholder="Cím" /&gt;
      &lt;textarea name="content" placeholder="Tartalom" /&gt;
      &lt;button type="submit"&gt;Létrehozás&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>

<p>💡 <strong>Pro tipp:</strong> Használhatod a <code>useFormStatus</code> hookot a gomb letiltására küldés közben, és a <code>useOptimistic</code> hookot az azonnali UI frissítéshez.</p>

<h2>3. use() hook – Promise-ok és kontextusok egyszerűen</h2>
<p>Az új <code>use()</code> hook forradalmasítja az aszinkron adatok kezelését. Eddig a <code>useEffect</code> + <code>useState</code> kombót kellett használnod, vagy egy külső könyvtárat (pl. React Query). Mostantól közvetlenül a komponensben "feloldhatsz" egy Promise-t, és a React majd kezeli a loading állapotot.</p>

<pre><code>// Adatfetchetés use() segítségével
async function fetchUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}

function UserProfile({ userId }) {
  // A userPromise lehet egy prop vagy context
  const user = use(fetchUser(userId));
  
  return (
    &lt;div&gt;
      &lt;h1&gt;{user.name}&lt;/h1&gt;
      &lt;p&gt;Email: {user.email}&lt;/p&gt;
    &lt;/div&gt;
  );
}

// Használat egy Suspense határral
&lt;Suspense fallback={&lt;div&gt;Betöltés...&lt;/div&gt;}&gt;
  &lt;UserProfile userId={123} /&gt;
&lt;/Suspense&gt;</code></pre>

<p>⚡ <strong>Fontos:</strong> A <code>use()</code> hook nem csak Promise-okra működik, hanem kontextusokra is! Így feltételesen olvashatsz ki kontextus értékeket, amit eddig nem lehetett.</p>

<h2>4. Document Metadata – Végre tiszta head kezelés</h2>
<p>Ha valaha is próbáltál már meta címkéket beállítani egy React komponensből, tudod, hogy mekkora szenvedés. A react-helmet, next/head és egyéb megoldások mind kompromisszumok voltak. A React 19 bevezeti a <strong>szabványos metadata API-t</strong>:</p>

<pre><code>function BlogPost({ post }) {
  return (
    &lt;&gt;
      &lt;title&gt;{post.title} | Saját Blog&lt;/title&gt;
      &lt;meta name="description" content={post.excerpt} /&gt;
      &lt;meta property="og:image" content={post.coverImage} /&gt;
      &lt;link rel="canonical" href={\`https://példa.hu/posts/\${post.slug}\`} /&gt;
      
      &lt;article&gt;{post.content}&lt;/article&gt;
    &lt;/&gt;
  );
}</code></pre>

<p>A React automatikusan összegyűjti ezeket a címkéket és a dokumentum <code>&lt;head&gt;</code> részébe helyezi őket. Tökéletesen működik SSR-rel és SPA módban is.</p>

<h2>5. Form Actions továbbfejlesztve</h2>
<p>A React 19 tovább egyszerűsíti az űrlapok kezelését. A <code>action</code> prop most már támogatja az aszinkron függvényeket, és elérhetővé teszi a <strong>pending state</strong> kezelését:</p>

<pre><code>import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    &lt;button type="submit" disabled={pending}&gt;
      {pending ? 'Küldés folyamatban...' : 'Mentés'}
    &lt;/button&gt;
  );
}

function RegistrationForm() {
  async function register(formData) {
    'use server';
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Regisztráció:', formData.get('email'));
  }
  
  return (
    &lt;form action={register}&gt;
      &lt;input name="email" type="email" required /&gt;
      &lt;SubmitButton /&gt;
    &lt;/form&gt;
  );
}</code></pre>

<h2>Hogyan frissítsünk React 19-re?</h2>
<p>A frissítés általában problémamentes, de van pár dolog, amire figyelned kell:</p>

<ol>
  <li><strong>Frissítsd a függőségeket</strong> – <code>npm install react@19 react-dom@19</code></li>
  <li><strong>Ellenőrizd a harmadik féltől származó könyvtárakat</strong> – Néhány régi könyvtár (pl. régi formik, react-helmet) nem kompatibilis. Használd helyettük a beépített megoldásokat.</li>
  <li><strong>Távolítsd el a felesleges memoizációt</strong> – A React Compiler miatt már nincs szükség useMemo-ra és useCallback-re a legtöbb esetben.</li>
  <li><strong>Teszteld alaposan</strong> – Különösen a concurrent módra épülő funkciókat.</li>
</ol>

<h2>Összegzés: Érdemes váltani?</h2>
<p><strong>Igen, mindenképpen!</strong> A React 19 nem csak új feature-öket hoz, hanem egy teljesen új fejlesztési paradigmát. A kódod egyszerűbb, gyorsabb és kevésbé hibára hajlamos lesz. A Server Actions és a use() hook pedig olyan lehetőségeket adnak, amelyekkel eddig csak más keretrendszerek (pl. SvelteKit, Solid) büszkélkedhettek.</p>

<p>Ha most kezdenél egy új projektet, ne is gondolkodj – használd a React 19-et. Ha meglévő projekted van, kezdd el fokozatosan bevezetni a változásokat. A közösség már most rengeteg mintát és best practice-t publikált.</p>

<p>Mi a véleményed a React 19-ről? Kipróbáltad már? Írd meg kommentben! 👇</p>
    `
  },
  {
    id: 2,
    title: "Teljes útmutató: Full Stack fejlesztés Next.js 14-gyel",
    slug: "full-stack-nextjs",
    excerpt: "A Next.js 14 nem csak egy React keretrendszer – egy komplett full stack platform. Ebben a 25 perces, példákban gazdag útmutatóban megtanulod, hogyan építs adatbázissal, hitelesítéssel és API-kkal rendelkező alkalmazásokat. Prisma, NextAuth, Server Actions, és még sok más.",
    category: "Tutorial",
    date: "2025. január 8.",
    readTime: "28 perc",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200",
    tags: ["Next.js", "Full Stack", "API", "Web Development", "JavaScript", "Prisma"],
    content: `
<p class="lead">A Next.js 14 megjelenésével a full stack fejlesztés soha nem volt ilyen elérhető. Ebben a cikkben nem elméleti példákat mutatok – egy valódi, teljes értékű alkalmazást építünk a semmiből: felhasználókezelés, adatbázis, hitelesítés, űrlapok, valós idejű frissítések. Végigmegyünk minden lépésen, úgyhogy kapcsold be a kedvenc IDE-det, és vágjunk bele!</p>

<h2>Miért pont Next.js 14?</h2>
<p>A Next.js az utóbbi években a React-alapú alkalmazások királya lett. A 14-es verzióval azonban a Vercel csapata túllépett a „React keretrendszer” címkén – a Next.js immár egy <strong>teljes értékű full stack platform</strong>, amely versenyképes olyan gigászokkal, mint a Ruby on Rails, a Laravel vagy a Django.</p>

<p><strong>Mit nyújt a Next.js 14?</strong></p>
<ul>
  <li>🔥 <strong>Server Components</strong> – alapértelmezésben szerveroldali renderelés, nulla kliensoldali JS</li>
  <li>🔥 <strong>Server Actions</strong> – API endpoint-ok írása nélküli adatmódosítás</li>
  <li>🔥 <strong>App Router</strong> – fájlalapú útvonalak, layout-ok, párhuzamos útvonalak</li>
  <li>🔥 <strong>Beépített optimalizálások</strong> – képek, betűtípusok, szkriptek automatikus kezelése</li>
  <li>🔥 <strong>Zero-config TypeScript, ESLint, Tailwind</strong> – azonnal használható</li>
</ul>

<p>Az alábbiakban egy teljes alkalmazást építünk, amelyben a felhasználók regisztrálhatnak, bejelentkezhetnek, és blogbejegyzéseket írhatnak. Mindezt <strong>egyetlen kódbázisban</strong>, a backend és frontend szétválasztása nélkül.</p>

<h2>1. Projekt inicializálás</h2>
<p>Indítsd el a terminált, és futtasd:</p>
<pre><code>npx create-next-app@latest my-fullstack-app
# Válaszd az alábbiakat:
# - TypeScript: Yes
# - ESLint: Yes
# - Tailwind CSS: Yes
# - src/ directory: Yes
# - App Router: Yes</code></pre>

<p>Lépj be a mappába: <code>cd my-fullstack-app</code></p>

<h2>2. Adatbázis beállítása Prisma-val</h2>
<p>A Prisma a legjobb választás Next.js mellé – típusbiztos, egyszerű és erős.</p>

<pre><code>npm install prisma --save-dev
npx prisma init</code></pre>

<p>A <code>.env</code> fájlban állítsd be az adatbázis URL-t (itt PostgreSQL-t használok, de SQLite is működik fejlesztésben):</p>
<pre><code>DATABASE_URL="postgresql://postgres:password@localhost:5432/myapp"</code></pre>

<p>Szerkesszük a <code>prisma/schema.prisma</code> fájlt:</p>
<pre><code>generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String   // később hasheljük
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}</code></pre>

<p>Futtasd a migrációt:</p>
<pre><code>npx prisma migrate dev --name init
npx prisma generate</code></pre>

<p>Hozz létre egy <code>lib/prisma.ts</code> fájlt a kliens inicializálásához:</p>
<pre><code>import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma</code></pre>

<h2>3. Hitelesítés NextAuth-dal (Auth.js)</h2>
<p>Telepítsd a NextAuth-ot:</p>
<pre><code>npm install next-auth @auth/prisma-adapter
npm install bcryptjs
npm install --save-dev @types/bcryptjs</code></pre>

<p>Készítsd el a <code>app/api/auth/[...nextauth]/route.ts</code> fájlt:</p>
<pre><code>import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Jelszó", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        
        if (!user) return null
        
        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null
        
        return { id: user.id, email: user.email, name: user.name }
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string
      return session
    }
  }
})

export { handler as GET, handler as POST }</code></pre>

<p>Regisztrációhoz készíts egy Server Action-t a <code>app/actions/auth.ts</code> fájlban:</p>
<pre><code>'use server'
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

export async function register(formData: FormData) {
  const email = formData.get("email") as string
  const name = formData.get("name") as string
  const password = formData.get("password") as string
  
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) throw new Error("Ez az email már regisztrálva van")
  
  const hashedPassword = await bcrypt.hash(password, 10)
  
  await prisma.user.create({
    data: { email, name, password: hashedPassword }
  })
  
  redirect("/login")
}</code></pre>

<h2>4. Blogbejegyzések CRUD műveletei</h2>
<p>Készítsünk egy űrlapot új poszt létrehozásához Server Actions segítségével (<code>app/dashboard/new-post/page.tsx</code>):</p>
<pre><code>import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

async function createPost(formData: FormData) {
  'use server'
  const session = await getServerSession()
  if (!session?.user) throw new Error("Nem vagy bejelentkezve")
  
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  
  await prisma.post.create({
    data: {
      title,
      content,
      authorId: session.user.id,
      published: true
    }
  })
  
  revalidatePath("/dashboard")
  redirect("/dashboard")
}

export default function NewPostPage() {
  return (
    &lt;form action={createPost} className="space-y-4"&gt;
      &lt;div&gt;
        &lt;label htmlFor="title" className="block text-sm font-medium"&gt;Cím&lt;/label&gt;
        &lt;input type="text" name="title" id="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" /&gt;
      &lt;/div&gt;
      &lt;div&gt;
        &lt;label htmlFor="content" className="block text-sm font-medium"&gt;Tartalom&lt;/label&gt;
        &lt;textarea name="content" id="content" rows={10} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" /&gt;
      &lt;/div&gt;
      &lt;button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md"&gt;Publikálás&lt;/button&gt;
    &lt;/form&gt;
  )
}</code></pre>

<p>A posztok listázása egy szerverkomponensben:</p>
<pre><code>// app/dashboard/page.tsx
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function DashboardPage() {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" }
  })
  
  return (
    &lt;div&gt;
      &lt;h1&gt;Saját bejegyzéseim&lt;/h1&gt;
      &lt;div className="grid gap-4"&gt;
        {posts.map(post => (
          &lt;Link href={\`/posts/\${post.id}\`} key={post.id} className="border p-4 rounded hover:shadow"&gt;
            &lt;h2 className="text-xl font-bold"&gt;{post.title}&lt;/h2&gt;
            &lt;p&gt;{post.content.slice(0, 100)}...&lt;/p&gt;
            &lt;small&gt;Szerző: {post.author.name} – {new Date(post.createdAt).toLocaleDateString()}&lt;/small&gt;
          &lt;/Link&gt;
        ))}
      &lt;/div&gt;
    &lt;/div&gt;
  )
}</code></pre>

<h2>5. Deployment Vercel-re</h2>
<p>A legjobb a Vercel, mert a Next.js készítői fejlesztik. Automatikusan felismeri a projektet, beállítja a build parancsokat, és kezeli a környezeti változókat.</p>

<ol>
  <li>Pushold a kódot egy GitHub repóba.</li>
  <li>Menj a <a href="https://vercel.com" target="_blank">vercel.com</a> oldalra, és importáld a repót.</li>
  <li>Állítsd be a környezeti változókat (DATABASE_URL, NEXTAUTH_SECRET, stb.) a Vercel irányítópultján.</li>
  <li>Kattints a Deploy gombra.</li>
</ol>

<p>Ha PostgreSQL adatbázist használsz, a Vercel kínál beépített Neon vagy Supabase integrációt, de használhatsz máshol futó adatbázist is.</p>

<h2>Best practice tippek a való világban</h2>
<ul>
  <li><strong>Használj típusbiztos API hívásokat</strong> – a Prisma típusait exportáld, hogy a frontend is lássa a modelleket.</li>
  <li><strong>Alkalmazz loading állapotokat</strong> – a <code>loading.tsx</code> fájlokkal azonnali visszajelzést adhatsz a felhasználónak.</li>
  <li><strong>Használd a <code>unstable_noStore</code> függvényt</strong> ha nem akarod cache-elni az adatokat (pl. személyes dashboard).</li>
  <li><strong>Vigyázz a szerver actionök validációjára</strong> – soha ne bízz a kliens oldali validációban, használd a Zod-ot.</li>
</ul>

<p>Ezzel a tudással már képes vagy egy teljes értékű full stack alkalmazás építésére. A Next.js 14 és a modern eszközök (Prisma, NextAuth, Tailwind) kombinációja hihetetlenül gyors fejlesztést tesz lehetővé. Ha bármi kérdésed van, írd meg a cikk alatti kommentekben!</p>
    `
  },
  {
    id: 3,
    title: "A tökéletes portfolióépítés – Útmutató fejlesztőknek",
    slug: "portfolio-epites-utmutato",
    excerpt: "Nem elég, hogy jól kódolj – a portfóliód az arcod a munkaerőpiacon. Ebben a cikkben nem sablonokat adok, hanem pszichológiát, UX stratégiákat és konkrét példákat, amivel állásinterjúkra hívnak, nem pedig unottan görgetnek tovább.",
    category: "Karrier",
    date: "2025. január 1.",
    readTime: "25 perc",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
    tags: ["Portfolio", "Karrier", "Web Development", "Design", "Freelance"],
    content: `
<p class="lead">Tudod, mi a különbség a „fejlesztő” és a „felvett fejlesztő” között? A portfólió. Nem a CV-d, nem a diplomád, nem az évek száma. A portfóliód. És hidd el, a legtöbb portfólió borzasztó unalmas, sablonos és hatástalan. Ebben az útmutatóban megmutatom, hogyan készíts olyan portfóliót, ami miatt a HR-esek és a technikai vezetők téged hívnak fel elsőnek.</p>

<h2>Miért buknak el a legtöbb portfóliók?</h2>
<p>Vegyünk egy átlagos fejlesztői portfóliót: „Szia, én Gábor vagyok, frontend fejlesztő. Itt van 3 projekt, amit csináltam. Itt a GitHub linkem. Köszönöm.” – Ez nem portfólió, ez egy névjegykártya. A jó portfólió <strong>sztorikat mesél</strong>, <strong>megoldott problémákat mutat be</strong>, és <strong>érzelmi kapcsolatot</strong> teremt.</p>

<p><strong>3 halálos bűn a portfóliókban:</strong></p>
<ol>
  <li><strong>Csak felsorolod a technológiákat</strong> – „React, Node.js, MongoDB” – ezt a CV-ben is leírtad. A portfólióban azt mutasd meg, hogyan használtad őket.</li>
  <li><strong>Nincsenek valós eredmények</strong> – „Csináltam egy e-kereskedelmi oldalt” helyett: „Növeltem a konverziós rátát 23%-kal egy új checkout flow-val”.</li>
  <li><strong>Sablon kinézet</strong> – A Bootstrap vagy a Tailwind sablonokat mindenki ismeri. Adj hozzá egyedi hangulatot, animációkat, személyes brandet.</li>
</ol>

<h2>A 8 elem, ami nélkül nincs sikeres portfólió</h2>

<h3>1. Hero szekció: 3 másodperced van</h3>
<p>Amikor valaki rákattint a portfóliódra, az első benyomás dönt. A hero szekcióban legyen:</p>
<ul>
  <li>Egy <strong>erős, egyedi headline</strong> – nem „Fejlesztő vagyok”, hanem „Olyan webalkalmazásokat építek, amik a felhasználókat is szeretik”.</li>
  <li>Egy <strong>profi fotó vagy egyedi avatar</strong> – az arcod emberivé tesz.</li>
  <li>Egy <strong>call-to-action</strong> – „Nézd meg a munkáimat” vagy „Keress meg egy projekttel”.</li>
</ul>

<h3>2. „Rólam” – ne a technológiákról, hanem a motivációdról</h3>
<p>Az emberek nem azért vesznek fel, mert ismered a Reduxot, hanem mert <strong>megbíznak benned</strong>. Írj arról, miért szeretsz kódolni, milyen problémákat oldottál meg, és mit tanultál a hibáidból.</p>

<p>Példa rossz: „5 éves tapasztalatom van Reactben, és szeretek csapatban dolgozni.”<br>
Példa jó: „Amikor először találkoztam egy lassan betöltő webáruházzal, rájöttem, hogy a teljesítmény nem luxus, hanem alapvetés. Azóta minden projektemben a Core Web Vitals az első.”</p>

<h3>3. Projekt bemutatók – a probléma-megoldás-eredmény struktúra</h3>
<p>Minden projekthez használd ezt a sablont:</p>
<ul>
  <li><strong>A probléma</strong> – Mi volt a kihívás? (pl. „A megrendelő régi PHP-s oldala lassú volt és nem reszponzív.”)</li>
  <li><strong>A megoldás</strong> – Mit csináltál pontosan? („Átírtam Next.js-re, bevezettem ISR-t és optimalizáltam a képeket.”)</li>
  <li><strong>Az eredmény</strong> – Számokban kifejezve! („Az oldal sebessége 2.4 másodpercről 0.8 másodpercre csökkent, a bounce rate 45%-ról 22%-ra esett.”)</li>
  <li><strong>A technológia</strong> – Röviden, címkékben.</li>
  <li><strong>Élő demo és GitHub link</strong> – Ha lehet, működő verzió is.</li>
</ul>

<p>Adj hozzá screenshotokat, rövid GIF-eket a fontos interakciókról.</p>

<h3>4. Készségek – vizualizáció és hitelesítés</h3>
<p>Ne csak listázd, hogy „TypeScript, Python, Docker”, hanem mutasd meg, hogy milyen szinten vagy. Használj skill bar-okat, vagy – ami még jobb – <strong>mini projekt referenciákat</strong>:</p>
<ul>
  <li>TypeScript – „Írtam egy teljesen típusbiztos REST API klienst.”</li>
  <li>Docker – „Dockerizáltam egy microservice architektúrát 4 szolgáltatással.”</li>
</ul>

<h3>5. Tapasztalat – nem csak a munkahelyek</h3>
<p>Ha kezdő vagy, nyugodtan tüntess fel open source contributiókat, saját projekteket, bootcamp végzést. A lényeg, hogy <strong>mit tanultál belőlük</strong>.</p>

<h3>6. Tesztimóniumok – mások mondják el, hogy jó vagy</h3>
<p>Kérj rövid idézeteket korábbi kollégáktól, ügyfelektől. Egy-egy konkrét mondat sokat számít: „Alex a lehetetlen határidőt is hozta, és a kódját öröm volt review-zni.”</p>

<h3>7. Kapcsolat – legyen egyszerű és gyors</h3>
<p>Ne csak egy email címet tegyél ki. Legyen egy űrlap, ami elküldi neked az üzenetet (pl. Resend vagy EmailJS segítségével). Add meg a LinkedIn, GitHub, Twitter profiljaidat.</p>

<h3>8. Blog (igen, a tiéd is!)</h3>
<p>A blog mutatja, hogy naprakész vagy, és szeretsz tanulni. Nem kell hetente írnod – elég havi egy minőségi poszt, ami bemutat egy érdekes problémát, amit megoldottál.</p>

<h2>Design tippek fejlesztőknek</h2>
<p>Nem kell dizájnernek lenned, de pár alapelv sokat segít:</p>
<ul>
  <li><strong>Használj bőséges whitespace-t</strong> – a zsúfolt design idegesítő.</li>
  <li><strong>Válassz egy maximálisan 3 színből álló palettát</strong> – használhatod a Coolors.co-t.</li>
  <li><strong>Legyen reszponzív</strong> – mobilon is tökéletesen működjön.</li>
  <li><strong>Adj hozzá finom animációkat</strong> – a Framer Motion vagy az AOS könyvtár sokat dob.</li>
</ul>

<h2>Technikai stack, amit érdemes használni</h2>
<p>Ha teheted, építsd a portfóliódat a következő stackkel – ezzel is bizonyítod a modern technológiákban való jártasságodat:</p>
<pre><code>- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion (animációk)
- Resend (email küldés az űrlapból)
- Vercel (hosting)</code></pre>

<p>A GitHub repo legyen nyilvános, és legyen benne egy részletes README.md.</p>

<h2>Példa projektleírás – hogyan nézzen ki?</h2>
<p><strong>Projekt: WeatherDash – időjárás dashboard</strong></p>
<ul>
  <li><strong>Probléma:</strong> A meglévő időjárás appok túl bonyolultak voltak a idősebb felhasználók számára.</li>
  <li><strong>Megoldás:</strong> Építettem egy minimalista PWA-t, ami nagy betűkkel mutatja az aktuális időjárást, és lehetővé teszi több város mentését. Használtam a OpenWeatherMap API-t, a frontendet Next.js-szel készítettem, az állapotkezeléshez Zustand-ot.</li>
  <li><strong>Eredmény:</strong> A dashboardot 500+ felhasználó használja havonta, és 4.8-as értékelést kapott a Product Hunt-on.</li>
  <li><strong>Technológiák:</strong> Next.js, TypeScript, Tailwind, Zustand, Jest (tesztelés).</li>
  <li><strong>Linkek:</strong> <a href="#">Élő demo</a> | <a href="#">GitHub</a></li>
</ul>

<h2>Következő lépések – cselekedj most!</h2>
<p>Ne halogasd tovább. Tölts el egy hétvégét azzal, hogy átnézed a jelenlegi portfóliód (vagy ha nincs, csinálj egyet).</p>
<ol>
  <li>Válassz ki 3-4 projektet, amit fel akarsz tüntetni.</li>
  <li>Írd meg mindegyikhez a probléma-megoldás-eredmény sztorit.</li>
  <li>Válassz egy modern sablont (vagy kódold meg magad) – ajánlom a <strong>Next.js Portfolio Starter</strong>-t a Verceltől.</li>
  <li>Deployold Vercelre, és tedd ki LinkedIn-re.</li>
</ol>

<p>És ne felejtsd: a portfóliód sosem kész. Folyamatosan frissítsd, ahogy új készségeket tanulsz. Sok sikert! 🚀</p>
    `
  },
  {
    id: 4,
    title: "Docker és Kubernetes a mindennapokban – Teljes kezdő útmutató",
    slug: "docker-kubernetes-kezdo",
    excerpt: "A konténerizáció már nem csak a DevOps engineer-ek privilégiuma. Ebből a cikkből megtanulod, hogyan csomagolhatod be az alkalmazásod Dockerrel, hogyan állíthatsz össze több konténerből álló rendszereket Docker Compose-szal, és hogyan orkesztrálhatod őket Kubernetesben. Gyakorlati példák, konfig fájlok, hibakeresési tippek.",
    category: "DevOps",
    date: "2024. december 20.",
    readTime: "30 perc",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200",
    tags: ["Docker", "Kubernetes", "DevOps", "Backend", "Containers"],
    content: `
<p class="lead">"De a gépen működött!" – Ismerős? A konténerizáció ezt a problémát oldja meg egyszer s mindenkorra. A Docker és a Kubernetes napjaink legfontosabb DevOps eszközei. Ebben a cikkben nem elméleti szintű magyarázatot kapsz, hanem <strong>használható, másolható parancsokat és konfig fájlokat</strong>, amelyekkel azonnal produktívvá válhatsz.</p>

<h2>Miért van szükség konténerekre?</h2>
<p>Képzeld el: megírod a webalkalmazásod Node.js-ben, használsz egy bizonyos verziójú könyvtárat, Redis-t cache-nek, és PostgreSQL adatbázist. A fejlesztői gépeden minden tökéletesen fut. Aztán felteszed a szerverre, és… semmi. Mert a szerveren más a Node verzió, nincs telepítve a Redis, más a környezeti változó.</p>

<p>A Docker ezt úgy oldja meg, hogy <strong>minden függőséget egy konténerbe csomagol</strong>, ami bárhol ugyanúgy fut. A Kubernetes pedig ezeket a konténereket kezeli, skálázza, és ha egy leáll, újraindítja.</p>

<h2>1. Docker – Az alapok</h2>
<p>Telepítsd a Docker-t a <a href="https://docker.com" target="_blank">hivatalos oldalról</a> (macOS, Windows, Linux egyaránt).</p>

<h3>Első konténer indítása</h3>
<pre><code># Hello World
docker run hello-world

# Indíts egy Ubuntu konténert interaktív módban
docker run -it ubuntu bash

# Indíts egy Nginx webszervert a 8080-as porton
docker run -d -p 8080:80 nginx</code></pre>

<p>A <code>docker ps</code> megmutatja a futó konténereket, <code>docker stop &lt;container_id&gt;</code> leállítja.</p>

<h3>Dockerfile – a konténer receptje</h3>
<p>Hozz létre egy <code>Dockerfile</code> fájlt egy Node.js alkalmazáshoz:</p>
<pre><code># Alapkép (hivatalos Node 20-alpine, ami nagyon kicsi)
FROM node:20-alpine

# Munkakönyvtár beállítása
WORKDIR /app

# Csak a package.json fájlokat másoljuk először (a cache miatt)
COPY package*.json ./

# Függőségek telepítése (production only)
RUN npm ci --only=production

# Forráskód másolása
COPY . .

# A port, amit az alkalmazás használ
EXPOSE 3000

# Az indításkor futtatandó parancs
CMD ["node", "server.js"]</code></pre>

<p>Buildeld és futtasd:</p>
<pre><code>docker build -t my-node-app .
docker run -p 3000:3000 my-node-app</code></pre>

<p>Használd a <code>.dockerignore</code> fájlt, hogy ne másolódjanak be a felesleges dolgok (node_modules, .git, stb.).</p>

<h2>2. Docker Compose – több konténer együtt</h2>
<p>Egy modern alkalmazás ritkán egyetlen konténerből áll. Legyen egy Node.js backend, egy PostgreSQL adatbázis, és egy Redis cache. Így néz ki a <code>docker-compose.yml</code>:</p>
<pre><code>version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - ./uploads:/app/uploads

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:</code></pre>

<p>Indítás:</p>
<pre><code>docker-compose up -d   # háttérben
docker-compose logs -f  # logok követése
docker-compose down     # leállítás</code></pre>

<p>Ez a setup fejlesztésre is tökéletes – a kód megváltoztatásakor újra kell buildelni a <code>app</code> szolgáltatást, de az adatbázis adatai megmaradnak a volume-nak köszönhetően.</p>

<h2>3. Kubernetes – a konténer orkesztrátor</h2>
<p>Ha már több konténered van, és azokat több szerveren akarod futtatni, automatizálni a skálázást, a frissítéseket, akkor jön a Kubernetes (röviden K8s).</p>

<p>Először is telepítsd a <code>kubectl</code> parancssori eszközt, és ha lokálisan tanulnál, használd a <strong>Minikube</strong>-ot vagy a <strong>Docker Desktop beépített Kubernetes</strong> funkcióját.</p>

<h3>Alapfogalmak</h3>
<ul>
  <li><strong>Pod</strong> – egy vagy több konténer együtt, a legkisebb egység.</li>
  <li><strong>Deployment</strong> – pod-ok sablonja, kezeli a replikák számát, a frissítéseket.</li>
  <li><strong>Service</strong> – stabil hálózati címet ad a pod-oknak (mert a pod-ok jönnek-mennek).</li>
  <li><strong>ConfigMap / Secret</strong> – konfigurációs adatok és jelszavak tárolása.</li>
  <li><strong>Ingress</strong> – külső forgalom irányítása a service-ekhez (pl. domain alapján).</li>
</ul>

<h3>Első Deployment</h3>
<p>Készíts egy <code>deployment.yaml</code> fájlt:</p>
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
      - name: app
        image: my-node-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "500m"</code></pre>

<p>Service hozzáadása:</p>
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
  type: LoadBalancer   # Ha felhőben vagy, kap egy külső IP-t</code></pre>

<p>Telepítsd:</p>
<pre><code>kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl get pods
kubectl get services</code></pre>

<p>Ha Minikube-ot használsz, futtasd: <code>minikube service my-app-service</code> – megnyitja a böngészőben.</p>

<h3>Skálázás és frissítés</h3>
<pre><code># Skálázás 5 replikára
kubectl scale deployment my-app --replicas=5

# Frissítés új image-re (rolling update)
kubectl set image deployment/my-app app=my-node-app:v2

# Állapot figyelése
kubectl rollout status deployment/my-app

# Visszaállítás
kubectl rollout undo deployment/my-app</code></pre>

<h2>Gyakorlati tippek és trükkök</h2>
<ul>
  <li><strong>Használj multi-stage build-eket</strong> a Dockerben, hogy a production image kicsi legyen (pl. builder stage + node:alpine).</li>
  <li><strong>Ne futtasd root-ként a konténereket</strong> – adj meg <code>USER node</code> a Dockerfile-ban.</li>
  <li><strong>Health check-ek</strong> – Kubernetesben állíts be <code>livenessProbe</code> és <code>readinessProbe</code> értékeket, hogy a K8s tudja, mikor indítsa újra a pod-ot.</li>
  <li><strong>Használd a <code>kubectl port-forward</code></strong> parancsot fejlesztéshez: <code>kubectl port-forward pod/my-app-pod 3000:3000</code>.</li>
  <li><strong>Tanulj Helm-et</strong> – a Kubernetes csomagkezelője, amivel sablonosíthatod a konfigokat.</li>
</ul>

<p>Ha most kezded, ne ijedj meg a sok új fogalomtól. Kezdd a Dockerrel, építs pár egyszerű konténert, próbáld ki a Docker Compose-t, és csak utána ugorj a Kubernetes-be. Minden perc megéri, mert a konténerizáció tudása ma már alap elvárás a legtöbb fejlesztői pozícióban.</p>

<p>Kérdésed van? Vagy valami nem működik? Írd meg kommentben, segítek! 🐳</p>
    `
  },
  {
    id: 5,
    title: "TypeScript mesterré válás – 10 haladó tipp és minta",
    slug: "typescript-master-tips",
    excerpt: "A TypeScript sokkal több, mint 'JavaScript típusokkal'. Ebben a cikkben olyan mintákat és trükköket mutatok, amelyeket a senior fejlesztők használnak: template literal típusok, feltételes típusok, infer, mapped types, satisfies operátor, és még 6 másik. Kódpéldák, magyarázatok, és amitől tényleg jobb lesz a kódod.",
    category: "Backend",
    date: "2024. december 12.",
    readTime: "24 perc",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200",
    tags: ["TypeScript", "JavaScript", "Programming", "Tips", "Advanced"],
    content: `
<p class="lead">Ha a TypeScript-et csak arra használod, hogy <code>: string</code>-et írj a változók mellé, akkor a felszínét kapargatod. A TypeScript egy rendkívül erős típusrendszer, amely képes a kódod logikájának egy részét <strong>fordítási időben ellenőrizni</strong>. Ebben a cikkben olyan haladó technikákat mutatok, amelyeket a mindennapi munkám során használok, és amiktől a kódod robusztusabb, öndokumentálóbb lesz.</p>

<h2>1. Strict mode – kapcsold be, és ne kapcsold ki soha</h2>
<p>A <code>tsconfig.json</code>-ban a <code>"strict": true</code> bekapcsolása 5 különböző ellenőrzést aktivál. Sokan kikapcsolják, mert „macera”, de pont ez véd meg a futásidejű hibáktól.</p>
<pre><code>{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true, // extra védelem
    "exactOptionalPropertyTypes": true
  }
}</code></pre>

<h2>2. Template Literal Types – dinamikus string típusok</h2>
<p>Lehetővé teszik, hogy stringeket „matchelj” és új típusokat hozz létre belőlük.</p>
<pre><code>type EventName = 'click' | 'focus' | 'blur';
type EventHandler = \`on\${Capitalize<EventName>}\`; // "onClick" | "onFocus" | "onBlur"

// API endpoint validáció
type ApiRoute = '/users' | '/posts' | '/comments';
type ApiUrl = \`https://api.example.com\${ApiRoute}\`;

// Gyakorlati példa: CSS osztály generátor
type SpacingSize = 'sm' | 'md' | 'lg';
type SpacingClass = \`p-\${SpacingSize}\`; // "p-sm" | "p-md" | "p-lg"</code></pre>

<h2>3. Discriminated Unions – a tökéletes state management</h2>
<p>Amikor egy union típus minden tagjának van egy közös mezője (discriminant), a TypeScript leszűkíti a típust a mező alapján.</p>
<pre><code>type AsyncState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function handleState<T>(state: AsyncState<T>) {
  switch (state.status) {
    case 'success':
      console.log(state.data); // ✅ T típusú
      break;
    case 'error':
      console.error(state.error.message); // ✅ Error
      break;
    // A default ágban a state típusa 'never' lesz, ha minden esetet lefedtél
  }
}</code></pre>

<h2>4. satisfies operátor (TypeScript 4.9+)</h2>
<p>Ellenőrzi, hogy egy objektum megfelel-e egy típusnak, de megtartja a literal típusokat.</p>
<pre><code>// EDDIG: as const használata
const routes = {
  home: '/',
  about: '/about',
  contact: '/contact'
} as const; // típus: { readonly home: "/"; readonly about: "/about"; ... }

// MOST: satisfies
const routes = {
  home: '/',
  about: '/about',
  contact: '/contact'
} satisfies Record<string, string>; // típus továbbra is a literal értékek

type HomeRoute = typeof routes.home; // "/" (nem string!)</code></pre>

<h2>5. Infer – típus kinyerése</h2>
<p>Az <code>infer</code> kulcsszó lehetővé teszi, hogy egy feltételes típuson belül „kibonts” egy típust.</p>
<pre><code>// Példa: kinyerjük egy Promise által visszaadott típust
type Awaited<T> = T extends Promise<infer U> ? U : T;

type Result = Awaited<Promise<string>>; // string

// Függvény visszatérési típusának kinyerése
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function greet() { return "hello"; }
type GreetReturn = ReturnType<typeof greet>; // string</code></pre>

<h2>6. Mapped Types – objektum típusok transzformálása</h2>
<pre><code>type ReadonlyDeep<T> = {
  readonly [K in keyof T]: T[K] extends object ? ReadonlyDeep<T[K]> : T[K];
};

type OptionalNullable<T> = {
  [K in keyof T]?: T[K] | null;
};

// Használat
interface User {
  id: number;
  profile: { name: string; age: number };
}
type ReadonlyUser = ReadonlyDeep<User>;
// { readonly id: number; readonly profile: { readonly name: string; readonly age: number } }</code></pre>

<h2>7. Type Guards – saját típusellenőrző függvények</h2>
<pre><code>function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isArrayOfStrings(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}

// Használat
function process(data: unknown) {
  if (isArrayOfStrings(data)) {
    data.map(str => str.toUpperCase()); // ✅ data itt string[]
  }
}</code></pre>

<h2>8. Conditional Types – ha-akkor a típusokban</h2>
<pre><code>type IsArray<T> = T extends any[] ? true : false;
type A = IsArray<string[]>; // true
type B = IsArray<number>;   // false

// Kivételkezelés típusokban
type ErrorOrSuccess<T> = T extends { error: infer E } ? { error: E } : { success: T };

function getResult<T>(val: T): ErrorOrSuccess<T> {
  // implementáció...
}</code></pre>

<h2>9. A never típus használata kimerítő ellenőrzésre</h2>
<pre><code>type Color = 'red' | 'green' | 'blue';

function getColorName(color: Color): string {
  switch (color) {
    case 'red': return 'Piros';
    case 'green': return 'Zöld';
    case 'blue': return 'Kék';
    default:
      // Ha új színt adsz a Color unionhoz, itt fordítási hiba lesz!
      const _exhaustiveCheck: never = color;
      throw new Error(\`Ismeretlen szín: \${_exhaustiveCheck}\`);
  }
}</code></pre>

<h2>10. Utility Types – amiket érdemes fejből tudni</h2>
<ul>
  <li><code>Partial&lt;T&gt;</code> – minden opcionális lesz</li>
  <li><code>Required&lt;T&gt;</code> – minden kötelező</li>
  <li><code>Pick&lt;T, K&gt;</code> – csak bizonyos kulcsok</li>
  <li><code>Omit&lt;T, K&gt;</code> – bizonyos kulcsok kihagyása</li>
  <li><code>Record&lt;K, T&gt;</code> – objektum típus adott kulcsokkal</li>
  <li><code>Exclude&lt;U, V&gt;</code> – kivehető típusok</li>
  <li><code>Extract&lt;U, V&gt;</code> – kivehető típusok</li>
  <li><code>NonNullable&lt;T&gt;</code> – eltávolítja a null/undefined-et</li>
  <li><code>ReturnType&lt;T&gt;</code> – függvény visszatérési típusa</li>
  <li><code>Parameters&lt;T&gt;</code> – függvény paramétereinek tuple típusa</li>
</ul>

<p>Egy gyakorlati példa az összes használatával:</p>
<pre><code>interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

type PartialApiResponse = Partial<ApiResponse<string>>;
// { data?: string; status?: number; message?: string; }

type JustData = Pick<ApiResponse<number>, 'data'>;
// { data: number; }</code></pre>

<h2>Bónusz: TypeScript konfigurációk, amik sokat segítenek</h2>
<pre><code>{
  "compilerOptions": {
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "allowUnreachableCode": false,
    "forceConsistentCasingInFileNames": true
  }
}</code></pre>

<p>Remélem, ezek a tippek segítenek abban, hogy a TypeScript-et ne csak használd, hanem <strong>élvezd is</strong>! Gyakorold őket kisebb projektekben, és hamarosan a kódod magabiztosabb, olvashatóbb lesz. Ha van kedvenc trükköd, ami nincs a listában, oszd meg kommentben! 😊</p>
    `
  },
  {
    id: 6,
    title: "Az én utam a programozásban – Hogyan lettem full stack fejlesztő?",
    slug: "sajat-tortenetem",
    excerpt: "Nem vagyok kiváltságos, nem kezdtem gyerekkoromban kódolni. Ebben a személyes, őszinte posztban leírom a kudarcaimat, a majdnem-feladást, az első állásinterjút, és azt, hogy mi tartott a pályán. Ha most tanulsz programozni, vagy úgy érzed, nem vagy elég jó, ezt neked írom.",
    category: "Személyes",
    date: "2024. december 1.",
    readTime: "15 perc",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200",
    tags: ["Személyes", "Karrier", "Történet", "Motivation", "Tanulás"],
    content: `
<p class="lead">„Tehetséges vagy” – hallom néha. De hadd meséljem el az igazat: az első félévben majdnem kirúgtak az egyetemről. A C++ pointerek sírva fakasztottak. És a mai napig vannak olyan napok, amikor azt érzem, semmit sem tudok. Mégis, valahogy mégis itt vagyok. Ez az én történetem.</p>

<h2>A kezdet: középszerű diákból kódoló</h2>
<p>Gimnáziumban infó órán a tanár HTML-t tanított. Nekem akkor az is csodaszámba ment, hogy a <code>&lt;b&gt;</code> kóddal félkövér lesz a szöveg. De sosem gondoltam volna, hogy ebből egyszer megélek. Érettségi után a szüleim unszolására jelentkeztem mérnökinformatikára. „Jól fogsz keresni” – mondták. Nem tudták, mibe mennek bele.</p>

<h2>Az első nagy pofára esés</h2>
<p>Az első félévben volt egy C++ tárgy, ahol a tanár azt kérte, írjunk egy egyszerű listakezelőt. Én három hétig szenvedtem a pointerekkel, a dinamikus memóriakezeléssel. A zh-n 2-est kaptam (ami akkor ötös skálán éppen hogy átment). Sírtam a koli szobámban, és elhatároztam, hogy abbahagyom. De a szüleim azt mondták: „Adj neki még egy esélyt.”</p>

<h2>A fordulópont: webfejlesztés</h2>
<p>A második évben jött a webfejlesztés. HTML, CSS, JavaScript. És valami kattant. Amikor először láttam, hogy a böngészőben megjelenik egy űrlap, amit én írtam, és <strong>reagál a gombnyomásra</strong> – az hihetetlen érzés volt. Rájöttem, hogy a programozás nem csak matematikai absztrakció, hanem <strong>alkotás</strong>. Látható, tapintható dolgokat lehet építeni.</p>

<p>Azóta nem álltam le. Kezdtem a JavaScripttel, aztán React, Node.js, TypeScript, Next.js. Minden új technológia olyan volt, mintha egy új eszközt kaptam volna a szerszámosládába.</p>

<h2>A tanulási módszerem (ami neked is működhet)</h2>
<p>Nem vagyok zseni. Amit tudok, azt <strong>rengeteg gyakorlással</strong> és <strong>kudarccal</strong> értem el.</p>
<ul>
  <li><strong>Projektek, projektek, projektek.</strong> Nem olvastam el egyetlen könyvet sem elejétől a végéig. Mindig kitaláltam valami kis projektet (todo app, időjárás widget, blogmotor), és közben googliztam, stackoverflow-ztam.</li>
  <li><strong>Tanítottam másokat.</strong> Amikor magyarázni kell valamit, akkor derül ki, hogy mennyire érted. Blogot kezdtem írni (ezt olvasod most), és meetupokon is előadtam pár alkalommal.</li>
  <li><strong>Nem hasonlítgattam magam.</strong> A közösségi médiában mindenki a sikereit mutatja. Én is csak a kész projektjeimet rakom ki, nem a 3 napig tartó bug-keresést. Ha úgy érzed, lemaradtál, ne aggódj – mindenki a saját tempójában halad.</li>
</ul>

<h2>Az első állásinterjú – katasztrófa</h2>
<p>Egyetem után jelentkeztem egy junior fejlesztői pozícióra. A technikai interjún megkérdezték, mi a különbség a <code>let</code> és a <code>var</code> között. Tudtam, de izgultam, és összekevertem. Az interjúztató kedves volt, de nem vettek fel.</p>
<p>Visszamentem, átismételtem az alapokat, csináltam még pár projektet, és három hónappal később egy másik cégnél már sikerült. Az első munkahelyemen rengeteget tanultam – a kódreview-k, a pair programming, a legacy kód olvasása mind olyan dolgok, amiket egyedül nem lehet megtanulni.</p>

<h2>A kiégés és a megküzdés</h2>
<p>Nem minden rózsás. Két év után kiégtem. A határidők, a változó követelmények, a folyamatos tanulás kimerített. Hetekig nem bírtam kódot írni. Ekkor döntöttem úgy, hogy kicsit hátrébb lépek: kevesebb túlórát vállalok, elkezdtem sportolni, és beiktattam a „nem dolgozós” napokat. A legfontosabb tanulság: <strong>a fejlesztés maraton, nem sprint</strong>.</p>

<h2>Miért éri meg?</h2>
<p>Mert a mai napig, 6 év után is, amikor reggel leülök a gép elé, és megoldok egy problémát, amit előző nap lehetetlennek hittem – az fantasztikus érzés. A programozás állandó kihívás, tanulási lehetőség, és láthatod, ahogy a munkád hatással van másokra (akár milliókra, ha egy nagy projekt része vagy).</p>

<p>Ha te most tartasz ott, ahol én az elején – ne add fel. A kódolás nem ördöngösség. Csak idő, gyakorlás és türelem kell. Kezd egy apró projekttel, és élvezd, ahogy működni kezd.</p>

<p>Ha kérdésed van, vagy csak beszélgetnél, írj bátran a <a href="/contact">kapcsolati űrlapon</a> keresztül. Sok sikert! 💻✨</p>
    `
  }
];