// ==========================================================
// ¿Qué pantalla/elemento mostramos?
// ==========================================================

function showPracticeScreen() {
    document.getElementById("language-selection").hidden = true;
    document.getElementById("level-selection").hidden = true;
    document.getElementById("category-selection").hidden = true;
    document.getElementById("irregular-verbs-selection").hidden = true;
    document.getElementById("vocabulary-practice").hidden = false;
    const lang = getCurrentMessages();
    document.getElementById("main-message").textContent = lang.translation_input;

    const instructions =
        document.getElementById(
            "translation-instructions"
        );

    if (instructions) {
        instructions.textContent = "";
        instructions.style.display = "none";
    }

    document.getElementById("answer-button").textContent = lang.next;
}


// ==========================================================
// RENDER CURRENT VOCABULARY QUESTION
// ==========================================================
function renderCurrentVocabularyQuestion() {
    const lang = getCurrentMessages();
    const questionWord = document.getElementById("question-word");
    questionWord.textContent = practiceState.currentWord;
    updateTranslationInstructions();

    document.getElementById(
        "question-progress"
    ).textContent =
        `${lang.question} ${
            practiceState.currentQuestion + 1
        }/${practiceState.totalQuestions}`;

    const input = document.getElementById("answer-input");
    const questionBody = document.querySelector(".question__body");
    input.value = "";
    input.disabled = false;
    input.classList.remove("answer-input--correct", "answer-input--incorrect" );
    questionBody.classList.remove("question__body--correct", "question__body--incorrect");
    
    input.focus();

    const feedback = document.getElementById("answer-feedback");
    feedback.textContent = "";
    feedback.className = "answer-feedback";
    document.getElementById("answer-button").textContent = lang.next;
}