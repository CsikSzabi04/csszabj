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
              {shuffledQuestions.map((q, index) => (
                <div key={q.id} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-gray-400">Question {index + 1}</span>
                    <span className="text-sm text-gray-400">{q.topic}</span>
                  </div>
                  
                  <p className="font-medium mb-2">{q.question}</p>
                  
                  <div className="space-y-2">
                    <p className={`text-sm ${
                      selectedAnswers[q.id] === q.correctAnswer 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}>
                      Your answer: {selectedAnswers[q.id] || "Not answered"}
                    </p>
                    
                    <p className="text-sm text-blue-400">
                      Correct answer: {q.correctAnswer}
                    </p>
                  </div>
                </div>
              ))}
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