import express from "express";
import cors from "cors";

const app = express();
const PORT = 88;

app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

const TOTAL_QUESTIONS = 100; // Should match the number of questions in AllQuestions.js
const QUESTIONS_PER_ROUND = 20;
const MAX_ROUNDS = 4;

let usedQuestionIds = new Set();
let roundCounter = 0;
let roundsHistory = [];

function checkForDuplicates(rounds) {
  for (let i = 0; i < rounds.length; i++) {
    for (let j = i + 1; j < rounds.length; j++) {
      const setA = new Set(rounds[i]);
      const setB = new Set(rounds[j]);
      for (const item of setB) {
        if (setA.has(item)) {
          console.log(`Overlap between round ${i + 1} and ${j + 1}: question ID ${item}`);
          return true;
        }
      }
    }
  }
  console.log("No overlap between rounds.");
  return false;
}

app.get("/questionId", (req, res) => {
  if (roundCounter >= MAX_ROUNDS) {
    usedQuestionIds.clear();
    roundCounter = 0;
    roundsHistory = [];
    console.log("Resetting: cleared all saved question IDs and round history");
  }

  const availableQuestions = [];
  for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
    if (!usedQuestionIds.has(i)) availableQuestions.push(i);
  }

  const countToTake = Math.min(QUESTIONS_PER_ROUND, availableQuestions.length);

  const selectedQuestions = [];
  while (selectedQuestions.length < countToTake) {
    const randIndex = Math.floor(Math.random() * availableQuestions.length);
    const questionId = availableQuestions[randIndex];
    if (!selectedQuestions.includes(questionId)) {
      selectedQuestions.push(questionId);
      availableQuestions.splice(randIndex, 1);
    }
  }

  selectedQuestions.forEach(id => usedQuestionIds.add(id));
  roundCounter++;

  roundsHistory.push(selectedQuestions);

  console.log(`Round #${roundCounter}: sent questions:`, selectedQuestions);
  checkForDuplicates(roundsHistory);

  res.json({
    round: roundCounter,
    questionIds: selectedQuestions,
    allRounds: roundsHistory
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});