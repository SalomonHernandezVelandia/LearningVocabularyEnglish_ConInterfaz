// ==========================================================
// PRACTICE RESULT
// ==========================================================

function showPracticeResult() {
    const lang = getCurrentMessages();
    const total = practiceState.totalQuestions;
    const correct = practiceState.correctAnswers;
    const incorrect = practiceState.incorrectAnswers;

    const percentage =
        total > 0
            ? Math.round(
                (correct / total) * 100
            )
            : 0;

    document.getElementById("practice-result-title").textContent =lang.practice_finished;

    document.getElementById(
        "practice-result-score"
    ).textContent =
        lang.score_result.replace(
            "{percentage}",
            percentage
        );

    document.getElementById(
        "practice-result-stats"
    ).textContent =
        `${correct} ${lang.correct_results} · ` +
        `${incorrect} ${lang.incorrect_results}`;

    updateReturnToStartButton();

    document.getElementById(
        "practice-result"
    ).hidden = false;
}


// ==========================================================
// FINISH PRACTICE
// ==========================================================
function finishPractice() {
    document.getElementById("question-word").style.display = "none";
    document.getElementById("answer-input").style.display = "none";
    document.getElementById("answer-button").style.display = "none";
    document.getElementById("answer-feedback" ).style.display = "none";
    const instructions =document.getElementById("translation-instructions");

    if (instructions) {
        instructions.textContent = "";
    }
    showPracticeResult();
}


// ==========================================================
// RETURN TO START
// ==========================================================
function returnToStart() {
    const practiceResult =document.getElementById("practice-result");
    if (practiceResult) {
        practiceResult.hidden = true;
    }
    const resultTitle = document.getElementById("practice-result-title");
    const resultScore = document.getElementById("practice-result-score");
    const resultStats = document.getElementById("practice-result-stats");

    if (resultTitle) {
        resultTitle.textContent = "";
    }

    if (resultScore) {
        resultScore.textContent = "";
    }

    if (resultStats) {
        resultStats.textContent = "";
    }

    // SHOW INITIAL SCREEN
    document.getElementById("language-selection").hidden = false;

    // HIDE OTHER SCREENS
    document.getElementById("level-selection").hidden = true;
    document.getElementById("category-selection").hidden = true;
    document.getElementById("irregular-verbs-selection").hidden = true;
    document.getElementById("vocabulary-practice").hidden = true;
    document.getElementById("irregular-tenses-practice").hidden = true;


    // RESET IRREGULAR TENSES UI
    const irregularGrid = document.getElementById("irregular-tenses-grid");
    if (irregularGrid) {
        irregularGrid.innerHTML = "";
    }

    const irregularFeedback = document.getElementById("irregular-answer-feedback");
    if (irregularFeedback) {
        irregularFeedback.textContent = "";
        irregularFeedback.className ="answer-feedback";
    }

    const irregularButton = document.getElementById("irregular-answer-button");
    if (irregularButton) {
        irregularButton.style.display = "";
        irregularButton.disabled = false;
    }
    const questionWord = document.getElementById("question-word");
    questionWord.style.display = "";
    questionWord.textContent = "";
    const answerInput = document.getElementById("answer-input");
    answerInput.style.display = "";
    answerInput.value = "";
    answerInput.disabled = false;
    answerInput.classList.remove("answer-input--correct", "answer-input--incorrect");
    const answerButton = document.getElementById("answer-button");
    answerButton.style.display = "";
    answerButton.disabled = false;
    const feedback = document.getElementById("answer-feedback");
    feedback.style.display = "";
    feedback.textContent = "";
    feedback.className = "answer-feedback";

    // RESET SPECIAL INSTRUCTIONS
    const instructions = document.getElementById("translation-instructions");
    if (instructions) {
        instructions.textContent = "";
        instructions.style.display = "none";
    }

    // RESET PRACTICE STATE
    practiceState.questions = [];
    practiceState.currentQuestion = 0;
    practiceState.totalQuestions = 0;
    practiceState.currentWord = null;
    practiceState.currentAnswer = null;
    practiceState.answered = false;
    practiceState.correctAnswers = 0;
    practiceState.incorrectAnswers = 0;

    // IRREGULAR VERBS
    practiceState.irregularTenseQuestions = [];
    practiceState.irregularTenseAnswered = false;

    // RESET STATS
    updatePracticeStats();

    // INITIAL MESSAGE
    const lang = getCurrentMessages();

    document.getElementById(
        "main-message"
    ).textContent =
        lang.language_selection;
}
