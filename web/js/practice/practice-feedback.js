// ==========================================================
// ¿Cómo mostramos correcto/incorrecto?
// ==========================================================
function normalizeAnswer(answer) {
    return answer
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


// ==========================================================
// SHOW CORRECT ANSWER
// ==========================================================
function showCorrectAnswer() {
    const input = document.getElementById("answer-input");
    const feedback = document.getElementById("answer-feedback");
    const questionBody = document.querySelector(".question__body");
    input.classList.remove("answer-input--incorrect");
    input.classList.add("answer-input--correct");
    questionBody.classList.remove("question__body--incorrect");
    questionBody.classList.add("question__body--correct");
    const lang = getCurrentMessages();

    feedback.textContent =
        `✓ ${lang.correct}`;

    feedback.className = "answer-feedback answer-feedback--correct";
}


// ==========================================================
// SHOW INCORRECT ANSWER
// ==========================================================
function showIncorrectAnswer() {
    const input = document.getElementById("answer-input");
    const feedback = document.getElementById("answer-feedback");
    const questionBody = document.querySelector(".question__body");
    input.classList.remove("answer-input--correct");
    input.classList.add("answer-input--incorrect");
    questionBody.classList.remove("question__body--correct");
    questionBody.classList.add("question__body--incorrect");
    const lang = getCurrentMessages();

    feedback.textContent =
        `✗ ${lang.incorrect} — ${
            lang.correct_answer
        } ${
            practiceState.currentAnswer
        }`;

    feedback.className = "answer-feedback answer-feedback--incorrect";
}