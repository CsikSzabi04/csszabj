export const hivQuestions = [
    {
        "id": 111,
        "question": "Kinek a nevéhez köthető a HTML nyelv alapjainak kidolgozása?",
        "options": [
            "Tim Berners-Lee (CERN)",
            "Steve Jobs (Apple)",
            "Bill Gates (Microsoft)",
            "Larry Page (Google)",
            "Linus Torvalds (Linux Foundation)"
        ],
        "correctAnswer": "Tim Berners-Lee (CERN)",
        "topic": "HTML"
    },
    {
        "id": 112,
        "question": "Melyik évtizedben született meg a HTML nyelv?",
        "options": [
            "1960-as évek – DARPA, ARPANET",
            "1970-es évek – internet, TCP/IP",
            "1980-as évek – PC elterjedése",
            "1990-es évek – világháló",
            "2000-es évek – dotcom boom"
        ],
        "correctAnswer": "1990-es évek – világháló",
        "topic": "HTML"
    },
    {
        "id": 113,
        "question": "A \"böngészőháború\" végére az Internet Explorer vált a domináns alkalmazássá. Melyik böngésző vesztette el a piaci részesedését?",
        "options": [
            "Apple Safari",
            "Mozilla Firefox",
            "Netscape Navigator",
            "Microsoft Edge",
            "Opera"
        ],
        "correctAnswer": "Netscape Navigator",
        "topic": "HTML"
    },
    {
        "id": 114,
        "question": "A jelenlegi HTML5 az úgynevezett \"Living Standard\" része. Mikorra várható a következő nagy kiadása?",
        "options": [
            "Az 5.3 verziót már now is használjuk, a Bootstrap számozását követi",
            "A HTML6 határozatlan időre csúszik az AI technológiák miatt",
            "Az új verzió neve PHTML lesz, jelentése Python/PHP + HTML",
            "A folyamatosan bővülő szabványnak nem lesz több nagyverziója"
        ],
        "correctAnswer": "A folyamatosan bővülő szabványnak nem lesz több nagyverziója",
        "topic": "HTML"
    },
    {
        "id": 115,
        "question": "Melyik HTML5-ben bevezetett szemantikus elemmel jelölhetjük az oldal fő tartalmát?",
        "options": [
            "<body>",
            "<main>",
            "<section class=\"main\">",
            "<div id=\"content\">"
        ],
        "correctAnswer": "<main>",
        "topic": "HTML"
    },
    {
        "id": 116,
        "question": "Egy szövegrészlet félkövér megjelenítésére néhány fejlesztő a <b> taget, mások a <strong> elemet használják. Valójában mi a különbség?",
        "options": [
            "Korábban volt köztük különbség, de ma már nincs jelentősége",
            "A <b> elem már nem szabványos, bár böngészők még támogatják",
            "A <strong> vizuális megjelenítésen túl szemantikai jelentéssel bír",
            "A <strong> csak a kód olvashatóságát javítja, mert nem rövidítés",
            "A <strong> elemmel tehetünk vastagabbá már félkövér <b> elemet"
        ],
        "correctAnswer": "A <strong> vizuális megjelenítésen túl szemantikai jelentéssel bír",
        "topic": "HTML"
    },
    {
        "id": 117,
        "question": "Milyen tag jelöli egy táblázat egyetlen fejléc celláját?",
        "options": [
            "<head>",
            "<header>",
            "<thead>",
            "<th>",
            "<td>"
        ],
        "correctAnswer": "<th>",
        "topic": "HTML"
    },
    {
        "id": 118,
        "question": "Hogyan hozható létre hivatkozás az oldal „forrasok” azonosítójú eleméhez?",
        "options": [
            "<link href=\"#forrasok\">",
            "<link id=\"forrasok\">",
            "<href id=\"forrasok\">",
            "<a href=\"forrasok\">",
            "<a href=\"#forrasok\">"
        ],
        "correctAnswer": "<a href=\"#forrasok\">",
        "topic": "HTML"
    },
    {
        "id": 119,
        "question": "A <select> választólistához milyen HTML taggel rendelhető választási lehetőségek?",
        "options": [
            "<label>",
            "<choice>",
            "<option>",
            "<input>",
            "<value>"
        ],
        "correctAnswer": "<option>",
        "topic": "HTML"
    },
    {
        "id": 120,
        "question": "Melyik szelektor színezi pirosra kizárólag a menüsorban szereplő hivatkozásokat?",
        "options": [
            "a:nav { color: red; }",
            "nav:a { color: red; }",
            "nav a { color: red; }",
            "nav.a { color: red; }",
            "a.nav { color: red; }"
        ],
        "correctAnswer": "nav a { color: red; }",
        "topic": "CSS"
    },
    {
        "id": 121,
        "question": "Hogyan tudunk egy weboldalon minden szöveget Verdana betűtípusúra állítani?",
        "options": [
            "html { font : Verdana; }",
            "html { text : Verdana; }",
            "font { family : Verdana; }",
            "body { font-text : Verdana; }",
            "body { font-family : Verdana; }"
        ],
        "correctAnswer": "body { font-family : Verdana; }",
        "topic": "CSS"
    },
    {
        "id": 122,
        "question": "Melyik CSS szelektorral tudunk kiválasztani egy olyan „div” elemet, ami rendelkezik „mandatory” osztállyal és „gdpr” azonosítóval?",
        "options": [
            "div.mandatory#gdpr",
            "div#mandatory.gdpr",
            "div { .mandatory { #gdpr { ... } } }",
            "div { #mandatory { .gdpr { ... } } }",
            "div class=\"mandatory\" id=\"gdpr\""
        ],
        "correctAnswer": "div.mandatory#gdpr",
        "topic": "CSS"
    },
    {
        "id": 123,
        "question": "Számos előnye lehet a Bootstrap keretrendszer CDN-en keresztül történő használatának. Az alábbiak közül melyik válasz téves?",
        "options": [
            "Csökkenthető a hálózati forgalom a cache használata miatt",
            "Általában alacsonyabb a válaszidő a közelebbi szervertől",
            "Automataikusan hozzáférhetünk a legfrissebb verzióhoz",
            "A gyorsítótár kihasználása javítja a betöltési időt"
        ],
        "correctAnswer": "Automataikusan hozzáférhetünk a legfrissebb verzióhoz",
        "topic": "CSS"
    },
    {
        "id": 124,
        "question": "A gutter osztályt a Bootstrap 5.0 verziójában vezették be. Hogyan tudunk 5 egységnyi guttert beállítani?",
        "options": [
            "style = \"gutter : 5px;\"",
            ". gutter { 5em ; }",
            "class = \"gutter-5\"",
            "class = \"g-5\""
        ],
        "correctAnswer": "class = \"g-5\"",
        "topic": "CSS"
    },
    {
        "id": 125,
        "question": "Mi a szerepe egy HTML oldalon a meta tagben elhelyezett viewport beállításnak?",
        "options": [
            "a reszponzív Bootstrap Rács / Grid csak így tud működni",
            "az oldal méretezésért felel különböző felbontású eszközökön",
            "megállapítja, hogy az eszköz álló vagy fekvő elrendezésű",
            "a keresőmotoroknál jobb rangsorolását biztosít",
            "az oldal betűméretét automatikus méretezi"
        ],
        "correctAnswer": "az oldal méretezésért felel különböző felbontású eszközökön",
        "topic": "HTML"
    },
    {
        "id": 126,
        "question": "Milyen kódot nem írhatunk JavaScriptben?",
        "options": [
            "kliens oldalit",
            "szerver oldalit",
            "alacsony szintűt",
            "magas szintűt",
            "objektum-orientáltat"
        ],
        "correctAnswer": "alacsony szintűt",
        "topic": "JavaScript"
    },
    {
        "id": 127,
        "question": "Hogyan nevezzük a weboldal struktúráját reprezentáló programozható modellt?",
        "options": [
            "AOM (Application Object Model)",
            "BOM (Browser Object Model)",
            "COM (Content Object Model)",
            "DOM (Document Object Model)",
            "EOM (Element Object Model)"
        ],
        "correctAnswer": "DOM (Document Object Model)",
        "topic": "JavaScript"
    },
    {
        "id": 128,
        "question": "Mi az az „ECMAScript”, és mért jelentős az ES6 verziója?",
        "options": [
            "A JavaScript szabványa, a modern nyelvi elemek bevezetésének kezdete",
            "A JavaScript őse, ebből és a Java szavak ötvözetéből származik a név",
            "A JavaScript következő verziója, amit 2026-ra terveznek bevezetni",
            "Egy frontend keretrendszer, ami a 6-os verzió óta piacvezető",
            "Egy frontendfejlesztő könyvtár, ami a 6-os verzió óta piacvezető"
        ],
        "correctAnswer": "A JavaScript szabványa, a modern nyelvi elemek bevezetésének kezdete",
        "topic": "JavaScript"
    },
    {
        "id": 129,
        "question": "Melyik igaz a JavaScript változók típusosságára?",
        "options": [
            "szigorú és statikus (fordításkor kell meghatározni és nem változhat)",
            "gyenge és dinamikus (futási időben az aktuálisan tárolt értéktől függ)",
            "típusmentes (nincs jelentősége a változóban tárolt érték típusának)",
            "multitípusos (a tárolt értéknek egyszerre többféle típusa is lehet)",
            "objektum-orientált (a típusok valójában osztályok példányai)"
        ],
        "correctAnswer": "gyenge és dinamikus (futási időben az aktuálisan tárolt értéktől függ)",
        "topic": "JavaScript"
    },
    {
        "id": 130,
        "question": "Melyik kulcsszó vezet be olyan változót, ami már a deklarációja előtt is használható?",
        "options": [
            "let",
            "var",
            "const",
            "Ez mindhárom kulcsszóra igaz",
            "Semelyik nem tudja ezeket együtt"
        ],
        "correctAnswer": "var",
        "topic": "JavaScript"
    },
    {
        "id": 131,
        "question": "Melyik JavaScript metódus ad vissza egy új tömböt az eredeti változtatása nélkül?",
        "options": [
            "tomb . filter ( )",
            "tomb . peek ( )",
            "tomb . sort ( )",
            "tomb . clone ( )"
        ],
        "correctAnswer": "tomb . filter ( )",
        "topic": "JavaScript"
    },
    {
        "id": 132,
        "question": "Melyik JavaScriptben létező metódussal szúrhatunk be új elemet a tömb elejére?",
        "options": [
            ". insert ( 0 , érték)",
            ". push ( 0 , érték )",
            ". append ( érték )",
            ". unshift ( érték )"
        ],
        "correctAnswer": ". unshift ( érték )",
        "topic": "JavaScript"
    },
    {
        "id": 133,
        "question": "Milyen formátumot ellenőrzi ez a reguláris kifejezés: ^[1-9][0-9]{2} [0-9]{3} \\d{3}$",
        "options": [
            "Telefonszámot (061 234 567)",
            "TAJ számot (123 456 789)",
            "Személyiszámot (123 456 AB)",
            "Bankszámlaszámot (1111 2222 opcionális 3333 4444)"
        ],
        "correctAnswer": "TAJ számot (123 456 789)",
        "topic": "JavaScript"
    },
    {
        "id": 134,
        "question": "Mi lesz egy „ for ... of ” ciklus eredménye a book objektum bejárásakor?",
        "options": [
            "Típushiba, mert az objektum nem iterálható",
            "Kulcs-érték párok ( \"year\" : 2024 )",
            "Az objektum kulcsai ( \"year\" )",
            "Az objektum értékei ( 2024 )"
        ],
        "correctAnswer": "Típushiba, mert az objektum nem iterálható",
        "topic": "JavaScript"
    },
    {
        "id": 135,
        "question": "Mi lesz egy „ for ... in ” ciklus eredménye a user objektum bejárásakor?",
        "options": [
            "Undefined értékek, mert nem tud objektumot iterálni",
            "Kulcs-érték párok ( 'id' : 2024 )",
            "Az objektum kulcsai ( 'id' )",
            "Az objektum értékei ( 2024 )"
        ],
        "correctAnswer": "Az objektum kulcsai ( 'id' )",
        "topic": "JavaScript"
    },
    {
        "id": 136,
        "question": "Hogyan iratkozhatunk fel egy „handler” nevű függvénnyel arra eseményre, amit az oldal teljes tartalmának betöltése után vált ki az ablak?",
        "options": [
            "window . addEventListener ( 'onLoaded' , handler )",
            "window . addEventListener ( 'load' , handler)",
            "window . loaded = handler",
            "window . isReady = handler"
        ],
        "correctAnswer": "window . addEventListener ( 'load' , handler)",
        "topic": "JavaScript"
    },
    {
        "id": 137,
        "question": "Mire használjuk a Promise objektumot?",
        "options": [
            "Ennek segítségével tudjuk elkerülni az aszinkron működést",
            "A használatával kezelhetjük az async kulcsszó kivételeit",
            "Ezzel reprezentáljuk egy jövőbeni művelet eredményét",
            "Egy aszinkron függvénynek lehet vele paramétert átadni"
        ],
        "correctAnswer": "Ezzel reprezentáljuk egy jövőbeni művelet eredményét",
        "topic": "JavaScript"
    },
    {
        "id": 138,
        "question": "Melyik függvény hívásával tudunk egy szerverhez kérést intézni?",
        "options": [
            "http ( url )",
            "get ( url )",
            "fetch ( url )",
            "request ( url )",
            "response ( url )"
        ],
        "correctAnswer": "fetch ( url )",
        "topic": "JavaScript"
    },
    {
        "id": 139,
        "question": "Milyen programozási felületet használ egy alkalmazás ahhoz, hogy HTTP üzeneteken keresztül kérjen adatot egy másik webes szolgáltatástól?",
        "options": [
            "SSH",
            "SQL",
            "CLI",
            "GUI",
            "API"
        ],
        "correctAnswer": "API",
        "topic": "Web Development"
    },
    {
        "id": 140,
        "question": "Melyik nem egy tartalomkezelő-rendszer (Content Management System / CMS)?",
        "options": [
            "WordPress",
            "Joomla!",
            "Drupal",
            "Ajax",
            "SquareSpace"
        ],
        "correctAnswer": "Ajax",
        "topic": "Web Development"
    },
    {
        "id": 141,
        "question": "Melyik eszköz való adatbázisok tervezésének korai szakaszában az objektumok és kapcsolataik vizuális ábrázolására?",
        "options": [
            "Struktogram",
            "Relációs adatmodell",
            "Entity Relationship modell",
            "Gantt-diagram",
            "Venn-diagram"
        ],
        "correctAnswer": "Entity Relationship modell",
        "topic": "Database"
    },
    {
        "id": 142,
        "question": "Az alábbiak közül melyik adatbázis-kezelő rendszer nem használ relációs modellt?",
        "options": [
            "MongoDB",
            "MariaDB",
            "MySQL",
            "PostgreSQL",
            "SQLite"
        ],
        "correctAnswer": "MongoDB",
        "topic": "Database"
    },
    {
        "id": 143,
        "question": "Hogyan adható meg egy adatbázis létrehozásakor, hogy a szövegek rendezése a magyar nyelv szabályait kövesse?",
        "options": [
            "... CHARSET 'utf8' LANG 'hu' COLLATE 'ci'",
            "... CHARSET 'utf8' LANG 'hungarian' CI",
            "... COLLATE 'utf8_hungarian' NOT SENSITIVE",
            "... COLLATE 'utf8_hungarian_ci'"
        ],
        "correctAnswer": "... COLLATE 'utf8_hungarian_ci'",
        "topic": "Database"
    },
    {
        "id": 144,
        "question": "Mi a különbség a PRIMARY KEY és a UNIQUE megszorítások között?",
        "options": [
            "Az egyik egy MySQL megkötés, a másik az MS SQL megfelelője",
            "A PRIMARY KEY nem kell, hogy egyedi legyen",
            "A PRIMARY KEY nem lehet másik táblában idegen kulcs",
            "A UNIQUE mezők kitöltése nem kötelező",
            "A UNIQUE értékek nem kerülnek indexelésre"
        ],
        "correctAnswer": "A UNIQUE mezők kitöltése nem kötelező",
        "topic": "Database"
    },
    {
        "id": 145,
        "question": "Melyik DDL utasítással tudunk egy tábla szerkezetén módosítani?",
        "options": [
            "UPDATE",
            "ALTER",
            "MODIFY",
            "CREATE",
            "TRUNCATE"
        ],
        "correctAnswer": "ALTER",
        "topic": "Database"
    },
    {
        "id": 146,
        "question": "Melyik adattípus alkalmas nagy mennyiségű szöveg tárolására a legtöbb SQL rendszerben?",
        "options": [
            "BLOB",
            "CHAR(100000)",
            "VARCHAR(100000)",
            "TEXT",
            "STRING"
        ],
        "correctAnswer": "TEXT",
        "topic": "Database"
    },
    {
        "id": 147,
        "question": "Mihez nem adhatunk álnevet (alias)?",
        "options": [
            "Egy adatbázisnak",
            "Egy táblának",
            "Egy mezőnek",
            "Egy lekérdezésnek",
            "Egy számítás eredményének"
        ],
        "correctAnswer": "Egy lekérdezésnek",
        "topic": "Database"
    },
    {
        "id": 148,
        "question": "Hogyan lehet egy lekérdezett mező értékéhez szöveget hozzáfűzni?",
        "options": [
            "SELECT tavolsag + \"km\" FROM meresek",
            "SELECT \"{tavolsag} km\" FROM meresek",
            "SELECT JOIN(tavolsag, \"km\") FROM meresek",
            "SELECT CONCAT(tavolsag, \"km\") FROM meresek",
            "SELECT tavolsag APPEND \"km\" FROM meresek"
        ],
        "correctAnswer": "SELECT CONCAT(tavolsag, \"km\") FROM meresek",
        "topic": "Database"
    },
    {
        "id": 149,
        "question": "Hogyan szűrhetünk a versenyzők között az első és második helyezettekre?",
        "options": [
            "... WHERE helyezes = 1 AND helyezes = 2",
            "... WHERE helyezes = 1 AND 2",
            "... WHERE helyezes = 1 OR 2",
            "... WHERE helyezes BETWEEN 0 AND 3",
            "... WHERE helyezes IN (1, 2)"
        ],
        "correctAnswer": "... WHERE helyezes IN (1, 2)",
        "topic": "Database"
    },
    {
        "id": 150,
        "question": "Melyik kulcsszó szűri ki egy mező ismétlődő értékeit a lekérdezés eredményéből?",
        "options": [
            "UNIQUE",
            "DISTINCT",
            "INDEX",
            "NO REPEAT",
            "NO DUPLICATE"
        ],
        "correctAnswer": "DISTINCT",
        "topic": "Database"
    },
    {
        "id": 151,
        "question": "Milyen kifejezést kell írni a [ pattern ] helyére, hogy az összes olyan szakma megnevezése jelenjen meg a lekérdezésben, ami a „tesztelő” szóra végződik? Konzol java",
        "options": [
            ". tesztelő",
            "_ tesztelő",
            "% tesztelő",
            "? tesztelő",
            "* tesztelő"
        ],
        "correctAnswer": "% tesztelő",
        "topic": "Backend Programming"
    },
    {
        "id": 152,
        "question": "Melyik kifejezés ellenőrzi, hogy egy mező értéke kitöltetlen?",
        "options": [
            "IS EMPTY",
            "NOT EMPTY",
            "IS NULL",
            "NOT NULL",
            "IS NULL OR EMPTY"
        ],
        "correctAnswer": "IS NULL",
        "topic": "Backend Programming"
    },
    {
        "id": 153,
        "question": "Csoportosítás után milyen záradékkal tudunk további szűrési feltételeket megadni?",
        "options": [
            "WHERE",
            "FILTER",
            "HAVING",
            "GROUP BY",
            "ORDER BY"
        ],
        "correctAnswer": "HAVING",
        "topic": "Backend Programming"
    },
    {
        "id": 154,
        "question": "Melyik záradékkal lehet befolyásolni a megjelenített rekordok számát?",
        "options": [
            "LIMIT",
            "MAX",
            "TAKE",
            "SKIP",
            "OFFSET"
        ],
        "correctAnswer": "LIMIT",
        "topic": "Backend Programming"
    },
    {
        "id": 155,
        "question": "Melyik SQL JOIN típus választja ki azokat a rekordokat, amelyek mindkét táblában megfelelnek a csatlakozási feltételnek?",
        "options": [
            "FULL JOIN",
            "LEFT JOIN",
            "OUTER JOIN",
            "INNER JOIN",
            "CROSS JOIN"
        ],
        "correctAnswer": "INNER JOIN",
        "topic": "Backend Programming"
    },
    {
        "id": 156,
        "question": "Melyik tervezési mintát alkalmazzuk, amikor az alkalmazás felépítését a következő rétegekre osztjuk: Megjelenítés ↔ Vezérlő logika ↔ Adatállapotok",
        "options": [
            "MVC",
            "MVVM",
            "REST",
            "SOLID",
            "SPA"
        ],
        "correctAnswer": "MVC",
        "topic": "Backend Programming"
    },
    {
        "id": 157,
        "question": "Egy rétegelt felépítésű alkalmazásban általában mi a „controller” feladata?",
        "options": [
            "az alkalmazás adatainak tárolása, módosítása, kezelése",
            "a felhasználói felület megjelenítése és elrendezése",
            "az adatbáziskapcsolat és hálózati kommunikáció fenntartása",
            "a felhasználó által kezdeményezett műveletek fogadása és kezelése",
            "az adatok ellenőrzése, a jogosultságok kezelése, naplózás"
        ],
        "correctAnswer": "a felhasználó által kezdeményezett műveletek fogadása és kezelése",
        "topic": "Backend Programming"
    },
    {
        "id": 158,
        "question": "Mi nem tartozik a „ViewModel” feladatai közé?",
        "options": [
            "A megjelenítést egyszerűsíti, az adatkötés támogatja",
            "Eseményeket és parancsokat közvetíti két réteg között",
            "A tesztelhetőség elősegítése, függetlenség a megjelenítéstől",
            "Egyetlen osztályba olvasztja a View és a Modell szerepeit"
        ],
        "correctAnswer": "Egyetlen osztályba olvasztja a View és a Modell szerepeit",
        "topic": "Backend Programming"
    },
    {
        "id": 159,
        "question": "Az alábbiak közül melyik nem backend fejlesztéséhez használt csomagkezelő?",
        "options": [
            "Npm (Node.js)",
            "Composer (PHP)",
            "NuGet (.NET)",
            "jQuery (JavaScript)",
            "Gradle (Java)"
        ],
        "correctAnswer": "jQuery (JavaScript)",
        "topic": "Backend Programming"
    },
    {
        "id": 160,
        "question": "Melyik nem egy HTTP kéréstípus?",
        "options": [
            "GET",
            "POST",
            "PUT",
            "UPDATE",
            "DELETE"
        ],
        "correctAnswer": "UPDATE",
        "topic": "Backend Programming"
    },
    {
        "id": 161,
        "question": "Melyik nem egy HTTP válaszkód?",
        "options": [
            "604 Index Out of Range",
            "502 Bad Gateway",
            "418 I’m a teapot",
            "307 Temporary Redirect",
            "200 OK"
        ],
        "correctAnswer": "604 Index Out of Range",
        "topic": "Backend Programming"
    },
    {
        "id": 162,
        "question": "Mit nem tartalmaznak egy HTTP kérés fejléc információi?",
        "options": [
            "A kliensalkalmazás adatait (User-Agent: Mozilla/5.0)",
            "A kliens által preferált nyelveket (Accept-Language: hu-HU)",
            "A kérés törzsének formátumát (Content-Type: application/json)",
            "A HTTP metódust és az URL-t (GET /index.html HTTP/1.1)",
            "A szervernek küldött cookie-kat (Cookie: sessionId=abc123)"
        ],
        "correctAnswer": "A HTTP metódust és az URL-t (GET /index.html HTTP/1.1)",
        "topic": "Backend Programming"
    },
    {
        "id": 163,
        "question": "Melyik fogalom nem tartozik az CRUD műveletek közé?",
        "options": [
            "adatok létrehozása",
            "adatok ellenőrzése",
            "adatok megtekintése",
            "adatok módosítása",
            "adatok eltávolítása"
        ],
        "correctAnswer": "adatok ellenőrzése",
        "topic": "Backend Programming"
    },
    {
        "id": 164,
        "question": "Hogyan tárolja a REST kialakítású szerver a korábbi kérések állapotát?",
        "options": [
            "cookie fájlokban",
            "session segítségével",
            "socket használatával",
            "sehogyan, nem tárolja ezeket"
        ],
        "correctAnswer": "sehogyan, nem tárolja ezeket",
        "topic": "Backend Programming"
    },
    {
        "id": 165,
        "question": "Melyik a javasolt URL felépítés egy RESTful felület tervezésekor, ha a végponttól különböző években szervezett versenyek indulóinak eredményét kérhetjük el?",
        "options": [
            "/getEredmeny/2025/getVersenyzo/1",
            "/eredmeny/2025/versenyzo/1",
            "/eredmeny/?ev=2025&id=1",
            "/getVersenyzoEredmeny?ev=2025&id=1"
        ],
        "correctAnswer": "/eredmeny/?ev=2025&id=1",
        "topic": "Backend Programming"
    },
    {
        "id": 166,
        "question": "Melyik a legelterjedtebb leíró formátum webszolgáltatások között, ami mélyen strukturált adatok tárolására képes könnyen olvasható alakban?",
        "options": [
            "Markdown",
            "XHTML",
            "XAML",
            "JSON",
            "CSV"
        ],
        "correctAnswer": "JSON",
        "topic": "Backend Programming"
    },
    {
        "id": 167,
        "question": "Az ORM egy réteget képez az objektumorientált program és a relációs adatbázis között, amivel hatékonyabbá válhat a fejlesztés. Melyik nem tartozik az előnyei közé?",
        "options": [
            "elfedi az eltérő adatbázis-kezelő rendszerek különbségeit",
            "a táblákat osztályokká képezi le",
            "képes kezelni az osztályok közötti 1:1, 1:N, N:N kapcsolatot",
            "SQL utasítások kiválthatók példányok manipulálásával",
            "garantálja bonyolult lekérdezések optimális futtatását"
        ],
        "correctAnswer": "garantálja bonyolult lekérdezések optimális futtatását",
        "topic": "Backend Programming"
    },
    {
        "id": 168,
        "question": "Melyik nem egy ORM keretrendszer?",
        "options": [
            "Entity Framework (C# .NET)",
            "Java Persistence API (Java)",
            "Postman (REST API)",
            "Eloquent (PHP, Laravel)",
            "Sequelize (Node.js)"
        ],
        "correctAnswer": "Postman (REST API)",
        "topic": "Backend Programming"
    },
    {
        "id": 169,
        "question": "Hogyan nevezzük a technikát, amikor egy osztály függőségeit a konstruktoron keresztül adjuk át? Például: public FelhasználóKezelő(IDatabase context) { }",
        "options": [
            "Dependency Injection",
            "SQL Injection",
            "SQL Separation",
            "Interface Implementation",
            "Interface Inversion"
        ],
        "correctAnswer": "Dependency Injection",
        "topic": "Backend Programming"
    },
    {
        "id": 170,
        "question": "Mi az az eszköz, ami automatikusan biztosítja egy objektum függőségeit, amikor arra szükség van? Például: IDataBase context = Services.Resolve<IDataBase>();",
        "options": [
            "Singleton",
            "SQL Injector",
            "Factory Pattern",
            "IoC Container"
        ],
        "correctAnswer": "IoC Container",
        "topic": "Backend Programming"
    },
    {
        "id": 171,
        "question": "A Git alkotója az elnevezést a brit szlengből kölcsönözte. Önironikus utalásnak szánta saját magára, mint csökönyös, rossz modorú emberre. Ki volt ő és milyen forráskód hatékonyabb kezelésére dolgozta ki?",
        "options": [
            "Steve Jobs (Apple iOS)",
            "Bill Gates (Microsoft Windows)",
            "Linus Torvalds (Linux kernel)",
            "Mark Zuckerberg (Facebook)"
        ],
        "correctAnswer": "Linus Torvalds (Linux kernel)",
        "topic": "Szoftverfejlesztés és -tesztelés"
    },
    {
        "id": 172,
        "question": "Hogyan nevezzük azt a felépítést, amiben minden fejlesztő rendelkezik a projekt teljes állapotával, de egy központi szolgáltatón keresztül szinkronizálni is tudják a változásokat?",
        "options": [
            "elosztott rendszer",
            "centralizált rendszer",
            "decentralizált rendszer",
            "peer-to-peer rendszer"
        ],
        "correctAnswer": "elosztott rendszer",
        "topic": "Szoftverfejlesztés és -tesztelés"
    },
    {
        "id": 173,
        "question": "„Commit” készítéséhez milyen adatok beállítása kötelező?",
        "options": [
            "Username és Password",
            "Username és Email",
            "Personal Access Token",
            "GitHub Account"
        ],
        "correctAnswer": "Username és Email",
        "topic": "Szoftverfejlesztés és -tesztelés"
    },
    {
        "id": 174,
        "question": "A fájlok fizikai tárolása szerint egy Git „repository” milyen két típusú lehet?",
        "options": [
            "main / branch",
            "public / private",
            "local / remote",
            "staged / unstaged",
            "tracked / untracked"
        ],
        "correctAnswer": "local / remote",
        "topic": "Szoftverfejlesztés és -tesztelés"
    },
    {
        "id": 175,
        "question": "Mivel azonosítja a Git rendszere a projekt egy adott pillanatban vett állapotát?",
        "options": [
            "Timestamp",
            "GUID",
            "URI",
            "URL",
            "Hash"
        ],
        "correctAnswer": "Hash",
        "topic": "Szoftverfejlesztés és -tesztelés"
    },
    {
        "id": 176,
        "question": "Melyik utasítással tölthetők fel a helyi adattár bejegyzései egy távoli szolgáltatóhoz?",
        "options": [
            "update",
            "refresh",
            "upload",
            "push",
            "pull"
        ],
        "correctAnswer": "push",
        "topic": "Szoftverfejlesztés és -tesztelés"
    },
    {
        "id": 177,
        "question": "Lehetséges-e klónozni egy idegen fejlesztő GitHubon található publikus projektjét?",
        "options": [
            "Nem, de a fájlokat le lehet tölteni.",
            "Igen, de csak ha meghívott kollaborációra.",
            "Igen, ha van saját GitHub fiókunk.",
            "Megkötések nélkül van rá lehetőség."
        ],
        "correctAnswer": "Megkötések nélkül van rá lehetőség.",
        "topic": "Szoftverfejlesztés és -tesztelés"
    },
    {
        "id": 178,
        "question": "Mi a „branch” szerepe a fejlesztési folyamatban?",
        "options": [
            "Nem tudnak konfliktusok kialakulni a verziók között.",
            "Elősegíti a párhuzamos fejlesztést és a csapatmunkát.",
            "A fejlesztők közös verzión dolgozhatnak egy időben.",
            "Lehetővé teszi egy-egy fejlesztőnek az offline munkát."
        ],
        "correctAnswer": "Elősegíti a párhuzamos fejlesztést és a csapatmunkát.",
        "topic": "Szoftverfejlesztés és -tesztelés"
    },
    {
        "id": 179,
        "question": "Hogyan nevezzük az eltérő ágak egyesítését, mindkét ág teljes történetének megtartásával?",
        "options": [
            "checkout",
            "merge",
            "sync",
            "join"
        ],
        "correctAnswer": "merge",
        "topic": "Szoftverfejlesztés és -tesztelés"
    },
    {
        "id": 180,
        "question": "Mi a célja GitHub platformon egy „pull request” küldésének?",
        "options": [
            "A jogosultságok ellenőrzése változások letöltése nélkül.",
            "A fejlesztőket szólíthatjuk fel a kódjuk feltöltésére.",
            "A fejlesztőket szólíthatjuk fel az új verzió letöltésére.",
            "A respository tulajdonosa küldhet módosítási kérést fejlesztőknek.",
            "A respository tulajdonosának küldhetünk módosítási javaslatot."
        ],
        "correctAnswer": "A respository tulajdonosának küldhetünk módosítási javaslatot.",
        "topic": "Szoftverfejlesztés és -tesztelés"
    },

    {
        "id": 181,
        "question": "Melyik az alábbiak közül a projektmenedzsment három legfontosabb eleme?",
        "options": [
            "Idő - Költség - Terjedelem",
            "Idő - Költség - Minőség",
            "Kockázat - Kommunikáció - Motiváció",
            "Képzés - Kommunikáció - Költség",
            "Idő - Minőség - Erőforrás"
        ],
        "correctAnswer": "Idő - Költség - Terjedelem",
        "topic": "Projektmenedzsment"
    },
    {
        "id": 182,
        "question": "Melyik nem egy projekt jellemzője?",
        "options": [
            "célhoz kötött",
            "komplex",
            "automatikus",
            "tervezett",
            "változó"
        ],
        "correctAnswer": "automatikus",
        "topic": "Projektmenedzsment"
    },
    {
        "id": 183,
        "question": "Mi a projekt életciklusának második szakasza?",
        "options": [
            "Végrehajtás",
            "Ellenőrzés",
            "Tervezés",
            "Lezárás",
            "Indítás"
        ],
        "correctAnswer": "Indítás",
        "topic": "Projektmenedzsment"
    },
    {
        "id": 184,
        "question": "Projektmenedzsment során milyen diagramot használunk a tevékenységek időbeli tervezésére?",
        "options": [
            "Oszlop diagram",
            "Gantt diagram",
            "Sávos diagram",
            "Torta diagram",
            "Idő diagram"
        ],
        "correctAnswer": "Gantt diagram",
        "topic": "Projektmenedzsment"
    },
    {
        "id": 185,
        "question": "Melyik eszköz használható egy Kanban tábla egyszerű kezelésére és vizuális megjelenítésére?",
        "options": [
            "Jira",
            "Figma",
            "Teams",
            "Trello",
            "GitHub"
        ],
        "correctAnswer": "Trello",
        "topic": "Projektmenedzsment"
    },
    {
        "id": 186,
        "question": "Mit érdemes választani, mint megvalósítandó teszt cél?",
        "options": [
            "A rendszer már készítés közben is teljesen hibamentes legyen.",
            "A rendszer az éles indításkor teljesen hibamentes legyen.",
            "Növeljük a megbízhatóságot, csökkentsük a kockázatot.",
            "Ne legyenek teszteletlen bemenetek.",
            "Ne legyenek teszteletlen kimenetek."
        ],
        "correctAnswer": "Növeljük a megbízhatóságot, csökkentsük a kockázatot.",
        "topic": "Tesztelés"
    },
    {
        "id": 187,
        "question": "Milyen okból mondhatjuk azt, hogy egy teszt „elkopott”?",
        "options": [
            "Nem fut automatikusan, például elavult a keretrendszer.",
            "Az eredeti célja már nem felel meg az aktuális kódbázisnak.",
            "Nem dokumentálták megfelelően, idővel nem érthető, mit vizsgál.",
            "A régóta nem futtatott teszteket ignorálja a keretrendszer."
        ],
        "correctAnswer": "Az eredeti célja már nem felel meg az aktuális kódbázisnak.",
        "topic": "Tesztelés"
    },
    {
        "id": 188,
        "question": "Miért fontos felismerni a hibafürtök jelenségét?",
        "options": [
            "Ezek azok a területek, ahol az automatikus tesztelés nem hatékony.",
            "Egy adott modul hibái lokalizáltak maradnak, és nem terjednek tovább.",
            "A hibák gyakran ugyanazon a területen halmozódnak.",
            "A sok egységteszt magától értetődően több hibát mutat ki."
        ],
        "correctAnswer": "A hibák gyakran ugyanazon a területen halmozódnak.",
        "topic": "Tesztelés"
    },
    {
        "id": 189,
        "question": "Miért állítják azt, hogy kimerítő teszt a valóságban nem lehetséges?",
        "options": [
            "Túl sok idő és erőforrás lenne az összes esetet lefedni.",
            "A tesztelési eszközök képtelenek minden hibát feltárni.",
            "A tesztkészletek nem frissülnek elég gyorsan a kód változásaihoz.",
            "A tesztelés dokumentációjában is bármikor előfordulhat hiba."
        ],
        "correctAnswer": "Túl sok idő és erőforrás lenne az összes esetet lefedni.",
        "topic": "Tesztelés"
    },
    {
        "id": 190,
        "question": "Melyik tervezési modell nem tartalmazza egyáltalán a tesztelést, mint a szoftverfejlesztés életciklusának egy tevékenységét?",
        "options": [
            "szekvenciális modellek (pl. V-modell)",
            "iteratív modellek (pl. Prototípus)",
            "inkrementális modellek (pl. Scrum)",
            "a fentiek közül egyik sem tartalmazza",
            "a fentiek közül mindegyik tartalmazza"
        ],
        "correctAnswer": "a fentiek közül mindegyik tartalmazza",
        "topic": "Fejlesztési modellek"
    },


    {
        "id": 191,
        "question": "Az agilis módszertanok és a DevOps elterjedésével vált egyre inkább elterjedté a „shift-left” megközelítés. Mire helyezi ez a hangsúlyt?",
        "options": [
            "A korai tesztelés kerülendő, mert lassítja a fejlesztők munkáját.",
            "A hibák korai felismerését és megelőzését helyezi előtérbe.",
            "Fejlesztők helyett dedikált a tesztelők végzik az ellenőrzését.",
            "Dedikált tesztelők helyett maguk fejlesztők végzik a tesztelést.",
            "A tesztelést a megrendelő bevonásával kell végezni."
        ],
        "correctAnswer": "A hibák korai felismerését és megelőzését helyezi előtérbe.",
        "topic": "Software Testing"
    },
    {
        "id": 192,
        "question": "Mit nevezünk „statikus” tesztelésnek? A kód tesztelését...",
        "options": [
            "adatbázis-kapcsolat nélkül",
            "megjelenítési réteg nélkül",
            "a kód futtatása nélkül",
            "fordítási környezet nélkül",
            "szintaktikai elemzés nélkül"
        ],
        "correctAnswer": "a kód futtatása nélkül",
        "topic": "Software Testing"
    },
    {
        "id": 193,
        "question": "Mit tesztelünk „egységtesztek” során?",
        "options": [
            "A teljes alkalmazást egyetlen osztatlan egységként kezelve.",
            "A legnagyobb egységeket elkülönítve (View, Logic, Model, stb.).",
            "Az eltérő modulegységek együttműködését.",
            "Osztályok függvényeit és metódusait izoláltan.",
            "Osztályok függőségeit."
        ],
        "correctAnswer": "Osztályok függvényeit és metódusait izoláltan.",
        "topic": "Software Testing"
    },
    {
        "id": 194,
        "question": "Mit vizsgálunk „integrációs” tesztek során?",
        "options": [
            "Egy függvény minden bemenetre helyes eredmény ad.",
            "Egy osztály megvalósítja az összes elvárt funkcióját.",
            "Egy komponens helyesen működik más rendszerelemekkel.",
            "Az alkalmazás teljesíti a felhasználói igényeket."
        ],
        "correctAnswer": "Egy komponens helyesen működik más rendszerelemekkel.",
        "topic": "Software Testing"
    },
    {
        "id": 195,
        "question": "Mire utal a tesztpiramisban a 10%-20%-70%-os „ökölszabály”?",
        "options": [
            "A csapat összetételére (menedzser, tesztelő, fejlesztő)",
            "Az időráfordításra (dokumentáció, tesztelés, fejlesztés)",
            "Az időbeli ráfordításra (tervezés, tesztelés, implementáció)",
            "A teszttípusok arányára (rendszer, integrációs, egységteszt)"
        ],
        "correctAnswer": "A teszttípusok arányára (rendszer, integrációs, egységteszt)",
        "topic": "Software Testing"
    },
    {
        "id": 196,
        "question": "Igaz-e a kijelentés, hogy a manuális tesztelést teljesen ki kell iktatni a modern szoftverfejlesztés folyamatából?",
        "options": [
            "Igen, mert az automatizálás hatékonyabb és pontosabb.",
            "Igen, mert csak emberi hibákat eredményez, így nincs valódi értéke.",
            "Nem, de kizárólag kis projektek esetében van helye manuális tesztelésnek.",
            "Nem, például a felhasználói élmény vizsgálatánál elengedhetetlen.",
            "Nem, a manuális teszt a kreatív hibakeresési módszerek alapja."
        ],
        "correctAnswer": "Nem, például a felhasználói élmény vizsgálatánál elengedhetetlen.",
        "topic": "Software Testing"
    },
    {
        "id": 197,
        "question": "Mire utal az „AAA” minta?",
        "options": [
            "Három lépésre osztott tesztmegközelítésre.",
            "A tesztkörnyezet inicializálásának, futtatásának és lezárásának mintájára.",
            "A kiemelkedően magas megbízhatóságú tesztelésre.",
            "A játékfejlesztésben használt módszertanokra."
        ],
        "correctAnswer": "Három lépésre osztott tesztmegközelítésre.",
        "topic": "Software Testing"
    },
    {
        "id": 198,
        "question": "Mikor hasznos az @Before vagy [SetUp] annotációk használata egy teszteseteket megelőző metódusnál?",
        "options": [
            "Minden tesztesetnek azonos kiindulási állapotra van szüksége.",
            "Minden tesztesetnek egyetlen közösen használat állapotra van szüksége.",
            "Amikor a tesztkörnyezet egyedi konfigurációt igényel.",
            "Amikor a tesztesetek egyedi paraméterezését igényelnek."
        ],
        "correctAnswer": "Minden tesztesetnek azonos kiindulási állapotra van szüksége.",
        "topic": "Software Testing"
    },
    {
        "id": 199,
        "question": "Mit jelent a TDD (Test-Driven Development) megközelítés?",
        "options": [
            "Szervezési irányelv. A csapatstruktúrában a tesztelő kap kiemelt hangsúlyt.",
            "Fejlesztési módszertan. Előbb írjuk meg a teszteket, csak utána a kódot.",
            "Tesztelési stratégia. Kizárólag automatikus teszteket használunk.",
            "Fejlesztési filozófia. A kódot a tesztek működéséhez igazítjuk."
        ],
        "correctAnswer": "Fejlesztési módszertan. Előbb írjuk meg a teszteket, csak utána a kódot.",
        "topic": "Software Testing"
    },
    {
        "id": 200,
        "question": "Melyik helyzetben hasznos a valós objektumokat helyettesítő „Mock”, „Fake” vagy „Stub” technikák alkalmazása?",
        "options": [
            "Egy API válasz idejét teszteljük, a valódi szolgáltatás elérése nélkül.",
            "Az adatbázis skálázhatóságát teszteljük valós környezetben.",
            "Egy rendszer teljesítményét teszteljük szimulált forgalommal.",
            "Egy külső erőforrást nem kívánunk a tesztelés során elérni."
        ],
        "correctAnswer": "Egy külső erőforrást nem kívánunk a tesztelés során elérni.",
        "topic": "Software Testing"
    },

    {
        "id": 201,
        "question": "Melyik SQL parancs kérdezi le a 2000 előtti évjáratú autók márkáját és típusát?",
        "options": [
            "SELECT marka, tipus WHERE evjarat<2000 FROM car;",
            "SELECT * FROM car WHERE evjarat<2000;",
            "SELECT marka, tipus FROM car WHERE evjarat<2000;",
            "SELECT marka, evjarat FROM car WHERE evjarat>2000;"
        ],
        "correctAnswer": "SELECT marka, tipus FROM car WHERE evjarat<2000;",
        "topic": "SQL"
    },
    {
        "id": 202,
        "question": "Jelölje be az igaz állításokat a Git parancsokkal kapcsolatban!",
        "options": [
            "A repository helyi másolatát a git copy https://github.com/user/project paranccsal lehet elkészíteni",
            "A kiadas branchre a git checkout kiadas paranccsal lehet átváltani.",
            "A git commit paranccsal lehet a helyi változásokat a központi repositoryba feltölteni.",
            "A git pull paranccsal lehet a központi repositoryban levő változásokat letölteni."
        ],
        "correctAnswer": [
            "A kiadas branchre a git checkout kiadas paranccsal lehet átváltani.",
            "A git pull paranccsal lehet a központi repositoryban levő változásokat letölteni."
        ],
        "topic": "Git"
    },
    {
        "id": 203,
        "question": "Mi a hatása a következő SQL utasításnak? DELETE FROM car WHERE evjarat BETWEEN 2020 AND 2022;",
        "options": [
            "Törli a car tábla összes adatát.",
            "Törli az evjarat mezőben lévő azon adatokat, amelyek 2020 és 2022 közé esnek.",
            "Törli azon autók összes adatát, amelyeket 2020 és 2022 gyártottak.",
            "Törli azon autók összes adatát, amelyeket 2020-ban vagy 2022-ben gyártottak."
        ],
        "correctAnswer": "Törli azon autók összes adatát, amelyeket 2020 és 2022 gyártottak.",
        "topic": "SQL"
    },
    {
        "id": 204,
        "question": "Melyik SQL parancs ad hozzá egy kobcenti nevű mezőt a CAR táblához?",
        "options": [
            "ADD TABLE car IN kobcenti INT;",
            "CREATE TABLE car ADD kobcenti INT;",
            "ALTER TABLE car ADD kobcenti INT;",
            "UPDATE TABLE car ADD kobcenti INT;"
        ],
        "correctAnswer": "ALTER TABLE car ADD kobcenti INT;",
        "topic": "SQL"
    },
    {
        "id": 205,
        "question": "Hogyan kérdezhetőek le az autók nettó árai, ha a táblában csak a bruttó árakat és ÁFA %-os értékét (pl.:25) tároljuk?",
        "options": [
            "SELECT brutto_ar-AFA AS nettó FROM autok;",
            "SELECT brutto_ar-brutto_ar*AFA AS nettó FROM autok;",
            "SELECT brutto_ar-brutto_ar*AFA/100 AS nettó FROM autok;",
            "UPDATE berek SET brutto_ar-bruttó_ar*AFA/100 AS nettó;"
        ],
        "correctAnswer": "SELECT brutto_ar-brutto_ar*AFA/100 AS nettó FROM autok;",
        "topic": "SQL"
    },
    {
        "id": 206,
        "question": "Mit eredményez a következő SQL utasítás? SELECT iskola, Avg(pont) AS [Átlagos pont] FROM verseny GROUP BY iskola HAVING (Avg(pont)>80);",
        "options": [
            "Megmutatja az iskolák átlagos pontszámait",
            "Kikeresi azokat a tanulókat, akiknek a pontja 80 fölött van, és megadja az iskolájukat.",
            "Kiírja azon iskolák számát, ahol az átlagos pontszám 80 felett volt.",
            "Kikeresi azokat az iskolákat, ahol az átlagos pontszám 80 pont fölött van, és megadja az átlagos pontszámukat."
        ],
        "correctAnswer": "Kikeresi azokat az iskolákat, ahol az átlagos pontszám 80 pont fölött van, és megadja az átlagos pontszámukat.",
        "topic": "SQL"
    },
    {
        "id": 207,
        "question": "Melyik SQL parancs növeli az összes könyv árát 20%-al?",
        "options": [
            "UPDATE book SET ar=ar+20;",
            "UPDATE book SET ar=ar*1.2;",
            "ALTER TABLE book SET ar=ar*1.2",
            "UPDATE book SET ar=ar*1.8 WHERE ar<5000;"
        ],
        "correctAnswer": "UPDATE book SET ar=ar*1.2;",
        "topic": "SQL"
    },
    {
        "id": 208,
        "question": "Melyik vezérlési szerkezet általános alakja a következő? while (feltétel) {ciklusmag utasításai;}",
        "options": [
            "kétirányú elágazás",
            "növekményes ciklus",
            "hátultesztelős ciklus",
            "elöltesztelős ciklus"
        ],
        "correctAnswer": "elöltesztelős ciklus",
        "topic": "Programming"
    },

    {
        "id": 210,
        "question": "Mi lesz a decimális eredmény, ha bitenkénti AND műveletet végzünk 8 biten a következő két számon? 124 AND 31",
        "options": [
            "28",
            "30",
            "31",
            "60"
        ],
        "correctAnswer": "28",
        "topic": "Programming / Bitwise Operations"
    },

    {
        "id": 212,
        "question": "Melyik feltételt kell használnunk akkor, ha azt szeretnénk vizsgálni, hogy az adott évszám szökőév-e és egyben századforduló is?",
        "options": [
            "evszam % 4 != 0 || evszam % 100 != 0",
            "evszam % 4 != 0 && evszam % 100 != 0",
            "evszam % 4 == 0 && evszam % 100 == 0",
            "evszam % 4 == 0 || evszam % 100 == 0"
        ],
        "correctAnswer": "evszam % 4 == 0 && evszam % 100 == 0",
        "topic": "Programming / Logic"
    },

    {
        "id": 214,
        "question": "Mit csinál az alábbi programkód?\n\nint ertek = 12;\nstring eredmeny = \"\";\nfor (int i = 1; i < ertek+1; i++) {\n if (ertek % i == 0) {\n eredmeny += i + \", \";\n }\n}\nConsole.WriteLine(eredmeny);",
        "options": [
            "Kiírja 12 osztóit a képernyőre, kivéve a 24-et, vesszővel elválasztva.",
            "Kiírja a 12 osztóit a képernyőre vesszővel elválasztva.",
            "Kiírja a 12 prímosztóit a képernyőre vesszővel elválasztva.",
            "Kiírja a számokat 1-től 12-ig a képernyőre vesszővel elválasztva."
        ],
        "correctAnswer": "Kiírja a 12 osztóit a képernyőre vesszővel elválasztva.",
        "topic": "Programming / Loops"
    },
    {
        "id": 215,
        "question": "Melyik adattípus biztosítja a leggazdaságosabb tárhelyfoglalást, ha egy tornász pontszámait szeretnénk eltárolni (a pontozó bírák által adható maximális pontszám 10, és tizedes értékeket is adhatnak pl.: 8,6)?",
        "options": [
            "short",
            "float",
            "double",
            "decimal"
        ],
        "correctAnswer": "float",
        "topic": "Programming / Data Types"
    },
    {
        "id": 216,
        "question": "Melyik adatmodell esetén alkalmazható az SQL nyelv?",
        "options": [
            "hierarchikus",
            "hálós",
            "relációs",
            "EER"
        ],
        "correctAnswer": "relációs",
        "topic": "Databases"
    },
    {
        "id": 217,
        "question": "Melyik fogalomhoz tartozik a következő meghatározás? Olyan változó, ami egy memóriacímet tartalmaz.",
        "options": [
            "Konstruktor",
            "Destruktor",
            "Metódus",
            "Mutató"
        ],
        "correctAnswer": "Mutató",
        "topic": "Programming / Concepts"
    },
    {
        "id": 218,
        "question": "Melyik HTML utasítással jelezhetjük egy felsorolás elemeit?",
        "options": [
            "<dl>",
            "<li>",
            "<il>",
            "<list>"
        ],
        "correctAnswer": "<li>",
        "topic": "Web Development / HTML"
    },
    {
        "id": 219,
        "question": "Melyik HTML utasítás eredményez működő hiperhivatkozást?",
        "options": [
            "<a href=\"http://www.parlament.hu\">Országgyűlés</a>",
            "<a name=\"http://www.parlament.hu\">Országgyűlés</a>",
            "<a>http://www.parlament.hu</a>",
            "<a url=\"http://www.parlament.hu\">Országgyűlés</a>"
        ],
        "correctAnswer": "<a href=\"http://www.parlament.hu\">Országgyűlés</a>",
        "topic": "Web Development / HTML"
    },
    {
        "id": 220,
        "question": "Az alábbiak közül melyik határoz meg jelölőnégyzet típusú űrlap mezőt?",
        "options": [
            "<input type=\"check\" name=\"foci\" value=\"1\">",
            "<form type=\"checkbox\" name=\"foci\" value=\"1\">",
            "<input type=\"checkbox\" name=\"foci\" value=\"1\">",
            "<input type=\"checkname=\"foci\" value=\"1\">"
        ],
        "correctAnswer": "<input type=\"checkbox\" name=\"foci\" value=\"1\">",
        "topic": "Web Development / HTML Forms"
    },
    {
        "id": 221,
        "question": "Milyen tag-et kell használni a weboldalak táblázataiban a táblázat egy-egy cellájának meghatározására?",
        "options": [
            "<cell>",
            "<td>",
            "<tr>",
            "<table>"
        ],
        "correctAnswer": "<td>",
        "topic": "Web Development / HTML Tables"
    },
    {
        "id": 222,
        "question": "Melyik tag szolgál egy weboldalon képek beillesztésére?",
        "options": [
            "<picture src=\"...\">",
            "<href img src=\"...\">",
            "<img href=\"...\">",
            "<img src=\"...\">"
        ],
        "correctAnswer": "<img src=\"...\">",
        "topic": "Web Development / HTML"
    },
    {
        "id": 223,
        "question": "Hogyan hozható létre egy weboldalon belül a „fejezet1” nevű könyvjelzőre mutató hivatkozás?",
        "options": [
            "<a name=\"#fejezet1\">Első fejezet</a>",
            "<a id=\"fejezet1\">Első fejezet</a>",
            "<a href=\"#fejezet1\">Első fejezet</a>",
            "<a href=\"fejezet1.html\">Első fejezet</a>"
        ],
        "correctAnswer": "<a href=\"#fejezet1\">Első fejezet</a>",
        "topic": "Web Development / HTML Links"
    },
    {
        "id": 224,
        "question": "HTML-ben melyik határoz meg egyszerű (egysoros) szöveges beviteli mezőt?",
        "options": [
            "<text name=\"cím\" value=\"\">",
            "<select type=\"text\" name=\"cím\" value=\"\">",
            "<option type=\"text\" name=\"cím\" value=\"\">",
            "<input type=\"text\" name=\"cím\" value=\"\">"
        ],
        "correctAnswer": "<input type=\"text\" name=\"cím\" value=\"\">",
        "topic": "Web Development / HTML Forms"
    },
    {
        "id": 225,
        "question": "Hogyan adható meg a HTML táblázatokban a keret vastagsága?",
        "options": [
            "a <table> \"line\" jellemzőjével",
            "a <table> \"border\" jellemzőjével",
            "a <table> \"margin\" jellemzőjével",
            "a <table> \"width\" jellemzőjével"
        ],
        "correctAnswer": "a <table> \"border\" jellemzőjével",
        "topic": "Web Development / HTML Tables"
    },
    {
        "id": 226,
        "question": "Mire szolgál a HTML űrlapoknál az <input type=\"submit\"> tag?",
        "options": [
            "Szöveges beviteli mező elhelyezésére.",
            "\"Űrlap elküldése\" gomb elhelyezésére.",
            "Nyomógomb elhelyezésére.",
            "Az űrlap aláírására."
        ],
        "correctAnswer": "\"Űrlap elküldése\" gomb elhelyezésére.",
        "topic": "Web Development / HTML Forms"
    },
    {
        "id": 227,
        "question": "Melyik HTML utasítással csatolhatjuk a külső CSS fájlt a weblaphoz?",
        "options": [
            "<stylesheet> rel=\"stylesheet\" mystyle.css type=\"text/css\"</stylesheet>",
            "<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">",
            "<style src=\"mystyle.css\" rel=\"stylesheet\" type=\"text/css\">",
            "<a href=\"mystyle.css\" rel=\"stylesheet\" type=\"text/css\"></a>"
        ],
        "correctAnswer": "<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">",
        "topic": "Web Development / CSS"
    },
    {
        "id": 228,
        "question": "Hogyan épül fel általánosan egy CSS utasítás?",
        "options": [
            "kijelölö{tulajdonság1:ertek1;tulajdonsag2:ertek2;}",
            "kijelölö{tulajdonság1,tulajdonsag2:ertek1,ertek2;}",
            "#tulajdonság{kijelölö: ertek1:ertek2;}",
            ".tulajdonság{kijelölö: ertek1:ertek2;}"
        ],
        "correctAnswer": "kijelölö{tulajdonság1:ertek1;tulajdonsag2:ertek2;}",
        "topic": "Web Development / CSS"
    },
    {
        "id": 229,
        "question": "Melyik CSS utasítás igazítja jobbra a picture azonosítójú képet?",
        "options": [
            ".picture{text-align:right}",
            "#picture{float:right}",
            "#picture{text-align:right}",
            ".picture{float:right}"
        ],
        "correctAnswer": "#picture{float:right}",
        "topic": "Web Development / CSS"
    },
    {
        "id": 230,
        "question": "Melyik CSS utasítással készíthetünk egy olyan fejléckép azonosítójú szelektort, amely a magasságot 50, a szélességet 800 képpontosra állítja?",
        "options": [
            "#fejléckép{height:800px;width:50px}",
            ".fejléckép{height:50px;width:800px}",
            "#fejléckép{height:50px;width:800px}",
            ".fejléckép{height:800px;width:50px}"
        ],
        "correctAnswer": "#fejléckép{height:50px;width:800px}",
        "topic": "Web Development / CSS"
    },
    {
        "id": 231,
        "question": "Mit eredményez a következő CSS utasítás: h2 {font-style:italic;}",
        "options": [
            "A címsort h2-re állítja.",
            "Hibás utasítás.",
            "A h2 címsor nyelvét olaszra állítja.",
            "A h2 címsort dőltre állítja."
        ],
        "correctAnswer": "A h2 címsort dőltre állítja.",
        "topic": "Web Development / CSS"
    },
    {
        "id": 232,
        "question": "Melyik CSS utasítással állíthatjuk a teljes weboldal betűtípusát Arialra?",
        "options": [
            "body {text-style:Arial;}",
            "text {font-family:Arial;}",
            "body {font-family:Arial;}",
            "body {text-family:Arial;}"
        ],
        "correctAnswer": "body {font-family:Arial;}",
        "topic": "Web Development / CSS"
    },
    {
        "id": 233,
        "question": "Mit végez el a következő CSS utasítás? #kép {width:200px;}",
        "options": [
            "Az összes kép szélességét 200 pontosra állítja.",
            "A kép osztályú elem szélességét 200 pontosra állítja.",
            "A kép azonosítójú elem szélességét 200 pontosra állítja.",
            "Ez egy hibás utasítás."
        ],
        "correctAnswer": "A kép azonosítójú elem szélességét 200 pontosra állítja.",
        "topic": "Web Development / CSS"
    },
    {
        "id": 234,
        "question": "CSS-ben keretet szeretne készíteni a következő keretvastagságokkal: Felső keret = 10 képpont, alsó keret = 5 képpont, bal oldali keret = 20 képpont, jobb oldali keret = 1 képpont. Melyik a helyes parancs erre a célra?",
        "options": [
            "border-width:10px 20px 5px 1px;",
            "border-width:10px 1px 5px 20px;",
            "border-width:10px 5px 20px 1px;",
            "border-width:5px 20px 10px 1px;"
        ],
        "correctAnswer": "border-width:10px 1px 5px 20px;",
        "topic": "Web Development / CSS"
    },
    {
        "id": 235,
        "question": "Melyik CSS utasítás szünteti meg a hiperhivatkozások aláhúzását?",
        "options": [
            "a {text-decoration:none;}",
            "a {underline:none;}",
            "a {text-decoration:no-underline;}",
            "{decoration:no-underline;}"
        ],
        "correctAnswer": "a {text-decoration:none;}",
        "topic": "Web Development / CSS"
    },
    {
        "id": 236,
        "question": "Melyik JavaScript kód változtatja meg az alábbi proba azonosítójú bekezdésben megjelenő szöveget? <p id=\"proba\">Jó reggelt!</p>",
        "options": [
            "document.getElement(\"p\").innerHTML = \"Jó napot!\";",
            "#proba.innerHTML = \"Jó napot!\";",
            "document.getElementByName(\"p\").innerHTML = \"Jó napot!\";",
            "document.getElementById(\"proba\").innerHTML = \"Jó napot!\";"
        ],
        "correctAnswer": "document.getElementById(\"proba\").innerHTML = \"Jó napot!\";",
        "topic": "Web Development / JavaScript"
    },
    {
        "id": 237,
        "question": "Hogyan épül fel a számlálós ciklus ciklusfeje JavaScriptben?",
        "options": [
            "for i in range(1,5)",
            "for i range(0;5)",
            "for (i = 0; i <= 5; i++)",
            "for (i <= 5; i++)"
        ],
        "correctAnswer": "for (i = 0; i <= 5; i++)",
        "topic": "Programming / JavaScript"
    },
    {
        "id": 238,
        "question": "Hogyan helyezhető el többsoros megjegyzés JavaScript kódban?",
        "options": [
            "//Ez egy többsoros megjegyzés//",
            "/*Ez egy többsoros megjegyzés*/",
            "<!--Ez egy többsoros megjegyzés-->",
            "//Ez egy\n//többsoros megjegyzés"
        ],
        "correctAnswer": "/*Ez egy többsoros megjegyzés*/",
        "topic": "Programming / JavaScript"
    },
    {
        "id": 239,
        "question": "Az alábbiak közül melyik hoz létre 3 elemű tömböt JavaScriptben?",
        "options": [
            "var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")",
            "var colors = (1:\"red\", 2:\"green\", 3:\"blue\")",
            "var colors = {\"red\", \"green\", \"blue\"}",
            "var colors = [\"red\", \"green\", \"blue\"]"
        ],
        "correctAnswer": "var colors = [\"red\", \"green\", \"blue\"]",
        "topic": "Programming / JavaScript"
    },
    {
        "id": 240,
        "question": "Hogyan írhatjuk egy figyelmeztető ablakba a \"Hello\" szöveget JavaScriptben?",
        "options": [
            "msg(\"Hello\");",
            "alertBox(\"Hello\");",
            "alert(\"Hello\");",
            "msgBox(\"Hello\");"
        ],
        "correctAnswer": "alert(\"Hello\");",
        "topic": "Programming / JavaScript"
    },
    {
        "id": 241,
        "question": "Melyik HTML elembe kell elhelyezni a JavaScript kódot?",
        "options": [
            "<javascript>",
            "<script>",
            "<scripting>",
            "<js>"
        ],
        "correctAnswer": "<script>",
        "topic": "Web Development / HTML"
    },
    {
        "id": 242,
        "question": "JavaScriptben melyik metódussal adható meg két szám (x,y) közül a nagyobb?",
        "options": [
            "Math.ceil(x, y)",
            "ceil(x, y)",
            "Math.max(x, y)",
            "top(x, y)"
        ],
        "correctAnswer": "Math.max(x, y)",
        "topic": "Programming / JavaScript"
    },
    {
        "id": 243,
        "question": "Mi lesz az x változó értéke a következő PHP kód lefutása után? \n<?php\n$tomb = array(1, 2, 3, 4, 5);\n$x = 0;\nfor($i=0; $i<5; $i++)\nif($x%2==0)$x = $x + $tomb[$i];\nprint(\"x: \". $x);\n?>",
        "options": [
            "1",
            "5",
            "10",
            "15"
        ],
        "correctAnswer": "1",
        "topic": "Programming / PHP"
    },
    {
        "id": 244,
        "question": "Mi lesz az x változó értéke a következő PHP kód lefutása után? \n<?php\n$tomb = array(1,2,3,4,5);\n$x = 0;\nfor($i=0; $i<5; $i++)\nif($tomb[$i]!= 2)\n$x++;\nprint(\"x: \". $x);\n?>",
        "options": [
            "2",
            "4",
            "5",
            "15"
        ],
        "correctAnswer": "4",
        "topic": "Programming / PHP"
    },
    {
        "id": 245,
        "question": "PHP programnyelvben melyik utasítással nyitható meg a jelszo.txt fájl csak olvasásra?",
        "options": [
            "open(\"jelszo.txt\");",
            "fopen(\"jelszo.txt\",\"r\");",
            "fopen(\"jelszo.txt\",\"r+\");",
            "open(\"jelszo.txt\",\"read\");"
        ],
        "correctAnswer": "fopen(\"jelszo.txt\",\"r\");",
        "topic": "Programming / PHP"
    },
    {
        "id": 246,
        "question": "Melyik kifejezés hiányzik a mondatból? Objektumorientált programozás esetén a ______________ felelős az objektum által használt erőforrások felszabadításáért.",
        "options": [
            "konstruktor",
            "destruktor",
            "metódus",
            "virtuális metódus"
        ],
        "correctAnswer": "destruktor",
        "topic": "Programming / OOP"
    },
    {
        "id": 247,
        "question": "OOP (objektumorientált programozás) estén melyik az a hozzáférési (láthatósági) szint, amelyben az adott taghoz csak az adott osztály és leszármazottjai férhetnek hozzá?",
        "options": [
            "public",
            "protected",
            "internal",
            "private"
        ],
        "correctAnswer": "protected",
        "topic": "Programming / OOP"
    },
    {
        "id": 248,
        "question": "Milyen tag-et kell használni a weboldalak táblázataiban a táblázat egy-egy fejléc cellájának meghatározására?",
        "options": [
            "<cell>",
            "<td>",
            "<head>",
            "<th>"
        ],
        "correctAnswer": "<th>",
        "topic": "Web Development / HTML"
    },
    {
        "id": 249,
        "question": "Az alábbiak közül melyik nem része egy HTML oldal szerkezetének?",
        "options": [
            "header",
            "body",
            "caption",
            "head"
        ],
        "correctAnswer": "caption",
        "topic": "Web Development / HTML"
    },
    {
        "id": 250,
        "question": "Az alábbiak közül melyik nem része a HTML5 szemantikus szerkezetének?",
        "options": [
            "header",
            "main",
            "nav",
            "table",
            "section"
        ],
        "correctAnswer": "table",
        "topic": "Web Development / HTML"
    },
    {
        "id": 251,
        "question": "Mi lesz az eredménye a css opacity:0.7; utasításnak, ha egy képre alkalmazzák?",
        "options": [
            "semmi",
            "a kép 30% ban átlátszó lesz",
            "a kép fele részben átlátszó lesz",
            "a kép 70% ban átlátszó lesz"
        ],
        "correctAnswer": "a kép 30% ban átlátszó lesz",
        "topic": "Web Development / CSS"
    },
    {
        "id": 252,
        "question": "Az alábbiak közül melyik paraméter nem használható css-ben a háttér beállításainak módosítására?",
        "options": [
            "url(\"img_tree.png\");",
            "no-repeat;",
            "fixed",
            "double"
        ],
        "correctAnswer": "double",
        "topic": "Web Development / CSS"
    },
    {
        "id": 253,
        "question": "CSS formázással szeretnék az oldalon egy képet középre igazítani úgy, hogy a környező szövegektől külön sorba kerüljön. Mi kerüljön a display tulajdonság paraméterébe?",
        "options": [
            "none",
            "inline",
            "block",
            "inline-block"
        ],
        "correctAnswer": "block",
        "topic": "Web Development / CSS"
    },
    {
        "id": 254,
        "question": "Mire való egy HTML oldalon a meta tagbe elhelyezett viewport tulajdonság beállítása?",
        "options": [
            "nincs hatása a megjelenítésre",
            "segítségével az eszköz méretéhez igazíthatjuk a tartalmak méretét",
            "beállíthatjuk vele az oldalak legfelső szintjét",
            "különféle nézőpontokat definiálhatunk vele"
        ],
        "correctAnswer": "segítségével az eszköz méretéhez igazíthatjuk a tartalmak méretét",
        "topic": "Web Development / HTML"
    },
    {
        "id": 255,
        "question": "Az alábbi CSS méret meghatározó mértékegységek közül melyik függ a megjelenítő eszköz dpi felbontásától?",
        "options": [
            "cm",
            "px",
            "pt",
            "mm"
        ],
        "correctAnswer": "px",
        "topic": "Web Development / CSS"
    },
    {
        "id": 256,
        "question": "Az alábbiak közül melyik CSS szelektorral lehet hivatkozni az összes olyan bekezdésre, amik a div elemen belül helyezkednek el?",
        "options": [
            "div, p",
            "div p",
            "div>p",
            "div+p"
        ],
        "correctAnswer": "div p",
        "topic": "Web Development / CSS"
    },
    {
        "id": 257,
        "question": "Mi az a Bootstrap?",
        "options": [
            "BIOS beállítás, amivel meg lehet határozni a gép indításáért felelős eszközt",
            "JS és CSS keretrendszer",
            "Egy Boot manager program",
            "Statikus weblapok készítéséhez használt segédprogram"
        ],
        "correctAnswer": "JS és CSS keretrendszer",
        "topic": "Web Development / Frameworks"
    },
    {
        "id": 258,
        "question": "Melyik parancs segítségével hozhat létre egy ’proba’ nevű adatbázist és állíthatja be a karakter kódolást utf8-ra?",
        "options": [
            "CREATE DATABASE proba",
            "ALTER DATABASE proba CHARACTER SET utf8",
            "CREATE DATABASE proba CHARACTER SET utf8",
            "DROP DATABASE proba CHARACTER SET utf8"
        ],
        "correctAnswer": "CREATE DATABASE proba CHARACTER SET utf8",
        "topic": "Database / SQL"
    },
    {
        "id": 259,
        "question": "Melyik parancs segítségével lehet egy adatbázisból névsorban kiíratni a második 10 (11-20) rekord tartalmát?",
        "options": [
            "SELECT * FROM adatok ORDER BY nev LIMIT 10, 10",
            "SELECT * FROM adatok LIMIT 10 ORDER nev",
            "SELECT * FROM adatok ORDER BY nev LIMIT 11, 20",
            "SELECT * FROM adatok LIMIT 11, 20 ORDER BY nev"
        ],
        "correctAnswer": "SELECT * FROM adatok ORDER BY nev LIMIT 10, 10",
        "topic": "Database / SQL"
    },
    {
        "id": 260,
        "question": "Melyik parancs segítségével lehet kilistázni „A” és „B” táblából azokat a rekordokat, amik mind a két táblában szerepelnek?",
        "options": [
            "SELECT * FROM A INNER JOIN B ON A.kulcs=B.kulcs",
            "SELECT * FROM A RIGHT JOIN B ON A.kulcs=B.kulcs WHERE A.kulcs IS NULL",
            "SELECT * FROM A FULL OUTER JOIN B ON A.kulcs=B.kulcs WHERE A.kulcs IS NULL OR B.kulcs IS NULL",
            "SELECT * FROM A RIGHT JOIN B ON A.kulcs=B.kulcs WHERE B.kulcs IS NUL"
        ],
        "correctAnswer": "SELECT * FROM A INNER JOIN B ON A.kulcs=B.kulcs",
        "topic": "Database / SQL"
    },
    {
        "id": 261,
        "question": "Melyik parancs segítségével lehet kilistázni „A” és „B” táblából azokat a rekordokat, amik csak az A vagy csak a B táblában szerepelnek?",
        "options": [
            "SELECT * FROM A INNER JOIN B ON A.kulcs=B.kulcs",
            "SELECT * FROM A RIGHT JOIN B ON A.kulcs=B.kulcs WHERE A.kulcs IS NULL",
            "SELECT * FROM A FULL OUTER JOIN B ON A.kulcs=B.kulcs WHERE A.kulcs IS NULL OR B.kulcs IS NULL",
            "SELECT * FROM A RIGHT JOIN B ON A.kulcs=B.kulcs WHERE B.kulcs IS NULL"
        ],
        "correctAnswer": "SELECT * FROM A FULL OUTER JOIN B ON A.kulcs=B.kulcs WHERE A.kulcs IS NULL OR B.kulcs IS NULL",
        "topic": "Database / SQL"
    },
    {
        "id": 262,
        "question": "Adott a következő tábla: CAR (rend_sz, marka, tipus, szin, kivitel, evjarat, listaar). Melyik SQL parancs kérdezi le a 2023 előtti évjáratú autók márkáját és típusát?",
        "options": [
            "SELECT marka, tipus WHERE evjarat<2023 FROM car;",
            "SELECT * FROM car WHERE evjarat<2023;",
            "SELECT marka, tipus FROM car WHERE evjarat<2023;",
            "SELECT marka, evjarat FROM car WHERE evjarat>2023;"
        ],
        "correctAnswer": "SELECT marka, tipus FROM car WHERE evjarat<2023;",
        "topic": "Database / SQL"
    },
    {
        "id": 263,
        "question": "A fejlesztői csapat egy közös projekten dolgozik. Az elkészült kód központi repository-ja a https://github.com/user/project címen érhető el. Három branch van, beton, fejleszt és kiadas néven. Jelölje be az alábbiak közül az igaz állításokat!",
        "options": [
            "A repository helyi másolatát a git copy https://github.com/user/project paranccsal lehet elkészíteni",
            "A kiadas branchre a git remove kiadas paranccsal lehet átváltani.",
            "A git commit paranccsal lehet a helyi változásokat a központi repositoryba feltölteni.",
            "A git pull paranccsal lehet a központi repositoryban levő változásokat letölteni."
        ],
        "correctAnswer": [
            "A git pull paranccsal lehet a központi repositoryban levő változásokat letölteni."
        ],
        "topic": "Version Control / Git"
    },
        {
        "id": 213,
        "question": "A fejlesztői csapat egy közös projekten dolgozik. Az elkészült kód központi repository-ja a https://github.com/user/project címen érhető el. Három branch van, beton, fejleszt és kiadas néven. Jelölje be az alábbiak közül az igaz állításokat!",
        "options": [
            "A repository helyi másolatát a git copy https://github.com/user/project paranccsal lehet elkészíteni",
            "A kiadas branchre a git checkout kiadas paranccsal lehet átváltani.",
            "A git commit paranccsal lehet a helyi változásokat a központi repositoryba feltölteni.",
            "A git push paranccsal lehet a központi repositoryban levő változásokat letölteni."
        ],
        "correctAnswer": [
            "A kiadas branchre a git checkout kiadas paranccsal lehet átváltani.",
        ],
        "topic": "Version Control / Git"
    },
    {
        "id": 264,
        "question": "Adott a következő tábla: CAR (rend_sz, marka, tipus, szin, kivitel, evjarat, listaar). Mi a hatása a következő SQL utasításnak? DELETE FROM car WHERE evjarat BETWEEN 2020 AND 2022;",
        "options": [
            "Törli a car tábla összes adatát.",
            "Törli az evjarat mezőben lévő azon adatokat, amelyek 2020 és 2022 közé esnek.",
            "Törli azon autók összes adatát, amelyeket 2020 és 2022 között gyártottak.",
            "Törli azon autók összes adatát, amelyeket 2020-ban vagy 2022-ben gyártottak."
        ],
        "correctAnswer": "Törli azon autók összes adatát, amelyeket 2020 és 2022 között gyártottak.",
        "topic": "Database / SQL"
    },
    {
        "id": 265,
        "question": "Adott a következő tábla: CAR (rend_sz, marka, tipus, szin, kivitel, evjarat, listaar). Melyik SQL parancs ad hozzá egy teljesitmeny nevű mezőt a táblához?",
        "options": [
            "ADD TABLE car IN teljesitmeny INT;",
            "CREATE TABLE car ADD teljesitmeny INT;",
            "ALTER TABLE car ADD teljesitmeny INT;",
            "UPDATE TABLE car ADD teljesitmeny INT;"
        ],
        "correctAnswer": "ALTER TABLE car ADD teljesitmeny INT;",
        "topic": "Database / SQL"
    },
    {
        "id": 266,
        "question": "Adott a következő tábla: CAR (rend_sz, marka, tipus, szin, kivitel, evjarat, listaar). Melyik SQL parancs segítségével tudja kilistázni azon autók adatait, amik többe kerülnek, mint a Mazda MX5-ös model?",
        "options": [
            "SELECT * FROM car WHERE listaar>Mazda.MX5.listaar;",
            "SELECT * FROM car WHERE car.listaar>(SELECT * FROM car WHERE marka=’Mazda’ AND tipus=’MX5’);",
            "SELECT * FROM car WHERE car.listaar>(SELECT listaar FROM car WHERE marka=’Mazda’ AND tipus=’MX5’);",
            "SELECT * FROM car WHERE listaar>(SELECT marka=’Mazda’ AND tipus=’MX5’);"
        ],
        "correctAnswer": "SELECT * FROM car WHERE car.listaar>(SELECT listaar FROM car WHERE marka=’Mazda’ AND tipus=’MX5’);",
        "topic": "Database / SQL"
    },
    {
        "id": 267,
        "question": "Mit eredményez a következő SQL utasítás? SELECT iskola,Avg(pont) AS [Átlagos pont] FROM verseny GROUP BY iskola HAVING (Avg(pont)>80);",
        "options": [
            "Megmutatja az iskolák átlagos pontszámait",
            "Kikeresi azokat a tanulókat, akiknek a pontja 80 fölött van, és megadja az iskolájukat.",
            "Kiírja azon iskolák számát, ahol az átlagos pontszám 80 felett volt.",
            "Kikeresi azokat az iskolákat, ahol az átlagos pontszám 80 pont fölött van, és megadja az átlagos pontszámukat."
        ],
        "correctAnswer": "Kikeresi azokat az iskolákat, ahol az átlagos pontszám 80 pont fölött van, és megadja az átlagos pontszámukat.",
        "topic": "Database / SQL"
    },
    {
        "id": 268,
        "question": "Adott a következő tábla: BOOK (konyv_ID, szerzo, cim, kategoria, kiado, kiadev, ar). Melyik SQL parancs növeli az összes könyv árát 20%-al?",
        "options": [
            "UPDATE book SET ar=ar+20;",
            "UPDATE book SET ar=ar*1.2;",
            "ALTER TABLE book SET ar=ar*1.2",
            "UPDATE book SET ar=ar*1.8 WHERE ar<5000;"
        ],
        "correctAnswer": "UPDATE book SET ar=ar*1.2;",
        "topic": "Database / SQL"
    },
    {
        "id": 269,
        "question": "Melyik vezérlési szerkezet általános alakja a következő?\ndo{ciklusmag utasításai;}while (feltétel)",
        "options": [
            "kétirányú elágazás",
            "növekményes ciklus",
            "hátultesztelős ciklus",
            "elöltesztelős ciklus"
        ],
        "correctAnswer": "hátultesztelős ciklus",
        "topic": "Programozás / Vezérlési szerkezetek"
    },
    {
        "id": 270,
        "question": "Mit valósít meg a következő algoritmus?\nCiklus I:=1-től N-1-ig\nCiklus J:=I+1-től N-ig\nHa A[J]<A[I] Akkor Csere(A[I],A[J]) Elágazás vége Ciklus vége Ciklus vége",
        "options": [
            "Minimum-kiválasztásos rendezés",
            "Közvetlen kiválasztásos rendezés",
            "Buborékos rendezés",
            "Beillesztéses rendezés"
        ],
        "correctAnswer": "Minimum-kiválasztásos rendezés",
        "topic": "Algoritmusok / Rendezés"
    },

    {
        "id": 272,
        "question": "Mi lesz a decimális eredmény, ha bitenkénti AND műveletet végzünk 8 biten a következő két számon?\n124 AND 31",
        "options": [
            "28",
            "30",
            "31",
            "60"
        ],
        "correctAnswer": "28",
        "topic": "Számrendszerek / Logika"
    },
    {
        "id": 273,
        "question": "Az alábbiak közül mely adattípusok szolgálnak egész számok tárolására? ",
        "options": [
            "char",
            "string",
            "long",
            "float",
            "double"
        ],
        "correctAnswer": ["long"],
        "topic": "Programozás / Adattípusok"
    },
    {
        "id": 274,
        "question": "Melyik feltételt kell használnunk akkor, ha azt szeretnénk vizsgálni, hogy az adott évszám szökőév-e és egyben századforduló is?",
        "options": [
            "evszam % 4 != 0 || evszam % 100 != 0",
            "evszam % 4 != 0 && evszam % 100 != 0",
            "evszam % 4 == 0 && evszam % 100 == 0",
            "evszam % 4 == 0 || evszam % 100 == 0"
        ],
        "correctAnswer": "evszam % 4 == 0 && evszam % 100 == 0",
        "topic": "Programozás / Feltételek"
    },

    {
        "id": 276,
        "question": "Melyik adattípus biztosítja a leggazdaságosabb tárhelyfoglalást, ha egy tornász pontszámait szeretnénk eltárolni (a pontozó bírák által adható maximális pontszám 10, és tizedes értékeket is adhatnak pl.: 8,6)?",
        "options": [
            "short",
            "float",
            "double",
            "decimal"
        ],
        "correctAnswer": "float",
        "topic": "Programozás / Adattípusok"
    },
    {
        "id": 277,
        "question": "Melyik adatmodell esetén alkalmazható az SQL nyelv?",
        "options": [
            "hierarchikus",
            "hálós",
            "relációs",
            "EER"
        ],
        "correctAnswer": "relációs",
        "topic": "Database / SQL"
    },
    {
        "id": 278,
        "question": "Melyik fogalomhoz tartozik a következő meghatározás?\nOlyan változó, ami egy memóriacímet tartalmaz.",
        "options": [
            "Konstruktor",
            "Destruktor",
            "Metódus",
            "Mutató"
        ],
        "correctAnswer": "Mutató",
        "topic": "Programozás / Fogalmak"
    },
    {
        "id": 279,
        "question": "OOP (objektumorientált programozás) esetén melyik az a hozzáférési (láthatósági) szint, amelyben az adott taghoz csak az adott osztály és leszármazottjai férhetnek hozzá?",
        "options": [
            "public",
            "protected",
            "internal",
            "private"
        ],
        "correctAnswer": "protected",
        "topic": "Programozás / OOP"
    },
    {
        "id": 280,
        "question": "Mi nem igaz az algoritmusra?",
        "options": [
            "A feladat megoldásában mind a lépések számának, mind az egyes lépéseknek végesnek kell lennie.",
            "Minden lépésnek egyértelműnek kell lennie, hogy ne lehessen félreérteni.",
            "Fontos, hogy minden lépés elvégezhető legyen.",
            "Csak valamilyen algoritmus leíró nyelven készülhet."
        ],
        "correctAnswer": "Csak valamilyen algoritmus leíró nyelven készülhet.",
        "topic": "Algoritmusok / Alapfogalmak"
    },
    {
        "id": 281,
        "question": "Melyik nem része egy algoritmusnak?",
        "options": [
            "Szekvencia",
            "Specifikáció",
            "Szelekció",
            "Iteráció"
        ],
        "correctAnswer": "Specifikáció",
        "topic": "Algoritmusok / Alapfogalmak"
    },
    {
        "id": 282,
        "question": "Melyik kifejezés hiányzik a mondatból?\nObjektumorientált programozás esetén a ______________ felelős az objektum által használt erőforrások felszabadításáért.",
        "options": [
            "konstruktor",
            "destruktor",
            "metódus",
            "virtuális metódus"
        ],
        "correctAnswer": "destruktor",
        "topic": "Programozás / OOP"
    },

    {
        "id": 283,
        "question": "Mit csinál az alábbi programkód?\nint ertek = 12;\nstring eredmeny = \"\";\nfor (int i = 1; i < ertek+1; i++)\n{\n  if (ertek % i == 0)\n  {\n    eredmeny += i + \", \";\n  }\n}\nConsole.WriteLine(eredmeny);",
        "options": [
            "Kiírja 12 osztóit a képernyőre, kivéve a 12-öt, vesszővel elválasztva.",
            "Kiírja a 12 osztóit a képernyőre vesszővel elválasztva.",
            "Kiírja a 12 prímosztóit a képernyőre vesszővel elválasztva.",
            "Kiírja a számokat 1-től 12-ig a képernyőre vesszővel elválasztva."
        ],
        "correctAnswer": "Kiírja a 12 osztóit a képernyőre vesszővel elválasztva.",
        "topic": "Programozás / C# ciklusok"
    },
    {
        "id": 284,
        "question": "Mi kerül a képernyőre az alábbi program futásának eredményeként?\nfüggvény FV(X:egész):egész\nha (X<=1)\n  return 1\nreturn X * FV(X-1)\nfüggvény vége\nkiir(FV(4))",
        "options": [
            "4",
            "16",
            "24",
            "32"
        ],
        "correctAnswer": "24",
        "topic": "Programozás / Rekurzió"
    },
    {
        "id": 285,
        "question": "Melyik HTML utasítással jelezhetjük egy felsorolás elemeit?",
        "options": [
            "<dl>",
            "<li>",
            "<il>",
            "<list>"
        ],
        "correctAnswer": "<li>",
        "topic": "Webfejlesztés / HTML"
    },
    {
        "id": 286,
        "question": "Melyik HTML utasítás eredményez működő hiperhivatkozást?",
        "options": [
            "<a href=\"http://www.parlament.hu\">Országgyűlés</a>",
            "<a name=\"http://www.parlament.hu\">Országgyűlés</a>",
            "<a>http://www.parlament.hu</a>",
            "<a url=\"http://www.parlament.hu\">Országgyűlés</a>"
        ],
        "correctAnswer": "<a href=\"http://www.parlament.hu\">Országgyűlés</a>",
        "topic": "Webfejlesztés / HTML"
    },
    {
        "id": 287,
        "question": "Az alábbiak közül melyik határoz meg jelölőnégyzet típusú űrlap mezőt?",
        "options": [
            "<input type=\"check\" name=\"auto\" value=\"1\">",
            "<form type=\"checkbox\" name=\"auto\" value=\"1\">",
            "<input type=\"checkbox\" name=\"auto\" value=\"1\">",
            "<input type=\"checkname=\"auto\" value=\"1\">"
        ],
        "correctAnswer": "<input type=\"checkbox\" name=\"auto\" value=\"1\">",
        "topic": "Webfejlesztés / HTML űrlapok"
    },
    {
        "id": 288,
        "question": "Milyen tag-et kell használni a weboldalak táblázataiban a táblázat egy-egy cellájának meghatározására?",
        "options": [
            "<cell>",
            "<td>",
            "<tr>",
            "<table>"
        ],
        "correctAnswer": "<td>",
        "topic": "Webfejlesztés / HTML táblázatok"
    },
    {
        "id": 289,
        "question": "Melyik megoldással léphetünk vissza az előző oldalra egy weblapon?",
        "options": [
            "<a href=”history.back()”>Vissza</a>",
            "<a href=”history.go(-1)”>Vissza</a>",
            "<a href=”javascript:history.back()”>Vissza</a>",
            "<a href=”javascript.history.go(-1)”>Vissza</a>"
        ],
        "correctAnswer": "<a href=”javascript:history.back()”>Vissza</a>",
        "topic": "Webfejlesztés / JavaScript"
    },
    {
        "id": 290,
        "question": "Hogyan hozható létre egy weboldalon belül a „fejezet1” nevű könyvjelzőre mutató hivatkozás?",
        "options": [
            "<a name=\"#fejezet1\">Első fejezet</a>",
            "<a id=\"fejezet1\">Első fejezet</a>",
            "<a href=\"#fejezet1\">Első fejezet</a>",
            "<a href=\"fejezet1.html\">Első fejezet</a>"
        ],
        "correctAnswer": "<a href=\"#fejezet1\">Első fejezet</a>",
        "topic": "Webfejlesztés / HTML hivatkozások"
    },
    {
        "id": 291,
        "question": "HTML-ben melyik határoz meg egyszerű (egysoros) szöveges beviteli mezőt?",
        "options": [
            "<text name=\"cím\" value=\"\">",
            "<select type=\"text\" name=\"cím\" value=\"\">",
            "<option type=\"text\" name=\"cím\" value=\"\">",
            "<input type=\"text\" name=\"cím\" value=\"\">"
        ],
        "correctAnswer": "<input type=\"text\" name=\"cím\" value=\"\">",
        "topic": "Webfejlesztés / HTML űrlapok"
    },
    {
        "id": 292,
        "question": "Hogyan adható meg a HTML táblázatokban a keret vastagsága?",
        "options": [
            "a <table> \"line\" jellemzőjével",
            "a <table> \"border\" jellemzőjével",
            "a <table> \"margin\" jellemzőjével",
            "a <table> \"width\" jellemzőjével"
        ],
        "correctAnswer": "a <table> \"border\" jellemzőjével",
        "topic": "Webfejlesztés / HTML táblázatok"
    },
    {
        "id": 293,
        "question": "Mire szolgál a HTML űrlapoknál az <input type=\"button\"> tag?",
        "options": [
            "Szöveges beviteli mező elhelyezésére.",
            "\"Űrlap elküldése\" gomb elhelyezésére.",
            "Nyomógomb elhelyezésére.",
            "Az űrlap aláírására."
        ],
        "correctAnswer": "Nyomógomb elhelyezésére.",
        "topic": "Webfejlesztés / HTML űrlapok"
    },
    {
        "id": 294,
        "question": "Melyik HTML utasítással csatolhatjuk a külső CSS fájlt a weblaphoz?",
        "options": [
            "<stylesheet> rel=\"stylesheet\" mystyle.css type=\"text/css\"</stylesheet>",
            "<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">",
            "<style src=\"mystyle.css\" rel=\"stylesheet\" type=\"text/css\">",
            "<a href=\"mystyle.css\" rel=\"stylesheet\" type=\"text/css\"></a>"
        ],
        "correctAnswer": "<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">",
        "topic": "Webfejlesztés / CSS csatolása"
    },
    {
        "id": 295,
        "question": "Hogyan épül fel általánosan egy CSS utasítás?",
        "options": [
            "kijelölö{tulajdonság1:ertek1;tulajdonsag2:ertek2;}",
            "kijelölö{tulajdonság1,tulajdonsag2:ertek1,ertek2;}",
            "#tulajdonság{kijelölö: ertek1:ertek2;}",
            ".tulajdonság{kijelölö: ertek1:ertek2;}"
        ],
        "correctAnswer": "kijelölö{tulajdonság1:ertek1;tulajdonsag2:ertek2;}",
        "topic": "Webfejlesztés / CSS szintaxis"
    },
    {
        "id": 296,
        "question": "Melyik CSS utasítás igazítja balra a picture azonosítójú képet?",
        "options": [
            ".picture{text-align:left}",
            "#picture{float:left}",
            "#picture{text-align:left}",
            ".picture{float:left}"
        ],
        "correctAnswer": "#picture{float:left}",
        "topic": "Webfejlesztés / CSS"
    },
    {
        "id": 297,
        "question": "Melyik CSS utasítással készíthetünk egy olyan „side” azonosítójú szelektort, amely a magasságot 500, a szélességet 80 képpontosra állítja?",
        "options": [
            "#side{height:80px;width:500px}",
            ".side{height:500px;width:80px}",
            "#side{height:500px;width:80px}",
            ".side{height:80px;width:500px}"
        ],
        "correctAnswer": "#side{height:500px;width:80px}",
        "topic": "Webfejlesztés / CSS szelektorok"
    },
    {
        "id": 298,
        "question": "Mit eredményez a következő CSS utasítás: h2 {text-decoration:underline;}",
        "options": [
            "A címsort h2-re állítja.",
            "Hibás utasítás.",
            "A h2 címsort színesre állítja.",
            "A h2 címsort aláhúzottra állítja."
        ],
        "correctAnswer": "A h2 címsort aláhúzottra állítja.",
        "topic": "Webfejlesztés / CSS"
    },
    {
        "id": 299,
        "question": "Melyik CSS utasítással állíthatjuk a weboldal „menü” elemének betűtípusát Arialra?",
        "options": [
            "body {text-style:Arial;}",
            "text {font-family:Arial;}",
            "menu {font-family:Arial;}",
            "body {text-family:Arial;}"
        ],
        "correctAnswer": "menu {font-family:Arial;}",
        "topic": "Webfejlesztés / CSS"
    },
    {
        "id": 300,
        "question": "Mit végez el a következő CSS utasítás? #kép {width:200px;}",
        "options": [
            "Az összes kép szélességét 200 pontosra állítja.",
            "A kép osztályú elem szélességét 200 pontosra állítja.",
            "A kép azonosítójú elem szélességét 200 pontosra állítja.",
            "Ez egy hibás utasítás."
        ],
        "correctAnswer": "A kép azonosítójú elem szélességét 200 pontosra állítja.",
        "topic": "Webfejlesztés / CSS"
    },
      {
    "id": 301,
    "question": "CSS-ben keretet szeretne készíteni a következő keretvastagságokkal: Felső keret = 10 képpont, alsó keret = 5 képpont, bal oldali keret = 20 képpont, jobb oldali keret = 1 képpont. Melyik a helyes parancs erre a célra?",
    "options": [
      "border-width:10px 20px 5px 1px;",
      "border-width:10px 1px 5px 20px;",
      "border-width:10px 5px 20px 1px;",
      "border-width:5px 20px 10px 1px;"
    ],
    "correctAnswer": "border-width:10px 1px 5px 20px;",
    "topic": "Webfejlesztés / CSS"
  },
  {
    "id": 302,
    "question": "Melyik CSS utasítás szünteti meg a hiperhivatkozások aláhúzását?",
    "options": [
      "a {text-decoration:none;}",
      "a {underline:none;}",
      "a {text-decoration:no-underline;}",
      "{decoration:no-underline;}"
    ],
    "correctAnswer": "a {text-decoration:none;}",
    "topic": "Webfejlesztés / CSS"
  },
  {
    "id": 303,
    "question": "Melyik JavaScript kód változtatja meg az alábbi „proba” azonosítójú bekezdésben megjelenő szöveget?\n<p id=\"proba\">Jó reggelt!</p>",
    "options": [
      "document.getElement(\"p\").innerHTML = \"Jó napot!\";",
      "#proba.innerHTML = \"Jó napot!\";",
      "document.getElementByName(\"p\").innerHTML = \"Jó napot!\";",
      "document.getElementById(\"proba\").innerHTML = \"Jó napot!\";"
    ],
    "correctAnswer": "document.getElementById(\"proba\").innerHTML = \"Jó napot!\";",
    "topic": "Webfejlesztés / JavaScript DOM"
  },
  {
    "id": 304,
    "question": "Hogyan épül fel a számlálós ciklus ciklusfeje JavaScriptben?",
    "options": [
      "for i in range(1,5)",
      "for i range(0;5)",
      "for (i = 0; i <= 5; i++)",
      "for (i <= 5; i++)"
    ],
    "correctAnswer": "for (i = 0; i <= 5; i++)",
    "topic": "Webfejlesztés / JavaScript ciklusok"
  },
  {
    "id": 305,
    "question": "Az alábbiak közül melyik hoz létre 3 elemű tömböt JavaScriptben?",
    "options": [
      "var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")",
      "var colors = (1:\"red\", 2:\"green\", 3:\"blue\")",
      "var colors = {\"red\", \"green\", \"blue\"}",
      "var colors = [\"red\", \"green\", \"blue\"]"
    ],
    "correctAnswer": "var colors = [\"red\", \"green\", \"blue\"]",
    "topic": "Webfejlesztés / JavaScript tömbök"
  },
  {
    "id": 306,
    "question": "Hogyan írhatjuk egy figyelmeztető ablakba a \"Hello\" szöveget JavaScriptben?",
    "options": [
      "msg(\"Hello\");",
      "alertBox(\"Hello\");",
      "alert(\"Hello\");",
      "msgBox(\"Hello\");"
    ],
    "correctAnswer": "alert(\"Hello\");",
    "topic": "Webfejlesztés / JavaScript"
  },
  {
    "id": 307,
    "question": "Melyik HTML elembe kell elhelyezni a JavaScript kódot?",
    "options": [
      "<javascript>",
      "<script>",
      "<scripting>",
      "<js>"
    ],
    "correctAnswer": "<script>",
    "topic": "Webfejlesztés / HTML + JavaScript"
  },
  {
    "id": 308,
    "question": "JavaSriptben melyik metódussal csonkolható egy tört szám egészre?",
    "options": [
      "Math.pow()",
      "round()",
      "Math.floor()",
      "Math.round()"
    ],
    "correctAnswer": "Math.floor()",
    "topic": "Webfejlesztés / JavaScript számok"
  },
  {
    "id": 309,
    "question": "Milyen tag-et kell használni a weboldalak táblázataiban a táblázat egy-egy fejléc cellájának meghatározására?",
    "options": [
      "<cell>",
      "<td>",
      "<head>",
      "<th>"
    ],
    "correctAnswer": "<th>",
    "topic": "Webfejlesztés / HTML táblázatok"
  },
  {
    "id": 310,
    "question": "Az alábbiak közül melyik nem része egy HTML oldal szerkezetének?",
    "options": [
      "header",
      "body",
      "caption",
      "head"
    ],
    "correctAnswer": "caption",
    "topic": "Webfejlesztés / HTML struktúra"
  },
  {
    "id": 311,
    "question": "Az alábbiak közül melyik nem része a HTML5 szemantikus szerkezetének?",
    "options": [
      "header",
      "main",
      "nav",
      "table",
      "section"
    ],
    "correctAnswer": "table",
    "topic": "Webfejlesztés / HTML5 szemantika"
  },
  {
    "id": 312,
    "question": "Mi lesz az eredménye a css opacity:0.3; utasításnak, ha egy képre alkalmazzák?",
    "options": [
      "semmi",
      "a kép 30% ban átlátszó lesz",
      "a kép fele részben átlátszó lesz",
      "a kép 70% ban átlátszó lesz"
    ],
    "correctAnswer": "a kép 30% ban átlátszó lesz",
    "topic": "Webfejlesztés / CSS vizuális effektek"
  },
  {
    "id": 313,
    "question": "Az alábbiak közül melyik paraméter nem használható css-ben a háttér beállításainak módosítására?",
    "options": [
      "url(\"img_tree.png\");",
      "no-repeat;",
      "fixed",
      "double"
    ],
    "correctAnswer": "double",
    "topic": "Webfejlesztés / CSS háttér"
  },
  {
    "id": 314,
    "question": "CSS formázással szeretnék az oldalon egy képet középre igazítani úgy, hogy a környező szövegektől külön sorba kerüljön. Mi kerüljön a display tulajdonság paraméterébe?",
    "options": [
      "semmi",
      "inline",
      "block",
      "inline-block"
    ],
    "correctAnswer": "block",
    "topic": "Webfejlesztés / CSS display"
  },
  {
    "id": 315,
    "question": "Mire való egy HTML oldalon a meta tagbe elhelyezett viewport tulajdonság beállítása?",
    "options": [
      "nincs hatása a megjelenítésre",
      "segítségével az eszköz méretéhez igazíthatjuk a tartalmak méretét",
      "beállíthatjuk vele az oldalak legfelső szintjét",
      "különféle nézőpontokat definiálhatunk vele"
    ],
    "correctAnswer": "segítségével az eszköz méretéhez igazíthatjuk a tartalmak méretét",
    "topic": "Webfejlesztés / HTML meta viewport"
  },
  {
    "id": 316,
    "question": "Az alábbi CSS méret meghatározó mértékegységek közül melyik függ a megjelenítő eszköz dpi felbontásától?",
    "options": [
      "cm",
      "px",
      "pt",
      "mm"
    ],
    "correctAnswer": "px",
    "topic": "Webfejlesztés / CSS mértékegységek"
  },
  {
    "id": 317,
    "question": "Az alábbiak közül melyik CSS szelektorral lehet hivatkozni az összes olyan bekezdésre, amik a div elemen belül helyezkednek el?",
    "options": [
      "div, p",
      "div p",
      "div>p",
      "div+p"
    ],
    "correctAnswer": "div p",
    "topic": "Webfejlesztés / CSS szelektorok"
  },
  {
    "id": 318,
    "question": "Mi az a Bootstrap?",
    "options": [
      "BIOS beállítás, amivel meg lehet határozni a gép indításáért felelős eszközt",
      "JS és CSS keretrendszer",
      "Egy Boot manager program",
      "Statikus weblapok készítéséhez használt segédprogram"
    ],
    "correctAnswer": "JS és CSS keretrendszer",
    "topic": "Webfejlesztés / Keretrendszerek"
  }

]

//111től kezdtem és 318 kérdés lett végén (318 full)
