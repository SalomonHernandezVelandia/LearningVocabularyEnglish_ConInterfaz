// ==========================================================
// ¿En qué estado está el juego?// 
// ==========================================================

const practiceState = {
    // NORMAL VOCABULARY
    questions: [],
    currentQuestion: 0,
    totalQuestions: 0,
    currentWord: null,
    currentAnswer: null,
    answered: false,

    // STATISTICS
    correctAnswers: 0,
    incorrectAnswers: 0,

    // IRREGULAR VERBS
    irregularTenseQuestions: [],
    irregularTenseAnswered: false
};