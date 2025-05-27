export const allQuestions   = [
    // Git questions
    {
        id: 1,
        question: "Mi a Git legfontosabb előnye a verziókövetés terén?",
        options: ["Automatikus biztonsági mentések", "Elosztott verziókövetés", "Csak lokálisan működik", "Könnyű felhasználói felület"],
        correctAnswer: "Elosztott verziókövetés",
        topic: "Git"
    },
    {
        id: 2,
        question: "Mire szolgál a `git clone` parancs?",
        options: ["Commitok összehasonlítására", "Változtatások visszavonására", "Távoli repository másolására", "Egy új ág létrehozására"],
        correctAnswer: "Távoli repository másolására",
        topic: "Git"
    },
    {
        id: 3,
        question: "Hogyan lehet egy fájlt hozzáadni a staging area-hoz Git-ben?",
        options: ["git init", "git add", "git push", "git commit"],
        correctAnswer: "git add",
        topic: "Git"
    },
    {
        id: 4,
        question: "Melyik HTML elem felelős a legfőbb tartalomért egy oldalon?",
        options: ["<nav>", "<main>", "<footer>", "<header>"],
        correctAnswer: "<main>",
        topic: "HTML5"
    },
    {
        id: 5,
        question: "Mire való a CSS `flexbox`?",
        options: ["JavaScript kód írására", "Reszponzív elrendezés kialakítására", "Adatbázis-kapcsolatra", "Animációk létrehozására"],
        correctAnswer: "Reszponzív elrendezés kialakítására",
        topic: "CSS3"
    },
    {
        id: 6,
        question: "Mi a `media query` szerepe CSS-ben?",
        options: ["Űrlapok validálása", "JavaScript események kezelése", "Képernyőméret alapján stílusok alkalmazása", "Hangfájlok lejátszása"],
        correctAnswer: "Képernyőméret alapján stílusok alkalmazása",
        topic: "CSS3"
    },
    {
        id: 7,
        question: "Melyik kulcsszóval deklarálunk egy változót, ami később módosítható?",
        options: ["static", "let", "var", "const"],
        correctAnswer: "let",
        topic: "JavaScript"
    },
    {
        id: 8,
        question: "Mi lesz a kimenet? `console.log(2 + '2')`",
        options: ["Hiba", "'22'", "NaN", "4"],
        correctAnswer: "'22'",
        topic: "JavaScript"
    },
    {
        id: 9,
        question: "Melyik metódus tömb elemeinek összegzésére szolgál?",
        options: ["array.filter()", "array.reduce()", "array.forEach()", "array.map()"],
        correctAnswer: "array.reduce()",
        topic: "JavaScript"
    },
    {
        id: 10,
        question: "Mi az osztály alapvető építőeleme az OOP-ban?",
        options: ["Tulajdonságok és metódusok", "Függvények", "Minden fenti válasz helyes", "Objektumok"],
        correctAnswer: "Minden fenti válasz helyes",
        topic: "OOP"
    },

    {
        id: 11,
        question: "Mi az öröklődés (inheritance) fő előnye?",
        options: ["Kód újrafelhasználás", "Gyorsabb végrehajtás", "Kisebb memóriahasználat", "Egyszerűbb debugolás"],
        correctAnswer: "Kód újrafelhasználás",
        topic: "OOP"
    },

    // SQL questions (2)
    {
        id: 12,
        question: "Melyik SQL parancs szolgál adatok beszúrására?",
        options: ["SELECT", "INSERT", "UPDATE", "DELETE"],
        correctAnswer: "INSERT",
        topic: "SQL"
    },
    {
        id: 13,
        question: "Mire szolgál a WHERE záradék?",
        options: ["Adatok szűrésére", "Oszlopok kiválasztására", "Táblák összekapcsolására", "Rekordok sorrendezésére"],
        correctAnswer: "Adatok szűrésére",
        topic: "SQL"
    },

    // Frontend frameworks (2)
    {
        id: 14,
        question: "Melyik NEM React hook?",
        options: ["useState", "useEffect", "useComponent", "useContext"],
        correctAnswer: "useComponent",
        topic: "Frontend keretrendszerek"
    },
    {
        id: 15,
        question: "Melyik állítás igaz a Virtual DOM-ra?",
        options: [
            "Gyorsabb frissítéseket tesz lehetővé",
            "Közvetlenül manipulálja a böngésző DOM-ját",
            "Csak Angular-ban használják",
            "Növeli a memóriahasználatot"
        ],
        correctAnswer: "Gyorsabb frissítéseket tesz lehetővé",
        topic: "Frontend keretrendszerek"
    },

    // Backend questions (2)
    {
        id: 16,
        question: "Melyik NEM backend keretrendszer JavaScript-ben?",
        options: ["Express", "Django", "Koa", "NestJS"],
        correctAnswer: "Django",
        topic: "Backend keretrendszerek"
    },
    {
        id: 17,
        question: "Mire szolgál a middleware Express-ben?",
        options: [
            "Kérések és válaszok feldolgozására",
            "Adatbázis kapcsolat kezelésére",
            "Frontend komponensek renderelésére",
            "Konfigurációs beállítások tárolására"
        ],
        correctAnswer: "Kérések és válaszok feldolgozására",
        topic: "Backend keretrendszerek"
    },

    // Clean code (1)
    {
        id: 18,
        question: "Mit jelent a DRY elv a tiszta kódban?",
        options: [
            "Dynamic Resource Yielding",
            "Don't Repeat Yourself", 
            "Data Retrieval Yield",
            "Do Repeat Yourself"
        ],
        correctAnswer: "Don't Repeat Yourself",
        topic: "Tiszta kód"
    },
    {
        id: 19,
        question: "Melyik NEM szoftvertesztelési típus?",
        options: [
            "Végleges tesztelés",
            "Integrációs tesztelés",
            "Egységtesztelés",
            "Felhasználói tesztelés"
        ],
        correctAnswer: "Végleges tesztelés",
        topic: "Tesztelés"
    },
    {
        id: 20,
        question: "Melyik keretrendszer alkalmas mobilalkalmazás fejlesztésre?",
        options: [
            "Ionic",
            "Mindhárom",
            "Flutter",
            "React Native"
        ],
        correctAnswer: "Mindhárom",
        topic: "Mobil fejlesztés"
    },
    {
        id: 21,
        question: "Mit jelent a 'fork' a GitHub-on?",
        options: [
            "Commit összevonása",
            "Projekt archiválása",
            "Repository másolása egy személyes fiókba",
            "Branch létrehozása"
        ],
        correctAnswer: "Repository másolása egy személyes fiókba",
        topic: "Git"
    },
    {
        id: 22,
        question: "Mire szolgál a 'git rebase' parancs?",
        options: [
            "Távoli repository frissítésére",
            "Fájlok törlésére",
            "Konfliktusok feloldására",
            "Commit előzmények átrendezésére"
        ],
        correctAnswer: "Commit előzmények átrendezésére",
        topic: "Git"
    },
    {
        id: 23,
        question: "Melyik HTML5 elem felelős a videó tartalom beágyazásáért?",
        options: [
            "<movie>",
            "<video>",
            "<embed>",
            "<media>"
        ],
        correctAnswer: "<video>",
        topic: "HTML5"
    },
    {
        id: 24,
        question: "Mire szolgál a CSS 'grid-template-areas' tulajdonság?",
        options: [
            "Betűtípusok beállítására",
            "Oldalelrendezés tervezésére",
            "Reszponzív képek létrehozására",
            "Animációk időzítésére"
        ],
        correctAnswer: "Oldalelrendezés tervezésére",
        topic: "CSS3"
    },
    {
        id: 25,
        question: "Mit csinál a 'use strict' mód JavaScript-ben?",
        options: [
            "Gyorsabb kódvégrehajtást biztosít",
            "Letiltja az összes hibakezelést",
            "Szigorúbb szintaxis-ellenőrzést vezet be",
            "Engedélyezi a laza szintaxis használatát"
        ],
        correctAnswer: "Szigorúbb szintaxis-ellenőrzést vezet be",
        topic: "JavaScript"
    },
    {
        id: 26,
        question: "Mi az ES6 modul rendszer fő előnye?",
        options: [
            "Automatikus minifikáció",
            "CSS integráció",
            "Kód újrafelhasználás",
            "Globális változók használata"
        ],
        correctAnswer: "Kód újrafelhasználás",
        topic: "JavaScript"
    },
    {
        id: 27,
        question: "Mit jelent az egységbezárás (encapsulation) az OOP-ban?",
        options: [
            "Memóriafoglalás optimalizálása",
            "Függvények láncolása",
            "Adatok és metódusok egy egységbe zárása",
            "Osztályok elrejtése"
        ],
        correctAnswer: "Adatok és metódusok egy egységbe zárása",
        topic: "OOP"
    },
    {
        id: 28,
        question: "Mi a polimorfizmus fő előnye?",
        options: [
            "Egyszerűbb debugolás",
            "Ugyanaz a metódus különböző viselkedést mutathat",
            "Gyorsabb kódvégrehajtás",
            "Kisebb memóriahasználat"
        ],
        correctAnswer: "Ugyanaz a metódus különböző viselkedést mutathat",
        topic: "OOP"
    },
    {
        id: 29,
        question: "Mire szolgál a JOIN művelet SQL-ben?",
        options: [
            "Oszlopok átnevezésére",
            "Adatok törlésére",
            "Táblák összekapcsolására",
            "Rekordok sorrendezésére"
        ],
        correctAnswer: "Táblák összekapcsolására",
        topic: "SQL"
    },
    {
        id: 30,
        question: "Mi a különbség a PRIMARY KEY és a FOREIGN KEY között?",
        options: [
            "FOREIGN KEY csak számokat tartalmazhat",
            "PRIMARY KEY egyedi azonosító, FOREIGN KEY kapcsolatot létesít",
            "PRIMARY KEY nem lehet NULL",
            "Nincs különbség"
        ],
        correctAnswer: "PRIMARY KEY egyedi azonosító, FOREIGN KEY kapcsolatot létesít",
        topic: "SQL"
    },
    {
        id: 31,
        question: "Melyik állítás igaz a React komponensekre?",
        options: [
            "Csak JavaScriptben írhatók",
            "Állapotot (state) tarthatnak",
            "Mindig osztály komponensek",
            "Nem lehetnek újrahasznosíthatók"
        ],
        correctAnswer: "Állapotot (state) tarthatnak",
        topic: "Frontend keretrendszerek"
    },
    {
        id: 32,
        question: "Mire szolgál a Vue.js 'v-model' direktívája?",
        options: [
            "Animációk indítására",
            "CSS stílusok alkalmazására",
            "Kétirányú adatkötés létrehozására",
            "HTTP kérések küldésére"
        ],
        correctAnswer: "Kétirányú adatkötés létrehozására",
        topic: "Frontend keretrendszerek"
    },
    {
        id: 33,
        question: "Melyik NEM Node.js keretrendszer?",
        options: [
            "Fastify",
            "Express",
            "Django",
            "Koa"
        ],
        correctAnswer: "Django",
        topic: "Backend keretrendszerek"
    },
    {
        id: 34,
        question: "Mire szolgál az ORM (Object-Relational Mapping)?",
        options: [
            "Frontend komponensek renderelése",
            "Adatbázis objektumok és programkód közötti leképezés",
            "Hálózati kommunikáció optimalizálása",
            "Képfájlok tömörítése"
        ],
        correctAnswer: "Adatbázis objektumok és programkód közötti leképezés",
        topic: "Backend keretrendszerek"
    },
    {
        id: 35,
        question: "Mi a SOLID elv első betűjének (Single Responsibility) jelentése?",
        options: [
            "Ne használj globális változókat",
            "Metódusok legyenek rövidek",
            "Egy osztálynak egy felelőssége legyen",
            "Mindig használj interfészeket"
        ],
        correctAnswer: "Egy osztálynak egy felelőssége legyen",
        topic: "Tiszta kód"
    },
    {
        id: 36,
        question: "Melyik eszköz alkalmas egységtesztelésre JavaScript-ben?",
        options: [
            "Babel",
            "Photoshop",
            "Jest",
            "Webpack"
        ],
        correctAnswer: "Jest",
        topic: "Tesztelés"
    },
    {
        id: 37,
        question: "Melyik technológia NATÍV mobilalkalmazás fejlesztésére alkalmas?",
        options: [
            "Swift (iOS) / Kotlin (Android)",
            "Flutter",
            "React Native",
            "Mindhárom"
        ],
        correctAnswer: "Swift (iOS) / Kotlin (Android)",
        topic: "Mobil fejlesztés"
    },
    {
        id: 38,
        question: "Melyik WordPress alternatíva a legnépszerűbb?",
        options: [
            "Shopify",
            "Joomla",
            "Magento",
            "Drupal"
        ],
        correctAnswer: "Joomla",
        topic: "CMS"
    },
    {
        id: 39,
        question: "Melyik NEM csapatmunka eszköz?",
        options: [
            "Trello",
            "Photoshop",
            "GitHub",
            "Slack"
        ],
        correctAnswer: "Photoshop",
        topic: "Csoportmunkaeszközök"
    },
    {
        id: 40,
        question: "Mi a normalizálás fő célja adatbázis tervezésnél?",
        options: [
            "Biztonsági mentések egyszerűsítése",
            "Adatredundancia csökkentése",
            "Táblák számának növelése",
            "Lekérdezések gyorsítása"
        ],
        correctAnswer: "Adatredundancia csökkentése",
        topic: "Adatbázis-tervezés"
    },
    {
        id: 41,
        question: "Mit jelent a 'git stash' parancs?",
        options: [
            "Commit előzmények törlése",
            "Összes változtatás visszavonása",
            "Átmeneti változtatások elmentése",
            "Új távoli repository létrehozása"
        ],
        correctAnswer: "Átmeneti változtatások elmentése",
        topic: "Git"
    },
    {
        id: 42,
        question: "Mire szolgál a '.gitignore' fájl?",
        options: [
            "Git konfiguráció beállítására",
            "Commit üzenetek sablonjának tárolására",
            "Bizonyos fájlok figyelmen kívül hagyására",
            "Repository leírásának tárolására"
        ],
        correctAnswer: "Bizonyos fájlok figyelmen kívül hagyására",
        topic: "Git"
    },
    {
        id: 43,
        question: "Melyik CSS egység relatív a szülő elem betűméretéhez?",
        options: ["rem", "vw", "em", "px"],
        correctAnswer: "em",
        topic: "CSS3"
    },
    {
        id: 44,
        question: "Melyik HTML attribútum kötelező a kép elemeknél?",
        options: ["width", "src", "title", "alt"],
        correctAnswer: "alt",
        topic: "HTML5"
    },
    {
        id: 45,
        question: "Mit csinál a 'Array.prototype.map()' metódus?",
        options: [
            "Kiválogatja a megfelelő elemeket",
            "Visszaad egy új tömböt a megadott függvény alapján",
            "Megváltoztatja az eredeti tömböt",
            "Összegzi a tömb elemeit"
        ],
        correctAnswer: "Visszaad egy új tömböt a megadott függvény alapján",
        topic: "JavaScript"
    },
    {
        id: 46,
        question: "Mi az 'event bubbling' a JavaScript-ben?",
        options: [
            "Animációk létrehozása",
            "Események feljebb terjedése a DOM fában",
            "Memória felszabadítása",
            "Aszinkron kód végrehajtása"
        ],
        correctAnswer: "Események feljebb terjedése a DOM fában",
        topic: "JavaScript"
    },
    {
        id: 47,
        question: "Mi az absztrakció fő előnye az OOP-ban?",
        options: [
            "Kisebb memóriahasználat",
            "Komplexitás csökkentése",
            "Gyorsabb végrehajtás",
            "Kód újrafelhasználás"
        ],
        correctAnswer: "Komplexitás csökkentése",
        topic: "OOP"
    },
    {
        id: 48,
        question: "Melyik NEM OOP alapelv?",
        options: [
            "Függvényprogramozás",
            "Öröklődés",
            "Egységbezárás",
            "Polimorfizmus"
        ],
        correctAnswer: "Függvényprogramozás",
        topic: "OOP"
    },
    {
        id: 49,
        question: "Mire szolgál a GROUP BY záradék SQL-ben?",
        options: [
            "Oszlopok kiválasztására",
            "Adatok csoportosítására",
            "Táblák összekapcsolására",
            "Rekordok szűrésére"
        ],
        correctAnswer: "Adatok csoportosítására",
        topic: "SQL"
    },
    {
        id: 50,
        question: "Mi a különbség az INNER JOIN és LEFT JOIN között?",
        options: [
            "Egyik sem helyes",
            "LEFT JOIN minden sort visszaad a bal oldali táblából",
            "INNER JOIN csak egyező sorokat ad vissza",
            "Mindkettő helyes"
        ],
        correctAnswer: "Mindkettő helyes",
        topic: "SQL"
    },
  // Frontend frameworks (2 more)
  {
    id: 51,
    question: "Melyik React hook szolgál állapot kezelésére?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: "useState",
    topic: "Frontend keretrendszerek"
  },
  {
    id: 52,
    question: "Mire szolgál a Angular dependency injection?",
    options: [
      "Komponensek függőségeinek kezelésére",
      "Adatbázis kapcsolat létrehozására",
      "CSS stílusok injektálására",
      "HTTP kérések küldésére"
    ],
    correctAnswer: "Komponensek függőségeinek kezelésére",
    topic: "Frontend keretrendszerek"
  },

  // Backend frameworks (2 more)
  {
    id: 53,
    question: "Melyik NEM NoSQL adatbázis?",
    options: ["MongoDB", "PostgreSQL", "Cassandra", "Redis"],
    correctAnswer: "PostgreSQL",
    topic: "Backend keretrendszerek"
  },
  {
    id: 54,
    question: "Mire szolgál a JWT (JSON Web Token)?",
    options: [
      "Hitelesítésre és engedélyezésre",
      "Adatbázis séma létrehozására",
      "Képfájlok tömörítésére",
      "Frontend komponensek renderelésére"
    ],
    correctAnswer: "Hitelesítésre és engedélyezésre",
    topic: "Backend keretrendszerek"
  },

  // Clean code (1 more)
  {
    id: 55,
    question: "Mit jelent a KISS elv a tiszta kódban?",
    options: [
      "Keep It Simple, Stupid",
      "Keep It Secure, Safe",
      "Keep It Short, Simple",
      "Keep It Smart, Secure"
    ],
    correctAnswer: "Keep It Simple, Stupid",
    topic: "Tiszta kód"
  },

  // Testing (1 more)
  {
    id: 56,
    question: "Melyik típusú teszt Ellenőrzi az egész rendszert?",
    options: [
      "Egységteszt",
      "Integrációs teszt",
      "Rendszerteszt",
      "Felhasználói teszt"
    ],
    correctAnswer: "Rendszerteszt",
    topic: "Tesztelés"
  },

  // Mobile (1 more)
  {
    id: 57,
    question: "Melyik keretrendszer használ Dart programozási nyelvet?",
    options: ["React Native", "Flutter", "Xamarin", "Ionic"],
    correctAnswer: "Flutter",
    topic: "Mobil fejlesztés"
  },

  // CMS (1)
  {
    id: 58,
    question: "Melyik WordPress plugin biztosít e-kereskedelmi funkcionalitást?",
    options: ["WooCommerce", "Yoast SEO", "Akismet", "Jetpack"],
    correctAnswer: "WooCommerce",
    topic: "CMS"
  },

  // Teamwork tools (1)
  {
    id: 59,
    question: "Melyik eszköz alkalmas projektmenedzsmentre?",
    options: ["Jira", "Git", "Postman", "Webpack"],
    correctAnswer: "Jira",
    topic: "Csoportmunkaeszközök"
  },

  // Database design (1)
  {
    id: 60,
    question: "Mi a célja az indexeknek adatbázisban?",
    options: [
      "Lekérdezések gyorsítása",
      "Adatok biztonsági mentése",
      "Táblák összekapcsolása",
      "Adatok titkosítása"
    ],
    correctAnswer: "Lekérdezések gyorsítása",
    topic: "Adatbázis-tervezés"
  },
  // Software development life cycle (61)
{
  id: 61,
 question: `A szoftverfejlesztés életciklusa alapján melyik fázis illik a kérdőjelek (????) helyére?
Új igény
Igények, követelmények elemzése
Rendszerjavaslat kidolgozása
Specifikáció
Tervezés
Implementáció
????
Átadás, bevezetés
Üzemeltetés, karbantartás`,
  options: [
    "Felhasználói dokumentáció",
    "Szerződéskötés",
    "Tesztelés",
    "Rendszeres mentés"
  ],
  correctAnswer: "Tesztelés",
  topic: "Szoftverfejlesztés életciklusa"
},
// Git remote delete (62)
{
  id: 62,
  question: "A következő git parancsban melyik paraméter hiányozhat a kérdőjelek helyén? A parancs a távoli remote nevű tároló repository kapcsolatát törli.\ngit remote ??? origin",
  options: [
    "erase",
    "clear",
    "delete",
    "remove"
  ],
  correctAnswer: "remove",
  topic: "Csoportmunkaeszközök, Git"
},
// Android native development (63)
{
  id: 63,
  question: "Melyik technológia alkalmas natív alkalmazásfejlesztés megvalósítására Android operációs rendszer alatt?",
  options: [
    "Ionic + Angular.JS",
    "Kotlin Multiplatform Mobile",
    "React Native + Swift",
    "Xcode + Objective-C"
  ],
  correctAnswer: "Kotlin Multiplatform Mobile",
  topic: "Mobil alkalmazásfejlesztés"
},
// Git switch branch (64)
{
  id: 64,
  question: "Melyik git paranccsal tudunk az issue-68 nevű meglévő ágba (branch) váltani?",
  options: [
    "git checkout issue-68",
    "git load issue-68",
    "git switch issue-68",
    "git open issue-68"
  ],
  correctAnswer: "git checkout issue-68",
  topic: "Csoportmunkaeszközök, Git"
},
// Test pyramid base (65)
{
  id: 65,
  question: "Melyik tesztelési módszer (ami a legjobban automatizálható) van a tesztelési piramis alján?",
  options: [
    "Egységteszt",
    "Felhasználói felület teszt",
    "Integrációs teszt",
    "Manuális teszt"
  ],
  correctAnswer: "Egységteszt",
  topic: "Tesztelés"
},
// JavaScript function returns true (66)
{
  id: 66,
  question: "Melyik JavaScript függvényhívás tér vissza igaz értékkel a felsoroltak közül?\n  function foo3(str1, str2) return str1.length == str2.length && (str1 + str1).indexOf(str2) != -1",
  options: [
    "foo3('BMI', 'IBM')",
    "foo3('RSB', 'SBS')",
    "foo3('ABC', 'DBA')",
    "foo3('ABC', 'CBA')"
  ],
  correctAnswer: "foo3('BMI', 'IBM')",
  topic: "JavaScript, ECMAScript"
},
// Foreign key definition (67)
{
  id: 67,
  question: "Melyik angol nyelvű fogalomra illik az alábbi definíció az adatbázis-kezelésben?\nOlyan mező, amelynek segítségével logikai kapcsolatot tudunk létrehozni egy másik tábla elsődleges kulcsával.",
  options: [
    "foreign key",
    "unique key",
    "primary key",
    "secondary key"
  ],
  correctAnswer: "foreign key",
  topic: "Adatbázis-tervezés, adatbázis-kezelés, SQL"
},
// Property definition in OOP (68)
{
  id: 68,
  question: "Melyik osztálytagtípus definícióját olvashatja?\nOlyan speciális osztályelem, amely bár kifejezésekben és műveletekben mező ill. változó módjára viselkedik, olvasása és írása esetében azonban memóriaterületek közvetlen írása helyett a deklarálásakor meghatározott olvasó (getter) és/vagy író (setter) metódusok kerülnek meghívásra.",
  options: [
    "konstruktor",
    "statikus metódus",
    "jellemző",
    "dinamikus metódus"
  ],
  correctAnswer: "jellemző",
  topic: "Objektum Orientált Programozás (OOP)"
},
// Liskov principle (69)
{
  id: 69,
  question: "Melyik tiszta kód alapelvhez kapcsolható a következő leírás?\nMinden osztály legyen helyettesíthető a leszármazott osztályával anélkül, hogy a program helyes működése megváltozna.",
  options: [
    "Karpinski helyettesítési elv",
    "Liskov helyettesítési elv",
    "Turing helyettesítési elv",
    "Huffman helyettesítési elv"
  ],
  correctAnswer: "Liskov helyettesítési elv",
  topic: "Tiszta kód alapelvek"
},
// Drupal CMS (70)
{
  id: 70,
  question: "Igaz-e az állítás?\nA Drupal egy ingyenes, nyílt forráskódú tartalomkezelő rendszer.",
  options: [
    "Hamis, mert nem ingyenes.",
    "Hamis, mert nem tartalomkezelő rendszer.",
    "Igaz.",
    "Hamis, mert nem nyílt forráskódú."
  ],
  correctAnswer: "Igaz.",
  topic: "Tartalomkezelő rendszerek (CMS)"
},
// CSS shorthand property (71)
{
  id: 71,
  question: "Melyik CSS tulajdonság úgynevezett \"shorthand property\" a felsoroltak közül?",
  options: [
    "font-size",
    "margin-top",
    "width",
    "border"
  ],
  correctAnswer: "border",
  topic: "HTML5, CSS3"
},
// SQL WHERE clause (72)
{
  id: 72,
  question: "Melyik SQL záradék hiányozhat a kérdőjelek (???) helyén?\nUPDATE myTable SET c=c+1 ??? a=1;",
  options: [
    "IF",
    "WHERE",
    "FROM",
    "WHEN"
  ],
  correctAnswer: "WHERE",
  topic: "Adatbázis-tervezés, adatbázis-kezelés, SQL"
},
// PHP framework not among (73)
{
  id: 73,
  question: "Melyik nem PHP keretrendszer az alábbiak közül?",
  options: [
    "Symfony",
    "Zend Framework",
    "Laravel",
    "Backbone"
  ],
  correctAnswer: "Backbone",
  topic: "Backend készítésre szolgáló nyelvek és keretrendszerek"
},
// Invalid method name (74)
{
  id: 74,
  question: "Melyik nem megfelelő metódusnév (azonosító) a tiszta kód alapelvei szerint?",
  options: [
    "upgradeLastName()",
    "setFirstName()",
    "maidenName()",
    "getName()"
  ],
  correctAnswer: "maidenName()",
  topic: "Tiszta kód alapelvek"
},
// MVC pattern (75)
{
  id: 75,
  question: "Melyik népszerű tervezési minta angol (illetve magyar) nyelvű rövidítése illik a kérdőjelek (????) helyére?\nA(z) ???? a szoftverfejlesztésben használatos programtervezési minta. Elkülöníti az adatok elérését és az üzleti logikát az adatok megjelenítésétől és a felhasználói interakciótól egy közbülső összetevő, a vezérlő bevezetésével.",
  options: [
    "SSH (BiH)",
    "GUI (Gfi)",
    "MVC (MNV)",
    "API (APF)"
  ],
  correctAnswer: "MVC (MNV)",
  topic: "Frontend készítésre szolgáló JavaScript keretrendszerek"
},
// HTTP Accept-Encoding header (76)
{
  id: 76,
  question: "Melyik HTTP fejlécmezőnek adhatók a következő értékek: gzip, deflate ?",
  options: [
    "Content-Type",
    "Cache-Control",
    "Accept-Charset",
    "Accept-Encoding"
  ],
  correctAnswer: "Accept-Encoding",
  topic: "Backend készítésre szolgáló nyelvek és keretrendszerek"
},
// JavaScript loop condition (77)
{
  id: 77,
  question: `Mit kell írni a kérdőjelek (???) helyére a JavaScript függvényben, hogy az arab számot római számra váltó függvény helyesen működjön?

function arabToRoman(number)
{
    let dec = [1,4,5,9,10,40,50,90,100,400,500,900,1000]
    let rom = ['I','IV','V','IX','X','XL','L','XC','C','CD','D','CM','M']
    let i = rom.length - 1
    let roman = ''
    while(number > 0) {
        let x = Math.floor(number / dec[i])
        number = number % dec[i]
        while( ??? ) roman = roman + rom[i]
        i--
    }
    return roman
}`,
  options: [
    "i > 0",
    "i >= 0",
    "x++",
    "x--"
  ],
  correctAnswer: "x--",
  topic: "JavaScript, ECMAScript"
},

// JavaScript frontend framework (78)
{
  id: 78,
  question: "Melyik JavaScript frontend keretrendszer a felsoroltak közül?",
  options: [
    "React",
    "Mongoose",
    "Swing",
    "Axios"
  ],
  correctAnswer: "React",
  topic: "Frontend készítésre szolgáló JavaScript keretrendszerek"
},
// CSS border-radius (79)
{
  id: 79,
  question: "Melyik CSS jellemző segítségével lehet lekerekített szegélyt létrehozni?",
  options: [
    "border-rounded",
    "border-radius",
    "rounded",
    "radius"
  ],
  correctAnswer: "border-radius",
  topic: "HTML5, CSS3"
},
// Java object (80)
{
  id: 80,
  question: "Mi jellemzi az alábbi kódrészletben a  dog  azonosítójú változót?\n```java\npublic class Dog {\n    String name;\n    int age;\n}\nDog dog = new Dog();\n```",
  options: [
    "Dinamikus objektum",
    "Statikus objektum",
    "Dinamikus osztály",
    "Statikus osztály"
  ],
  correctAnswer: "Dinamikus objektum",
  topic: "Java"
},

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

{
  id: 81,
  question: "Mi a célja a 'git rebase' parancsnak a 'git merge'-vel szemben?",
  options: [
    "Lineáris commit történet létrehozása",
    "Különálló ágak létrehozása",
    "Távoli repository szinkronizálása",
    "Commitok összevonása"
  ],
  correctAnswer: "Lineáris commit történet létrehozása",
  topic: "GitHub"
},
{
  id: 82,
  question: "Hogyan lehet egy lokális ágat követni a távoli ággal?",
  options: [
    "git track origin/branch",
    "git branch --set-upstream-to=origin/branch",
    "git follow origin/branch",
    "git sync branch"
  ],
  correctAnswer: "git branch --set-upstream-to=origin/branch",
  topic: "GitHub"
},
{
  id: 83,
  question: "Mit csinál a 'git cherry-pick' parancs?",
  options: [
    "Kiválasztott commitok másolása egy másik ágra",
    "Törli a nem kötelező commitokat",
    "Frissíti a HEAD referenciát",
    "Keresés commit üzenetekben"
  ],
  correctAnswer: "Kiválasztott commitok másolása egy másik ágra",
  topic: "GitHub"
},
{
  id: 84,
  question: "Mi a GitHub Actions fő célja?",
  options: [
    "Kód tárolása",
    "Automatizált CI/CD folyamatok",
    "Issue követés",
    "Pull request kezelés"
  ],
  correctAnswer: "Automatizált CI/CD folyamatok",
  topic: "GitHub"
},
{
  id: 85,
  question: "Hogyan lehet egy konfliktust feloldani Git-ben?",
  options: [
    "A konfliktusos fájlok manuális szerkesztése után commit",
    "git resolve parancs használata",
    "git ignore conflict parancs használata",
    "Mindhárom módszer helyes"
  ],
  correctAnswer: "A konfliktusos fájlok manuális szerkesztése után commit",
  topic: "GitHub"
},
{
  id: 86,
  question: "Mi a React Router createBrowserRouter függvényének fő célja?",
  options: [
    "Állapot kezelése",
    "Útvonalak definiálása és navigáció kezelése",
    "Komponensek renderelése",
    "API hívások kezelése"
  ],
  correctAnswer: "Útvonalak definiálása és navigáció kezelése",
  topic: "Frontend"
},
{
  id: 87,
  question: "Mi történik, ha egy async függvényben nem kezeljük a fetch hiba esetét?",
  options: [
    "A kód automatikusan újrapróbálkozik",
    "Nem keletkezik hiba",
    "A Promise rejected állapotba kerül",
    "A böngésző összeomlik"
  ],
  correctAnswer: "A Promise rejected állapotba kerül",
  topic: "Frontend"
},
{
  id: 88,
  question: "Melyik a leginkább ajánlott módja egy input mező értékének kezelésére React-ben úgy hogy a value is változzon!",
  options: [
    "document.getElementById() használatával",
    "useRef hookkal",
    "useState hookkal és onChange eseménykezelővel",
    "Mindhárom módszer helyes"
  ],
  correctAnswer: "useState hookkal és onChange eseménykezelővel",
  topic: "Frontend"
},
{
  id: 89,
  question: "Mi a célja a Link komponensnek a React Router-ben?",
  options: [
    "Külső hivatkozások létrehozása",
    "Oldalak közötti navigáció SPA környezetben",
    "API végpontok csatolása",
    "CSS stílusok alkalmazása"
  ],
  correctAnswer: "Oldalak közötti navigáció SPA környezetben",
  topic: "Frontend"
},
{
  id: 90,
  question: "Mi az előnye a React komponens alapú architektúrának?",
  options: [
    "Újrahasználható kód egységek",
    "Jobb teljesítmény minden esetben",
    "Kisebb bundle méret",
    "Egyszerűbb backend integráció"
  ],
  correctAnswer: "Újrahasználható kód egységek",
  topic: "Frontend"
},
{
  id: 91,
  question: "Mi a Scanner osztály fő célja Java-ban?",
  options: [
    "Adat kiírása a konzolra",
    "Adat beolvasása különböző forrásokból",
    "Fájlok törlése",
    "Hálózati kapcsolat létesítése"
  ],
  correctAnswer: "Adat beolvasása különböző forrásokból",
  topic: "Konzol Java"
},
{
  id: 92,
  question: "Hogyan lehet egy ArrayList-ből eltávolítani ismétlődő elemeket?",
  options: [
    "HashSet használatával",
    "Második ArrayList létrehozásával",
    "Kézi iterációval és összehasonlítással",
    "Mindhárom módszer helyes"
  ],
  correctAnswer: "HashSet használatával",
  topic: "Konzol Java"
},
{
  id: 93,
  question: "Mi a PrintWriter osztály előnye a System.out-hoz képest?",
  options: [
    "Karakterkódolás támogatása",
    "Gyorsabb kiírás",
    "Automatikus formázás",
    "Több adattípus támogatása"
  ],
  correctAnswer: "Karakterkódolás támogatása",
  topic: "Konzol Java"
},
{
  id: 94,
  question: "Hogyan lehet egy fájl sorait beolvasni Java-ban?",
  options: [
    "Scanner hasNextLine() és nextLine() metódusokkal",
    "FileInputStream direkt használatával",
    "System.in.read() metódussal",
    "Console.readLine() metódussal"
  ],
  correctAnswer: "Scanner hasNextLine() és nextLine() metódusokkal",
  topic: "Konzol Java"
},
{
  id: 95,
  question: "Mi a try-with-resources szerkezet előnye Java-ban?",
  options: [
    "Automatikus erőforrás lezárás",
    "Gyorsabb kódvégrehajtás",
    "Kisebb memóriahasználat",
    "Egyszerűbb szintaxis"
  ],
  correctAnswer: "Automatikus erőforrás lezárás",
  topic: "Konzol Java"
},
{
  id: 96,
  question: "Mi az FXML fájl szerepe JavaFX-ben?",
  options: [
    "Üzleti logika tárolása",
    "Felhasználói felület definiálása",
    "Adatbázis kapcsolat kezelése",
    "Konfigurációs beállítások tárolása"
  ],
  correctAnswer: "Felhasználói felület definiálása",
  topic: "Grafikus Java"
},
{
  id: 97,
  question: "Mi a FileChooser osztály fő célja?",
  options: [
    "Fájlok megnyitása és mentése párbeszédablakban",
    "Fájlok törlése",
    "Fájlok átnevezése",
    "Könyvtárstruktúra létrehozása"
  ],
  correctAnswer: "Fájlok megnyitása és mentése párbeszédablakban",
  topic: "Grafikus Java"
},
{
  id: 98,
  question: "Hogyan lehet egy eseménykezelőt hozzárendelni egy gombhoz JavaFX-ben?",
  options: [
    "setOnAction metódussal",
    "addEventListener metódussal",
    "setOnClick metódussal",
    "bindEvent metódussal"
  ],
  correctAnswer: "setOnAction metódussal",
  topic: "Grafikus Java"
},
{
  id: 99,
  question: "Mi az Alert osztály célja JavaFX-ben?",
  options: [
    "Adatok megjelenítése táblázatban",
    "Párbeszédablakok megjelenítése felhasználónak",
    "Háttérfolyamatok kezelése",
    "Animációk létrehozása"
  ],
  correctAnswer: "Párbeszédablakok megjelenítése felhasználónak",
  topic: "Grafikus Java"
},
{
  id: 100,
  question: "Hogyan lehet egy ListView tartalmát frissíteni JavaFX-ben?",
  options: [
    "getItems().clear() majd getItems().addAll()",
    "setContent() metódussal",
    "refresh() metódussal",
    "updateItems() metódussal"
  ],
  correctAnswer: "getItems().clear() majd getItems().addAll()",
  topic: "Grafikus Java"
},
{
  id: 101,
  question: "Mi a célja a Tailwind CSS utility osztályainak?",
  options: [
    "Előre definiált komponensek",
    "Gyors, inline-szerű stílusozás",
    "JavaScript funkcionalitás",
    "Adatbázis kapcsolat"
  ],
  correctAnswer: "Gyors, inline-szerű stílusozás",
  topic: "Tailwind CSS"
},
{
  id: 102,
  question: "Hogyan lehet egy elem szélességét 100%-ra állítani Tailwind-ben?",
  options: [
    "w-full",
    "w-100",
    "width-full",
    "w-screen"
  ],
  correctAnswer: "w-full",
  topic: "Tailwind CSS"
},
{
  id: 103,
  question: "Melyik media query szabály felelős a mobil eszközök érzékeléséért?",
  options: [
    "@media (max-width: 768px)",
    "@media (mobile)",
    "@media (portrait)",
    "@media (touch)"
  ],
  correctAnswer: "@media (max-width: 768px)",
  topic: "Reszponzív weboldal"
},
{
  id: 104,
  question: "Mi a flexbox fő előnye a float-hoz képest?",
  options: [
    "Egyszerűbb elrendezés-vezérlés",
    "Jobb böngésző támogatás",
    "Kisebb CSS fájlméret",
    "Gyorsabb renderelés"
  ],
  correctAnswer: "Egyszerűbb elrendezés-vezérlés",
  topic: "CSS"
},
{
  id: 105,
  question: "Hogyan lehet egy elem középre igazítani vízszintesen Tailwind-ben?",
  options: [
    "mx-auto",
    "text-center",
    "center",
    "align-center"
  ],
  correctAnswer: "mx-auto",
  topic: "Tailwind CSS"
},
{
  id: 106,
  question: "Mi a middleware szerepe Express.js-ben?",
  options: [
    "Kérések és válaszok feldolgozása",
    "Adatbázis séma létrehozása",
    "Frontend komponensek renderelése",
    "Konfigurációs beállítások tárolása"
  ],
  correctAnswer: "Kérések és válaszok feldolgozása",
  topic: "Backend"
},
{
  id: 107,
  question: "Hogyan lehet egy POST kérés törzsét elérni Express.js-ben?",
  options: [
    "req.query",
    "req.body",
    "req.params",
    "req.headers"
  ],
  correctAnswer: "req.body",
  topic: "Backend"
},
{
  id: 108,
  question: "Mi a CORS fő célja?",
  options: [
    "Adatbázis biztonság",
    "Kereszt-tartományú kérések engedélyezése",
    "Felhasználói hitelesítés",
    "Adattitkosítás"
  ],
  correctAnswer: "Kereszt-tartományú kérések engedélyezése",
  topic: "Backend"
},
{
  id: 109,
  question: "Hogyan lehet egy adatbázis lekérdezést kezelni aszinkron módon?",
  options: [
    "Promise vagy async/await használatával",
    "Callback függvényekkel",
    "Mindkét módszer helyes",
    "Egyik módszer sem helyes"
  ],
  correctAnswer: "Mindkét módszer helyes",
  topic: "Backend"
},
{
  id: 110,
  question: "Mi a REST API fő jellemzője?",
  options: [
    "Állapotmentesség",
    "Csak JSON válaszok",
    "Kötelező hitelesítés",
    "GraphQL kompatibilitás"
  ],
  correctAnswer: "Állapotmentesség",
  topic: "Backend"
}
];
