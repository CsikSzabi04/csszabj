import React, { useState, useEffect } from 'react';
import { hivQuestions } from './HivQuestions';

const TOTAL_QUESTIONS = hivQuestions.length;
const QUESTIONS_PER_ROUND = 20;
const MAX_ROUNDS = 10;

const Hiv = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [roundQuestions, setRoundQuestions] = useState([]);
    const [quizStarted, setQuizStarted] = useState(false);
    const [roundNumber, setRoundNumber] = useState(1);
    const [usedQuestionIds, setUsedQuestionIds] = useState(new Set());
    const [roundsHistory, setRoundsHistory] = useState([]);
    const [scoresPerRound, setScoresPerRound] = useState([]);
    const [availableQuestions, setAvailableQuestions] = useState([...hivQuestions]);

    // Reset available questions when all are used
    useEffect(() => {
        if (availableQuestions.length === 0) {
            setAvailableQuestions([...hivQuestions]);
            setUsedQuestionIds(new Set());
            console.log("Reset available questions pool");
        }
    }, [availableQuestions]);

    const getQuestionsForRound = () => {
        // If we've used all questions, reset the pool
        if (usedQuestionIds.size >= hivQuestions.length) {
            setUsedQuestionIds(new Set());
            setAvailableQuestions([...hivQuestions]);
            console.log("Resetting question pool as all questions have been used");
        }

        // Filter out used questions
        const unusedQuestions = availableQuestions.filter(q => !usedQuestionIds.has(q.id));
        
        // If not enough questions left, reset the pool
        if (unusedQuestions.length < QUESTIONS_PER_ROUND) {
            setUsedQuestionIds(new Set());
            setAvailableQuestions([...hivQuestions]);
            console.log("Resetting question pool as not enough questions left");
            return getQuestionsForRound(); // Recursively call with fresh pool
        }

        // Shuffle the unused questions
        const shuffled = [...unusedQuestions].sort(() => 0.5 - Math.random());
        
        // Take the first QUESTIONS_PER_ROUND questions
        const selectedQuestions = shuffled.slice(0, QUESTIONS_PER_ROUND);
        
        // Update used question IDs
        const newUsedIds = new Set(usedQuestionIds);
        selectedQuestions.forEach(q => newUsedIds.add(q.id));
        setUsedQuestionIds(newUsedIds);
        
        // Update available questions
        setAvailableQuestions(prev => prev.filter(q => !newUsedIds.has(q.id)));

        // Update rounds history for debugging
        const newRoundsHistory = [...roundsHistory, selectedQuestions.map(q => q.id)];
        setRoundsHistory(newRoundsHistory);
        
        // Debug check for duplicates
        checkForDuplicates(newRoundsHistory);

        return selectedQuestions;
    };

    const checkForDuplicates = (rounds) => {
        const allQuestionIds = rounds.flat();
        const uniqueIds = new Set(allQuestionIds);
        
        if (allQuestionIds.length !== uniqueIds.size) {
            console.log("Duplicate questions detected in rounds history");
            return true;
        }
        console.log("No duplicate questions in rounds history");
        return false;
    };

    const startQuiz = () => {
        const questions = getQuestionsForRound();
        setRoundQuestions(questions);
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
        if (roundNumber >= MAX_ROUNDS) {
            setRoundNumber(roundNumber + 1); // Just to disable further buttons
            return;
        }

        const score = calculateScore();
        setScoresPerRound(prev => [...prev, score]);

        setSelectedAnswers({});
        setCurrentQuestionIndex(0);
        setShowResults(false);
        setRoundNumber(prev => prev + 1);

        const questions = getQuestionsForRound();
        setRoundQuestions(questions);
    };

    const resetQuizAtom = () => {
        setScoresPerRound([]);
        setUsedQuestionIds(new Set());
        setAvailableQuestions([...hivQuestions]);
        setRoundNumber(1);
        setQuizStarted(false);
        setShowResults(false);
        setSelectedAnswers({});
    };

    if (!quizStarted) {
        return (
            <div className="scroll-container text-gray-100 font-sans antialiased p-8 flex flex-col items-center">
                <div className="w-full max-w-2xl bg-black bg-opacity-70 rounded-2xl shadow-lg p-6 fade-in visible text-center">
                    <h2 className="text-2xl font-bold gradient-text mb-6">Programming Quiz</h2>
                    <p className="mb-6">Round {roundNumber}: You'll get 20 random questions from our database. <br /> <span style={{fontWeight:'bold', color:"green"}}>( You should do all 10 rounds cause there are 200 questions! )</span> <br /><span style={{fontWeight:'bold', color:"red", fontSize:"small"}}>( Az összes kérdést megnéztem hogy a válaszok jók-e)</span> </p>
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

                        <h2 className="text-xl font-bold gradient-text mb-6">{currentQuestion.question}</h2>

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
                                    onClick={() => {
                                        const score = calculateScore();
                                        if (scoresPerRound.length < roundNumber) {
                                            setScoresPerRound(prev => [...prev, score]);
                                        }
                                        setShowResults(true);
                                    }}
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
                            <p className="text-xl mb-2">You scored {score} out of {totalQuestions}</p>
                            <p className="text-lg">({Math.round((score / totalQuestions) * 100)}%)</p>
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

                                                if (option === userAnswer && option !== q.correctAnswer) {
                                                    optionClass = "text-red-400 line-through font-semibold ml-5";
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

                        <div className="flex justify-center mb-6">
                            {roundNumber < MAX_ROUNDS ? (
                                <button
                                    onClick={resetQuiz}
                                    className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700"
                                >
                                    Start Next Round
                                </button>
                            ) : (
                                <div className="mt-10 text-center bg-gray-900 p-6 rounded-xl w-full max-w-2xl">
                                    <h3 className="text-xl font-bold text-white mb-4">Round Summary</h3>

                                    <div className="space-y-3 text-left text-gray-300">
                                        {scoresPerRound.map((score, index) => (
                                            <div key={index} className="flex justify-between">
                                                <span>Round {index + 1}</span>
                                                <span>
                                                    {score} / {QUESTIONS_PER_ROUND} ({Math.round((score / QUESTIONS_PER_ROUND) * 100)}%)
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <hr className="my-4 border-gray-600" />

                                    <div className="text-white font-semibold">
                                        Total: {scoresPerRound.reduce((acc, s) => acc + s, 0)} / {MAX_ROUNDS * QUESTIONS_PER_ROUND} (
                                        {Math.round(
                                            (scoresPerRound.reduce((acc, s) => acc + s, 0) / (MAX_ROUNDS * QUESTIONS_PER_ROUND)) * 100
                                        )}%)
                                    </div>
                                    <button
                                        onClick={resetQuizAtom}
                                        className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 mt-10"
                                    >
                                        Restart Quiz
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hiv;