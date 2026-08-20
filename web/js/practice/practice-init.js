// ==========================================================
// ¿Cómo conectamos los botones/eventos?
// ==========================================================

function initializePractice() {
    const backToStartButton = document.getElementById("back-to-start-button");
    if (backToStartButton) {
        backToStartButton.addEventListener(
            "click",
            returnToStart
        );
    }
    updateReturnToStartButton();

    // NORMAL VOCABULARY BUTTON
    const answerButton = document.getElementById("answer-button");
    if (answerButton) {
        answerButton.addEventListener(
            "click",
            handleAnswer
        );
    }

    // NORMAL VOCABULARY ENTER
    const answerInput = document.getElementById("answer-input");
    if (answerInput) {
        answerInput.addEventListener(
            "keydown",
            event => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    handleAnswer();
                }
            }
        );
    }

    // IRREGULAR VERBS BUTTON
    const irregularButton = document.getElementById("irregular-answer-button");
    if (irregularButton) {
        irregularButton.addEventListener(
            "click",
            handleIrregularTensesAnswer
        );
    }

    // IRREGULAR VERBS ENTER
    const irregularGrid =document.getElementById("irregular-tenses-grid");
    if (irregularGrid) {
        irregularGrid.addEventListener(
            "keydown",
            handleIrregularTensesEnter
        );
    }
}


function handleIrregularTensesEnter(event) {
    if (event.key !== "Enter") {
        return;
    }
    event.preventDefault();
    const grid = document.getElementById("irregular-tenses-grid");

    const inputs = [
        ...grid.querySelectorAll(
            ".irregular-tense-input"
        )
    ];

    const currentIndex =inputs.indexOf(event.target);

    if (currentIndex < inputs.length - 1) {
        inputs[
            currentIndex + 1
        ].focus();

        return;
    }
    handleIrregularTensesAnswer();
}

document.addEventListener(
    "DOMContentLoaded",
    initializePractice
);