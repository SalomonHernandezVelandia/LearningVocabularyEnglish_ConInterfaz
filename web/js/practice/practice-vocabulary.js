// ==========================================================
// ¿Cómo funciona practicar vocabulario?
// ==========================================================

function startVocabularyPractice() {
    const result = document.getElementById("practice-result");
    if (result) {
        result.hidden = true;
    }

    const amount = state.customAmount;
    const category = state.categoryMode;

    if (!amount) {
        console.error("No amount of words selected.");
        return;
    }

    if (!category) {
        console.error("No category selected.");
        return;
    }

    practiceState.questions = generateQuestions(category, amount);
    practiceState.currentQuestion = 0;
    practiceState.totalQuestions = practiceState.questions.length;
    practiceState.answered = false;
    practiceState.correctAnswers = 0;
    practiceState.incorrectAnswers = 0;
    updatePracticeStats();
    showPracticeScreen();
    showCurrentQuestion();
}


// ==========================================================
// SHOW CURRENT QUESTION
// ==========================================================
function showCurrentQuestion() {
    if (practiceState.currentQuestion >= practiceState.totalQuestions) {
        finishPractice();
        return;
    }

    const entry =
        practiceState.questions[
            practiceState.currentQuestion
        ];

    const englishWord = entry[0];
    const spanishWord = entry[1];

    if (state.languageMode === "es") {
        practiceState.currentWord = spanishWord;
        practiceState.currentAnswer = englishWord;
    } else {
        practiceState.currentWord = englishWord;
        practiceState.currentAnswer = spanishWord;
    }
    practiceState.answered = false;
    renderCurrentVocabularyQuestion();
}


// ==========================================================
// HANDLE ANSWER
// ==========================================================
function handleAnswer() {
    if (practiceState.answered) {
        return;
    }
    const input = document.getElementById("answer-input");
    const userAnswer = normalizeAnswer(input.value);

    if (!userAnswer) {
        input.focus();
        return;
    }
    const correctAnswer =
        normalizeAnswer(
            practiceState.currentAnswer
        );

    practiceState.answered = true;
    input.disabled = true;

    const isCorrect =
        userAnswer === correctAnswer;

    if (isCorrect) {
        showCorrectAnswer();
        practiceState.correctAnswers++;
    } else {
        showIncorrectAnswer();
        practiceState.incorrectAnswers++;
    }

    updatePracticeStats();
    const answerButton = document.getElementById("answer-button");
    answerButton.disabled = true;
    const delay = isCorrect ? 1000 : 3000;

    setTimeout(() => {
        answerButton.disabled = false;
        nextQuestion();
    }, delay);
}


// ==========================================================
// NEXT QUESTION
// ==========================================================
function nextQuestion() {
    practiceState.currentQuestion++;
    showCurrentQuestion();
}