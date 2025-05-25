import React, { useState, useEffect } from 'react';
import { allQuestions } from './AllQuestions';

const TOTAL_QUESTIONS = allQuestions.length;
const QUESTIONS_PER_ROUND = 20;
const MAX_ROUNDS = 4;

const Questions = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [roundQuestions, setRoundQuestions] = useState([]);
    const [quizStarted, setQuizStarted] = useState(false);
    const [roundNumber, setRoundNumber] = useState(1);
    const [usedQuestionIds, setUsedQuestionIds] = useState(new Set());
    const [roundsHistory, setRoundsHistory] = useState([]);

    const getQuestionsForRound = () => {
        // Reset if we've completed all rounds
        if (roundNumber > MAX_ROUNDS) {
            setUsedQuestionIds(new Set());
            setRoundNumber(1);
            setRoundsHistory([]);
            console.log("Resetting: cleared all saved question IDs and round history");
        }

        const availableQuestions = allQuestions
            .filter(q => !usedQuestionIds.has(q.id))
            .map(q => q.id);

        const countToTake = Math.min(QUESTIONS_PER_ROUND, availableQuestions.length);
        const selectedQuestions = [];

        // Randomly select questions
        while (selectedQuestions.length < countToTake && availableQuestions.length > 0) {
            const randIndex = Math.floor(Math.random() * availableQuestions.length);
            selectedQuestions.push(availableQuestions[randIndex]);
            availableQuestions.splice(randIndex, 1);
        }

        // Update state
        const newUsedIds = new Set(usedQuestionIds);
        selectedQuestions.forEach(id => newUsedIds.add(id));
        setUsedQuestionIds(newUsedIds);

        const newRoundsHistory = [...roundsHistory, selectedQuestions];
        setRoundsHistory(newRoundsHistory);

        console.log(`Round #${roundNumber}: selected questions:`, selectedQuestions);
        checkForDuplicates(newRoundsHistory);

        return selectedQuestions;
    };

    const checkForDuplicates = (rounds) => {
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
    };

    const startQuiz = () => {
        const questionIds = getQuestionsForRound();
        const filteredQuestions = allQuestions.filter(q => questionIds.includes(q.id));
        setRoundQuestions(filteredQuestions);
        setQuizStarted(true);
    };

    const handleAnswerSelect = (questionId, answer) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < roundQuestions.length - 1) {
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
        roundQuestions.forEach(q => {
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
        setRoundNumber(prev => prev + 1);
        const questionIds = getQuestionsForRound();
        const filteredQuestions = allQuestions.filter(q => questionIds.includes(q.id));
        setRoundQuestions(filteredQuestions);
        setQuizStarted(true);
    };

    const resetQuizAtom = () => {
        window.location.reload();
    };

    if (!quizStarted) {
        return (
            <div className="scroll-container text-gray-100 font-sans antialiased p-8 flex flex-col items-center">
                <div className="w-full max-w-2xl bg-black bg-opacity-70 rounded-2xl shadow-lg p-6 fade-in visible text-center">
                    <h2 className="text-2xl font-bold gradient-text mb-6">Programming Quiz</h2>
                    <p className="mb-6">Round {roundNumber}: You'll get 20 random questions from our database.</p>
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

    if (roundQuestions.length === 0) {
        return <div className="text-white text-center p-8">No questions available for this round.</div>;
    }

    const currentQuestion = roundQuestions[currentQuestionIndex];
    const totalQuestions = roundQuestions.length;
    const score = calculateScore();

    return (
        <div className="scroll-container text-gray-100 font-sans antialiased p-8 flex flex-col items-center">
            <div className="w-full max-w-2xl bg-black bg-opacity-70 rounded-2xl shadow-lg p-6 fade-in visible">
                {!showResults ? (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-400">{currentQuestion.topic}</span>
                            <span className="text-sm text-gray-400">
                                Question {currentQuestionIndex + 1}/{totalQuestions} (Round {roundNumber})
                            </span>
                        </div>

                        <h2 className="text-xl font-bold gradient-text mb-6">
                            {currentQuestion.question}
                        </h2>

                        <div className="space-y-3 mb-6">
                            {currentQuestion.options.map((option, index) => (
                                <div
                                    key={index}
                                    className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedAnswers[currentQuestion.id] === option
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
                                className={`px-4 py-2 rounded-lg ${currentQuestionIndex === 0
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
                            Quiz Results (Round {roundNumber})
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
                            {roundQuestions.map((q, index) => {
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
                            {roundNumber < 4 ? (
                                <button
                                    onClick={resetQuiz}
                                    className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700"
                                >
                                    Start Next Round
                                </button>
                            ) : (
                                <button
                                    onClick={resetQuizAtom}
                                    className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700"
                                >
                                    Restart Quiz
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Questions;