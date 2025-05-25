import React, { useState, useEffect } from 'react';

const allQuestions  = [
    // Git questions
    {
        id: 1,
        question: "Mi a Git legfontosabb előnye a verziókövetés terén?",
        options: ["Könnyű felhasználói felület", "Elosztott verziókövetés", "Automatikus biztonsági mentések", "Csak lokálisan működik"],
        correctAnswer: "Elosztott verziókövetés",
        topic: "Git"
    },
    {
        id: 2,
        question: "Mire szolgál a `git clone` parancs?",
        options: ["Egy új ág létrehozására", "Távoli repository másolására", "Változtatások visszavonására", "Commitok összehasonlítására"],
        correctAnswer: "Távoli repository másolására",
        topic: "Git"
    },
    {
        id: 3,
        question: "Hogyan lehet egy fájlt hozzáadni a staging area-hoz Git-ben?",
        options: ["git commit", "git push", "git add", "git init"],
        correctAnswer: "git add",
        topic: "Git"
    },

    // HTML/CSS questions (3)
    {
        id: 4,
        question: "Melyik HTML elem felelős a legfőbb tartalomért egy oldalon?",
        options: ["<header>", "<footer>", "<main>", "<nav>"],
        correctAnswer: "<main>",
        topic: "HTML5"
    },
    {
        id: 5,
        question: "Mire való a CSS `flexbox`?",
        options: ["Animációk létrehozására", "Reszponzív elrendezés kialakítására", "Adatbázis-kapcsolatra", "JavaScript kód írására"],
        correctAnswer: "Reszponzív elrendezés kialakítására",
        topic: "CSS3"
    },
    {
        id: 6,
        question: "Mi a `media query` szerepe CSS-ben?",
        options: ["Képernyőméret alapján stílusok alkalmazása", "Hangfájlok lejátszása", "Űrlapok validálása", "JavaScript események kezelése"],
        correctAnswer: "Képernyőméret alapján stílusok alkalmazása",
        topic: "CSS3"
    },

    // JavaScript questions (3)
    {
        id: 7,
        question: "Melyik kulcsszóval deklarálunk egy változót, ami később módosítható?",
        options: ["const", "let", "var", "static"],
        correctAnswer: "let",
        topic: "JavaScript"
    },
    {
        id: 8,
        question: "Mi lesz a kimenet? `console.log(2 + '2')`",
        options: ["4", "'22'", "NaN", "Hiba"],
        correctAnswer: "'22'",
        topic: "JavaScript"
    },
    {
        id: 9,
        question: "Melyik metódus tömb elemeinek összegzésére szolgál?",
        options: ["array.map()", "array.reduce()", "array.filter()", "array.forEach()"],
        correctAnswer: "array.reduce()",
        topic: "JavaScript"
    },

    // OOP questions (2)
    {
        id: 10,
        question: "Mi az osztály alapvető építőeleme az OOP-ban?",
        options: ["Függvények", "Objektumok", "Tulajdonságok és metódusok", "Minden fenti válasz helyes"],
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
            "Don't Repeat Yourself",
            "Do Repeat Yourself",
            "Dynamic Resource Yielding",
            "Data Retrieval Yield"
        ],
        correctAnswer: "Don't Repeat Yourself",
        topic: "Tiszta kód"
    },

    // Testing (1)
    {
        id: 19,
        question: "Melyik NEM szoftvertesztelési típus?",
        options: [
            "Egységtesztelés",
            "Integrációs tesztelés",
            "Felhasználói tesztelés",
            "Végleges tesztelés"
        ],
        correctAnswer: "Végleges tesztelés",
        topic: "Tesztelés"
    },

    // Mobile (1)
    {
        id: 20,
        question: "Melyik keretrendszer alkalmas mobilalkalmazás fejlesztésre?",
        options: [
            "React Native",
            "Flutter",
            "Ionic",
            "Mindhárom"
        ],
        correctAnswer: "Mindhárom",
        topic: "Mobil fejlesztés"
    },
    {
        id: 21,
        question: "Mit jelent a 'fork' a GitHub-on?",
        options: [
            "Repository másolása egy személyes fiókba",
            "Branch létrehozása",
            "Commit összevonása",
            "Projekt archiválása"
        ],
        correctAnswer: "Repository másolása egy személyes fiókba",
        topic: "Git"
    },
    {
        id: 22,
        question: "Mire szolgál a 'git rebase' parancs?",
        options: [
            "Commit előzmények átrendezésére",
            "Fájlok törlésére",
            "Távoli repository frissítésére",
            "Konfliktusok feloldására"
        ],
        correctAnswer: "Commit előzmények átrendezésére",
        topic: "Git"
    },

    // HTML5/CSS3 (2 more)
    {
        id: 23,
        question: "Melyik HTML5 elem felelős a videó tartalom beágyazásáért?",
        options: [
            "<media>",
            "<video>",
            "<embed>",
            "<movie>"
        ],
        correctAnswer: "<video>",
        topic: "HTML5"
    },
    {
        id: 24,
        question: "Mire szolgál a CSS 'grid-template-areas' tulajdonság?",
        options: [
            "Animációk időzítésére",
            "Reszponzív képek létrehozására",
            "Oldalelrendezés tervezésére",
            "Betűtípusok beállítására"
        ],
        correctAnswer: "Oldalelrendezés tervezésére",
        topic: "CSS3"
    },

    // JavaScript (2 more)
    {
        id: 25,
        question: "Mit csinál a 'use strict' mód JavaScript-ben?",
        options: [
            "Engedélyezi a laza szintaxis használatát",
            "Szigorúbb szintaxis-ellenőrzést vezet be",
            "Letiltja az összes hibakezelést",
            "Gyorsabb kódvégrehajtást biztosít"
        ],
        correctAnswer: "Szigorúbb szintaxis-ellenőrzést vezet be",
        topic: "JavaScript"
    },
    {
        id: 26,
        question: "Mi az ES6 modul rendszer fő előnye?",
        options: [
            "Kód újrafelhasználás",
            "Globális változók használata",
            "Automatikus minifikáció",
            "CSS integráció"
        ],
        correctAnswer: "Kód újrafelhasználás",
        topic: "JavaScript"
    },

    // OOP (2 more)
    {
        id: 27,
        question: "Mit jelent az egységbezárás (encapsulation) az OOP-ban?",
        options: [
            "Adatok és metódusok egy egységbe zárása",
            "Osztályok elrejtése",
            "Függvények láncolása",
            "Memóriafoglalás optimalizálása"
        ],
        correctAnswer: "Adatok és metódusok egy egységbe zárása",
        topic: "OOP"
    },
    {
        id: 28,
        question: "Mi a polimorfizmus fő előnye?",
        options: [
            "Ugyanaz a metódus különböző viselkedést mutathat",
            "Gyorsabb kódvégrehajtás",
            "Kisebb memóriahasználat",
            "Egyszerűbb debugolás"
        ],
        correctAnswer: "Ugyanaz a metódus különböző viselkedést mutathat",
        topic: "OOP"
    },

    // SQL (2 more)
    {
        id: 29,
        question: "Mire szolgál a JOIN művelet SQL-ben?",
        options: [
            "Táblák összekapcsolására",
            "Adatok törlésére",
            "Rekordok sorrendezésére",
            "Oszlopok átnevezésére"
        ],
        correctAnswer: "Táblák összekapcsolására",
        topic: "SQL"
    },
    {
        id: 30,
        question: "Mi a különbség a PRIMARY KEY és a FOREIGN KEY között?",
        options: [
            "PRIMARY KEY egyedi azonosító, FOREIGN KEY kapcsolatot létesít",
            "Nincs különbség",
            "FOREIGN KEY csak számokat tartalmazhat",
            "PRIMARY KEY nem lehet NULL"
        ],
        correctAnswer: "PRIMARY KEY egyedi azonosító, FOREIGN KEY kapcsolatot létesít",
        topic: "SQL"
    },

    // Frontend frameworks (2 more)
    {
        id: 31,
        question: "Melyik állítás igaz a React komponensekre?",
        options: [
            "Mindig osztály komponensek",
            "Állapotot (state) tarthatnak",
            "Nem lehetnek újrahasznosíthatók",
            "Csak JavaScriptben írhatók"
        ],
        correctAnswer: "Állapotot (state) tarthatnak",
        topic: "Frontend keretrendszerek"
    },
    {
        id: 32,
        question: "Mire szolgál a Vue.js 'v-model' direktívája?",
        options: [
            "Kétirányú adatkötés létrehozására",
            "CSS stílusok alkalmazására",
            "HTTP kérések küldésére",
            "Animációk indítására"
        ],
        correctAnswer: "Kétirányú adatkötés létrehozására",
        topic: "Frontend keretrendszerek"
    },

    // Backend frameworks (2 more)
    {
        id: 33,
        question: "Melyik NEM Node.js keretrendszer?",
        options: [
            "Express",
            "Django",
            "Koa",
            "Fastify"
        ],
        correctAnswer: "Django",
        topic: "Backend keretrendszerek"
    },
    {
        id: 34,
        question: "Mire szolgál az ORM (Object-Relational Mapping)?",
        options: [
            "Adatbázis objektumok és programkód közötti leképezés",
            "Képfájlok tömörítése",
            "Frontend komponensek renderelése",
            "Hálózati kommunikáció optimalizálása"
        ],
        correctAnswer: "Adatbázis objektumok és programkód közötti leképezés",
        topic: "Backend keretrendszerek"
    },

    // Clean code (1 more)
    {
        id: 35,
        question: "Mi a SOLID elv első betűjének (Single Responsibility) jelentése?",
        options: [
            "Egy osztálynak egy felelőssége legyen",
            "Mindig használj interfészeket",
            "Metódusok legyenek rövidek",
            "Ne használj globális változókat"
        ],
        correctAnswer: "Egy osztálynak egy felelőssége legyen",
        topic: "Tiszta kód"
    },

    // Testing (1 more)
    {
        id: 36,
        question: "Melyik eszköz alkalmas egységtesztelésre JavaScript-ben?",
        options: [
            "Jest",
            "Photoshop",
            "Webpack",
            "Babel"
        ],
        correctAnswer: "Jest",
        topic: "Tesztelés"
    },

    // Mobile (1 more)
    {
        id: 37,
        question: "Melyik technológia NATÍV mobilalkalmazás fejlesztésére alkalmas?",
        options: [
            "React Native",
            "Flutter",
            "Swift (iOS) / Kotlin (Android)",
            "Mindhárom"
        ],
        correctAnswer: "Swift (iOS) / Kotlin (Android)",
        topic: "Mobil fejlesztés"
    },

    // CMS (1)
    {
        id: 38,
        question: "Melyik WordPress alternatíva a legnépszerűbb?",
        options: [
            "Joomla",
            "Drupal",
            "Shopify",
            "Magento"
        ],
        correctAnswer: "Joomla",
        topic: "CMS"
    },

    // Teamwork tools (1)
    {
        id: 39,
        question: "Melyik NEM csapatmunka eszköz?",
        options: [
            "Slack",
            "Trello",
            "GitHub",
            "Photoshop"
        ],
        correctAnswer: "Photoshop",
        topic: "Csoportmunkaeszközök"
    },

    // Database design (1)
    {
        id: 40,
        question: "Mi a normalizálás fő célja adatbázis tervezésnél?",
        options: [
            "Adatredundancia csökkentése",
            "Lekérdezések gyorsítása",
            "Táblák számának növelése",
            "Biztonsági mentések egyszerűsítése"
        ],
        correctAnswer: "Adatredundancia csökkentése",
        topic: "Adatbázis-tervezés"
    },
      {
    id: 41,
    question: "Mit jelent a 'git stash' parancs?",
    options: [
      "Átmeneti változtatások elmentése",
      "Új távoli repository létrehozása",
      "Commit előzmények törlése",
      "Összes változtatás visszavonása"
    ],
    correctAnswer: "Átmeneti változtatások elmentése",
    topic: "Git"
  },
  {
    id: 42,
    question: "Mire szolgál a '.gitignore' fájl?",
    options: [
      "Repository leírásának tárolására",
      "Bizonyos fájlok figyelmen kívül hagyására",
      "Git konfiguráció beállítására",
      "Commit üzenetek sablonjának tárolására"
    ],
    correctAnswer: "Bizonyos fájlok figyelmen kívül hagyására",
    topic: "Git"
  },

  // HTML5/CSS3 (2 more)
  {
    id: 43,
    question: "Melyik CSS egység relatív a szülő elem betűméretéhez?",
    options: ["px", "em", "rem", "vw"],
    correctAnswer: "em",
    topic: "CSS3"
  },
  {
    id: 44,
    question: "Melyik HTML attribútum kötelező a kép elemeknél?",
    options: ["src", "alt", "title", "width"],
    correctAnswer: "alt",
    topic: "HTML5"
  },

  // JavaScript (2 more)
  {
    id: 45,
    question: "Mit csinál a 'Array.prototype.map()' metódus?",
    options: [
      "Visszaad egy új tömböt a megadott függvény alapján",
      "Kiválogatja a megfelelő elemeket",
      "Összegzi a tömb elemeit",
      "Megváltoztatja az eredeti tömböt"
    ],
    correctAnswer: "Visszaad egy új tömböt a megadott függvény alapján",
    topic: "JavaScript"
  },
  {
    id: 46,
    question: "Mi az 'event bubbling' a JavaScript-ben?",
    options: [
      "Események feljebb terjedése a DOM fában",
      "Aszinkron kód végrehajtása",
      "Memória felszabadítása",
      "Animációk létrehozása"
    ],
    correctAnswer: "Események feljebb terjedése a DOM fában",
    topic: "JavaScript"
  },

  // OOP (2 more)
  {
    id: 47,
    question: "Mi az absztrakció fő előnye az OOP-ban?",
    options: [
      "Komplexitás csökkentése",
      "Kód újrafelhasználás",
      "Gyorsabb végrehajtás",
      "Kisebb memóriahasználat"
    ],
    correctAnswer: "Komplexitás csökkentése",
    topic: "OOP"
  },
  {
    id: 48,
    question: "Melyik NEM OOP alapelv?",
    options: [
      "Egységbezárás",
      "Polimorfizmus",
      "Öröklődés",
      "Függvényprogramozás"
    ],
    correctAnswer: "Függvényprogramozás",
    topic: "OOP"
  },

  // SQL (2 more)
  {
    id: 49,
    question: "Mire szolgál a GROUP BY záradék SQL-ben?",
    options: [
      "Adatok csoportosítására",
      "Táblák összekapcsolására",
      "Rekordok szűrésére",
      "Oszlopok kiválasztására"
    ],
    correctAnswer: "Adatok csoportosítására",
    topic: "SQL"
  },
  {
    id: 50,
    question: "Mi a különbség az INNER JOIN és LEFT JOIN között?",
    options: [
      "LEFT JOIN minden sort visszaad a bal oldali táblából",
      "INNER JOIN csak egyező sorokat ad vissza",
      "Mindkettő helyes",
      "Egyik sem helyes"
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
  question: "A szoftverfejlesztés életciklusa alapján melyik fázis illik a kérdőjelek (????) helyére?",
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
  correctAnswer: "git switch issue-68",
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
  question: "Melyik JavaScript függvényhívás tér vissza igaz értékkel a felsoroltak közül?",
  options: [
    "foo3('BMI', 'IBM')",
    "foo3('RSB', 'SBS')",
    "foo3('ABC', 'DBA')",
    "foo3('ABC', 'CBA')"
  ],
  correctAnswer: "foo3('ABC', 'CBA')",
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
  question: "Mit kell írni a kérdőjelek (???) helyére a JavaScript függvényben, hogy az arab számot római számra váltó függvény helyesen működjön?",
  options: [
    "i > 0",
    "i >= 0",
    "x++",
    "x--"
  ],
  correctAnswer: "i > 0",
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
// JavaScript closure (81)
{
  id: 81,
  question: "Mit jelent a 'closure' (lezárás) fogalma JavaScript-ben?",
  options: [
    "Egy olyan függvény, amely lezárja a programot hiba esetén.",
    "Egy függvény, amely hozzáfér a külső függvény változóihoz annak végrehajtása után is.",
    "Egy olyan szintaktikai hiba, amit a for ciklus okoz.",
    "Egy olyan metódus, amely bezárja az objektumot."
  ],
  correctAnswer: "Egy függvény, amely hozzáfér a külső függvény változóihoz annak végrehajtása után is.",
  topic: "JavaScript, ECMAScript"
},

// REST API HTTP method (82)
{
  id: 82,
  question: "Melyik HTTP metódust használjuk egy erőforrás létrehozására REST API-ban?",
  options: [
    "GET",
    "POST",
    "PUT",
    "DELETE"
  ],
  correctAnswer: "POST",
  topic: "Webfejlesztés, REST API"
},

// SQL JOIN types (83)
{
  id: 83,
  question: "Melyik SQL JOIN típus ad vissza minden sort mindkét táblából, ha van egyezés, ha nincs?",
  options: [
    "INNER JOIN",
    "LEFT JOIN",
    "RIGHT JOIN",
    "FULL OUTER JOIN"
  ],
  correctAnswer: "FULL OUTER JOIN",
  topic: "Adatbázis-kezelés, SQL"
},

// Git staging area (84)
{
  id: 84,
  question: "Melyik git parancs helyezi a változtatásokat a staging area-ba?",
  options: [
    "git push",
    "git commit",
    "git stage",
    "git add"
  ],
  correctAnswer: "git add",
  topic: "Csoportmunkaeszközök, Git"
},

// OOP polymorphism (85)
{
  id: 85,
  question: "Mit jelent az öröklődésből származó polimorfizmus az OOP-ben?",
  options: [
    "Egy változó több értéket tárol egyszerre.",
    "Egy metódus több viselkedést valósít meg különböző objektumokon keresztül.",
    "Egy osztály örökli a privát adattagokat más osztályból.",
    "Több osztály örököl ugyanabból a metódusból egyszerre."
  ],
  correctAnswer: "Egy metódus több viselkedést valósít meg különböző objektumokon keresztül.",
  topic: "Objektum Orientált Programozás (OOP)"
},

// HTML5 semantic tags (86)
{
  id: 86,
  question: "Melyik HTML5 elem tekinthető szemantikusnak?",
  options: [
    "<div>",
    "<section>",
    "<span>",
    "<br>"
  ],
  correctAnswer: "<section>",
  topic: "HTML5, CSS3"
},

// CSS Flexbox alignment (87)
{
  id: 87,
  question: "Melyik CSS tulajdonsággal lehet Flexbox konténeren belül középre igazítani a tartalmat főtengely mentén?",
  options: [
    "align-items: center;",
    "text-align: center;",
    "justify-content: center;",
    "vertical-align: middle;"
  ],
  correctAnswer: "justify-content: center;",
  topic: "HTML5, CSS3"
},

// Design patterns - Singleton (88)
{
  id: 88,
  question: "Mi jellemzi a Singleton tervezési mintát?",
  options: [
    "Egy osztályból egyszerre több példány létezhet.",
    "A példányosítás minden metódushíváskor megtörténik.",
    "Egy osztályból csak egy példány létezhet.",
    "Több különböző osztály közös ősosztályból származik."
  ],
  correctAnswer: "Egy osztályból csak egy példány létezhet.",
  topic: "Szoftvertervezési minták"
},

// SQL injection (89)
{
  id: 89,
  question: "Mi az SQL injection támadás lényege?",
  options: [
    "A szerver túlterhelése érvénytelen SQL lekérdezésekkel.",
    "A felhasználói adatok titkosítása.",
    "Érvénytelen HTTP kérések küldése.",
    "Olyan SQL parancsok beadása, melyek manipulálják az adatbázist jogosulatlanul."
  ],
  correctAnswer: "Olyan SQL parancsok beadása, melyek manipulálják az adatbázist jogosulatlanul.",
  topic: "Adatbiztonság, Webfejlesztés"
},

// Responsive design (90)
{
  id: 90,
  question: "Melyik technika segít reszponzív weboldalak készítésében?",
  options: [
    "HTML táblák használata elrendezéshez",
    "Inline CSS minden elemre",
    "Media query-k alkalmazása",
    "Adatok cache-elése a frontendben"
  ],
  correctAnswer: "Media query-k alkalmazása",
  topic: "HTML5, CSS3, Webfejlesztés"
}


];

const Questions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    // Shuffle all questions and take first 20
    const shuffled = [...allQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 20);
    setShuffledQuestions(shuffled);
    setQuizStarted(true);
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    shuffledQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setQuizStarted(false);
  };

  if (!quizStarted) {
    return (
      <div className="scroll-container text-gray-100 font-sans antialiased p-8 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-black bg-opacity-70 rounded-2xl shadow-lg p-6 fade-in visible text-center">
          <h2 className="text-2xl font-bold gradient-text mb-6">Programming Quiz</h2>
          <p className="mb-6">You'll get 20 random questions from our database of 40 questions.</p>
          <button
            onClick={startQuiz}
            className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (shuffledQuestions.length === 0) {
    return <div className="text-white text-center p-8">Loading questions...</div>;
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const totalQuestions = shuffledQuestions.length;
  const score = calculateScore();

  return (
   <div className="scroll-container text-gray-100 font-sans antialiased p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-black bg-opacity-70 rounded-2xl shadow-lg p-6 fade-in visible">
        {!showResults ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-400">{currentQuestion.topic}</span>
              <span className="text-sm text-gray-400">
                Question {currentQuestionIndex + 1}/{totalQuestions}
              </span>
            </div>
            
            <h2 className="text-xl font-bold gradient-text mb-6">
              {currentQuestion.question}
            </h2>
            
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedAnswers[currentQuestion.id] === option 
                      ? 'bg-blue-600' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                >
                  {option}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className={`px-4 py-2 rounded-lg ${
                  currentQuestionIndex === 0 
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                Previous
              </button>
              
              {currentQuestionIndex < totalQuestions - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => setShowResults(true)}
                  className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Show Results
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="fade-in visible">
            <h2 className="text-2xl font-bold gradient-text mb-6 text-center">
              Quiz Results
            </h2>
            
            <div className="text-center mb-8">
              <p className="text-xl mb-2">
                You scored {score} out of {totalQuestions}
              </p>
              <p className="text-lg">
                ({Math.round((score / totalQuestions) * 100)}%)
              </p>
            </div>
            
            <div className="space-y-6 mb-8">
              {shuffledQuestions.map((q, index) => {
                const userAnswer = selectedAnswers[q.id];
                const isCorrect = userAnswer === q.correctAnswer;
                
                return (
                  <div key={q.id} className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-gray-400">Question {index + 1}</span>
                      <span className="text-sm text-gray-400">{q.topic}</span>
                    </div>
                    
                    <p className="font-medium mb-3">{q.question}</p>
                    
                    <div className="space-y-2">
                      {q.options.map((option, i) => {
                        let optionClass = "text-gray-300 ml-5";
                        let prefix = "";
                        
                        if (option === q.correctAnswer) {
                          optionClass = "text-green-400 font-bold ml-5";
                          prefix = "✓ ";
                        } 
                        else if (option === userAnswer && !isCorrect) {
                          optionClass = "text-red-400 line-through";
                          prefix = "✗ ";
                        }
                        
                        return (
                          <p key={i} className={`text-sm ${optionClass}`}>
                            {prefix}{option}
                          </p>
                        );
                      })}
                    </div>
                    
                    {!userAnswer && (
                      <p className="text-sm text-red-400 mt-2">You did not answer this question</p>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                Take Quiz Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
