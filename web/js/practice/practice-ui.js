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

// ==========================================================
// UPDATE RETURN TO START BUTTON
// ==========================================================

function updateReturnToStartButton() {
    const button = document.getElementById("back-to-start-button");
    if (!button) {
        return;
    }
    const lang = getCurrentMessages();
    button.textContent = lang.return_to_start;
}


function updateTranslationInstructions() {
    const instructions = document.getElementById("translation-instructions");

    if (!instructions) {
        return;
    }
    const lang = getCurrentMessages();
    instructions.textContent = "";
    instructions.style.display = "none";

    const answer = practiceState.currentAnswer;
    if (!answer) {
        return;
    }

    const messages = [];
    const parenthesesMatch = answer.match(/\s(\([^()]+\))$/);
    if (parenthesesMatch) {
        const marker = parenthesesMatch[1];
        messages.push(
            lang.special_marker_parentheses.replace(
                "{marker}",
                marker
            )
        );
    }

    const underscoreMatch =answer.match(/(_[A-Za-z0-9]+)$/);
    if (underscoreMatch) {
        const marker = underscoreMatch[1];
        messages.push(
            lang.special_marker_underscore.replace(
                "{marker}",
                marker
            )
        );
    }

    if (messages.length > 0) {
        instructions.textContent = messages.join(" ");
        instructions.style.display = "";
    }
}