// ==========================================================
// ¿Cómo funcionan los verbos irregulares?
// ==========================================================

function startIrregularTensesPractice() {

    const amount =
        state.customAmount;

    if (!amount) {

        console.error(
            "No amount of words selected."
        );

        return;
    }

    practiceState.irregularTenseQuestions =
        generateIrregularVerbQuestions(amount);

    practiceState.currentQuestion = 0;

    practiceState.totalQuestions =
        practiceState.irregularTenseQuestions.length;

    practiceState.irregularTenseAnswered =
        false;

    practiceState.correctAnswers = 0;
    practiceState.incorrectAnswers = 0;

    updatePracticeStats();

    showIrregularTensesScreen();

    showCurrentIrregularTensesQuestion();
}


// ==========================================================
// HANDLE IRREGULAR TENSES ANSWER
// ==========================================================
function handleIrregularTensesAnswer() {
    // Prevent multiple submissions
    if (practiceState.irregularTenseAnswered) {
        return;
    }

    const grid = document.getElementById("irregular-tenses-grid");

    const inputs =
        [
            ...grid.querySelectorAll(
                ".irregular-tense-input"
            )
        ];

    // CHECK EMPTY INPUTS
    const hasEmptyInput =
        inputs.some(
            input =>
                !normalizeAnswer(input.value)
        );

    if (hasEmptyInput) {
        const emptyInput =
            inputs.find(
                input =>
                    !normalizeAnswer(input.value)
            );
        emptyInput.focus();
        return;
    }

    // CHECK ANSWERS
    let allCorrect = true;

    inputs.forEach(
        input => {
            const userAnswer = normalizeAnswer(input.value);
            const correctAnswer = normalizeAnswer(input.dataset.answer);
            input.classList.remove("irregular-tense-input--correct", "irregular-tense-input--incorrect");

            // CORRECT
            if (userAnswer === correctAnswer) {
                input.classList.add("irregular-tense-input--correct");
            }
            // INCORRECT
            else {
                input.classList.add("irregular-tense-input--incorrect");
                allCorrect = false;
                // Show the correct answer inside the input
                input.value = input.dataset.answer;
            }
            // Disable all inputs after submitting
            input.disabled = true;
        }
    );

    // MARK QUESTION AS ANSWERED
    practiceState.irregularTenseAnswered = true;

    // ALL CORRECT
    if (allCorrect) {
        practiceState.correctAnswers++;
        updatePracticeStats();
        showIrregularTensesCorrectFeedback();
        const button =
            document.getElementById(
                "irregular-answer-button"
            );
        button.disabled = true;

        // 1 SECOND
        setTimeout(
            () => {
                button.disabled = false;
                nextIrregularTenseQuestion();
            },
            1000
        );
        return;
    }

    // INCORRECT ANSWER
    practiceState.incorrectAnswers++;
    updatePracticeStats();
    showIrregularTensesIncorrectFeedback();
    const button =
        document.getElementById(
            "irregular-answer-button"
        );
    button.disabled = true;

    // 3 SECONDS
    setTimeout(
        () => {
            button.disabled = false;
            nextIrregularTenseQuestion();
        },
        3000
    );
}


// SHOW CURRENT IRREGULAR VERB
function showCurrentIrregularTensesQuestion() {
    // FINISH
    if (practiceState.currentQuestion >= practiceState.totalQuestions) {
        finishIrregularTensesPractice();
        return;
    }

    const verb =
        practiceState.irregularTenseQuestions[
            practiceState.currentQuestion
        ];
    practiceState.irregularTenseAnswered = false;

    // PROGRESS
    const lang = getCurrentMessages();

    document.getElementById(
        "irregular-question-progress"
    ).textContent =
        `${lang.question} ${
            practiceState.currentQuestion + 1
        }/${practiceState.totalQuestions}`;

    // GRID
    const grid = document.getElementById("irregular-tenses-grid");
    grid.innerHTML = "";
    const forms = Object.entries(verb);

    forms.forEach(
        ([form, translation], index) => {
            // DETERMINE QUESTION / ANSWER LANGUAGE
            let question;
            let correctAnswer;
            if (state.languageMode === "es") {
                // Spanish -> English
                question = translation;
                correctAnswer = form;
            } else {
                // English -> Spanish
                question = form;
                correctAnswer = translation;
            }

            // WORD
            const word = document.createElement("div");
            word.className = "irregular-tense-word";
            word.textContent = question;

            // INPUT
            const input = document.createElement("input");
            input.type = "text";
            input.className = "answer-input irregular-tense-input";
            input.autocomplete = "off";

            // Store the expected answer
            input.dataset.answer = correctAnswer;
            input.dataset.index = index;

            // ADD TO GRID
            grid.appendChild(word);
            grid.appendChild(input);
        }
    );

    // RESET FEEDBACK
    const feedback = document.getElementById("irregular-answer-feedback");
    feedback.textContent = "";
    feedback.className = "answer-feedback";

    // BUTTON
    const button = document.getElementById("irregular-answer-button");
    button.disabled = false;
    button.textContent = lang.next;

    // FOCUS FIRST INPUT
    const firstInput =
        grid.querySelector(
            ".irregular-tense-input"
        );

    if (firstInput) {
        firstInput.focus();
    }
}
