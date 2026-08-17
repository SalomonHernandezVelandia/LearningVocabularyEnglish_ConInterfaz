// ==========================================================
// PRACTICE STATE
// ==========================================================
const practiceState = {
    // Palabras que se utilizarán durante la sesión
    questions: [],
    // Índice de la pregunta actual
    currentQuestion: 0,
    // Cantidad total de preguntas
    totalQuestions: 0,
    // Palabra actualmente mostrada
    currentWord: null,
    // Respuesta correcta
    currentAnswer: null,
    // Si la pregunta ya fue respondida
    answered: false,
    // Estadísticas de la sesión
    correctAnswers: 0,
    incorrectAnswers: 0,
    // IRREGULAR VERBS BY TENSES
    irregularTenseQuestions: [],
    irregularTenseAttempt: 1,
    irregularTenseAnswered: false
};


// INITIALIZE PRACTICE
function initializePractice() {
    const answerButton = document.getElementById("answer-button");
    const answerInput = document.getElementById("answer-input");

    // NORMAL VOCABULARY BUTTON
    if (answerButton) {
        answerButton.addEventListener("click", handleAnswer);
    }

    // NORMAL VOCABULARY ENTER
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
    const irregularButton =
        document.getElementById(
            "irregular-answer-button"
        );

    if (irregularButton) {
        irregularButton.addEventListener(
            "click",
            handleIrregularTensesAnswer
        );
    }

    // IRREGULAR VERBS ENTER
    const irregularGrid =
        document.getElementById(
            "irregular-tenses-grid"
        );

    if (irregularGrid) {
        irregularGrid.addEventListener(
            "keydown",
            event => {

                if (event.key !== "Enter") {
                    return;
                }
                event.preventDefault();

                const inputs =
                    [
                        ...irregularGrid.querySelectorAll(
                            ".irregular-tense-input"
                        )
                    ];

                const currentIndex =
                    inputs.indexOf(
                        event.target
                    );

                // FIRST OR SECOND INPUT
                if (currentIndex < inputs.length - 1) {
                    inputs[
                        currentIndex + 1
                    ].focus();
                    return;
                }

                // THIRD INPUT
                handleIrregularTensesAnswer();
            }
        );
    }
}

// ==========================================================
// HANDLE IRREGULAR TENSES ANSWER
// ==========================================================
function handleIrregularTensesAnswer() {
    if (practiceState.irregularTenseAnswered) {
        return;
    }

    const grid =
        document.getElementById(
            "irregular-tenses-grid"
        );

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
                !normalizeAnswer(
                    input.value
                )
        );

    if (hasEmptyInput) {
        const emptyInput =
            inputs.find(
                input =>
                    !normalizeAnswer(
                        input.value
                    )
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

            input.classList.remove(
                "irregular-tense-input--correct",
                "irregular-tense-input--incorrect"
            );

            if (userAnswer === correctAnswer) {
                input.classList.add("irregular-tense-input--correct");
            }
            else {
                input.classList.add("irregular-tense-input--incorrect");
                allCorrect = false;
            }
        }
    );

    // ALL CORRECT
    if (allCorrect) {
        practiceState.irregularTenseAnswered = true;
        practiceState.correctAnswers++;
        updatePracticeStats();
        showIrregularTensesCorrectFeedback();

        const button = document.getElementById("irregular-answer-button");
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

    // FIRST ATTEMPT
    if (practiceState.irregularTenseAttempt === 1) {
        practiceState.irregularTenseAttempt = 2;
        showIrregularTensesRetryFeedback();
        // ENABLE ONLY INCORRECT INPUTS
        inputs.forEach(
            input => {
                const isCorrect = input.classList.contains("irregular-tense-input--correct");
                input.disabled = isCorrect;
            }
        );

        // FOCUS FIRST INCORRECT
        const incorrectInput =
            inputs.find(
                input =>
                    input.classList.contains(
                        "irregular-tense-input--incorrect"
                    )
            );
        if (incorrectInput) {
            incorrectInput.focus();
        }

        return;
    }


    // SECOND ATTEMPT FAILED
    practiceState.irregularTenseAnswered = true;
    practiceState.incorrectAnswers++;
    updatePracticeStats();
    showIrregularTensesIncorrectFeedback();
    const button = document.getElementById("irregular-answer-button");
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

// ==========================================================
// CORRECT FEEDBACK
// ==========================================================
function showIrregularTensesCorrectFeedback() {
    const feedback = document.getElementById("irregular-answer-feedback" );
    const lang = getCurrentMessages();
    feedback.textContent = `✓ ${lang.correct}`;
    feedback.className = "answer-feedback answer-feedback--correct";
}

// ==========================================================
// RETRY FEEDBACK
// ==========================================================
function showIrregularTensesRetryFeedback() {
    const feedback = document.getElementById("irregular-answer-feedback");
    const lang = getCurrentMessages();
    feedback.textContent = `✗ ${lang.incorrect} — Try again`;
    feedback.className = "answer-feedback answer-feedback--incorrect";
}


// ==========================================================
// INCORRECT FEEDBACK
// ==========================================================
function showIrregularTensesIncorrectFeedback() {
    const feedback = document.getElementById("irregular-answer-feedback");
    const lang = getCurrentMessages();
    const inputs = document.querySelectorAll(".irregular-tense-input");
    const corrections = [];

    inputs.forEach(
        input => {
            const userAnswer =
                normalizeAnswer(
                    input.value
                );

            const correctAnswer =
                normalizeAnswer(
                    input.dataset.answer
                );

            if (userAnswer !== correctAnswer) {
                corrections.push(input.dataset.answer);
            }
        }
    );

    feedback.textContent =
        `✗ ${lang.incorrect} — ${
            corrections.join(" / ")
        }`;

    feedback.className = "answer-feedback answer-feedback--incorrect";
}


// ==========================================================
// NEXT IRREGULAR TENSE QUESTION
// ==========================================================
function nextIrregularTenseQuestion() {
    practiceState.currentQuestion++;
    showCurrentIrregularTensesQuestion();
}


// ==========================================================
// FINISH IRREGULAR TENSES PRACTICE
// ==========================================================
function finishIrregularTensesPractice() {
    const lang = getCurrentMessages();

    document.getElementById(
        "irregular-question-progress"
    ).textContent =
        `${practiceState.totalQuestions}/${practiceState.totalQuestions}`;


    document.getElementById(
        "irregular-tenses-grid"
    ).innerHTML =
        "🎉";


    document.getElementById(
        "irregular-answer-feedback"
    ).textContent =
        lang.correct;


    document.getElementById(
        "irregular-answer-feedback"
    ).className =
        "answer-feedback answer-feedback--correct";


    document.getElementById(
        "irregular-answer-button"
    ).style.display =
        "none";

}



// START VOCABULARY PRACTICE
function startVocabularyPractice() {
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

    // Generate questions
    practiceState.questions = generateQuestions(category, amount);
    practiceState.currentQuestion = 0;
    practiceState.totalQuestions = practiceState.questions.length;
    practiceState.answered = false;

    // Reset statistics
    practiceState.correctAnswers = 0;
    practiceState.incorrectAnswers = 0;
    updatePracticeStats();

    // Show practice screen
    showPracticeScreen();

    // Show first question
    showCurrentQuestion();
}


// ==========================================================
// START IRREGULAR VERBS BY TENSES PRACTICE
// ==========================================================
function startIrregularTensesPractice() {
    const amount = state.customAmount;

    if (!amount) {
        console.error("No amount of words selected.");
        return;
    }

    // GENERATE VERBS
    practiceState.irregularTenseQuestions =
        generateIrregularVerbQuestions(
            amount
        );

    // RESET
    practiceState.currentQuestion = 0;
    practiceState.totalQuestions = practiceState.irregularTenseQuestions.length;
    practiceState.irregularTenseAttempt = 1;
    practiceState.irregularTenseAnswered = false;

    // RESET STATISTICS
    practiceState.correctAnswers = 0;
    practiceState.incorrectAnswers = 0;
    updatePracticeStats();

    // SHOW SCREEN
    document.getElementById(
        "language-selection"
    ).hidden = true;

    document.getElementById(
        "level-selection"
    ).hidden = true;

    document.getElementById(
        "category-selection"
    ).hidden = true;

    document.getElementById(
        "irregular-verbs-selection"
    ).hidden = true;

    document.getElementById(
        "vocabulary-practice"
    ).hidden = true;

    document.getElementById(
        "irregular-tenses-practice"
    ).hidden = false;

    // SHOW FIRST VERB
    showCurrentIrregularTensesQuestion();
}

// ==========================================================
// SHOW CURRENT IRREGULAR VERB
// ==========================================================
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

    practiceState.irregularTenseAttempt = 1;
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
            // WORD
            const word = document.createElement("div");
            word.className = "irregular-tense-word";
            word.textContent = form;

            // INPUT
            const input = document.createElement("input");
            input.type = "text";
            input.className = "answer-input irregular-tense-input";
            input.autocomplete = "off";
            input.dataset.answer = translation;
            input.dataset.index = index;

            // ADD TO GRID
            grid.appendChild(word);
            grid.appendChild(input);

        }
    );

    // RESET FEEDBACK
    const feedback =
        document.getElementById(
            "irregular-answer-feedback"
        );

    feedback.textContent = "";
    feedback.className = "answer-feedback";

    // BUTTON
    const button =
        document.getElementById(
            "irregular-answer-button"
        );

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


// ==========================================================
// GENERATE QUESTIONS
// ==========================================================
function generateQuestions(category, amount) {
    // IRREGULAR VERBS
    if (category === "List of Irregular Verbs") {
        return generateIrregularVerbQuestions(amount);
    }

    // NORMAL VOCABULARY
    let categoryVocabulary;
    if (category === "Aleatorio") {
        categoryVocabulary = getAllVocabulary();
    }
    else {
        categoryVocabulary = vocabulary.learning_english[category];
    }


    if (!categoryVocabulary) {
        console.error(`Category "${category}" was not found.`);
        return [];
    }
    const entries = Object.entries(categoryVocabulary);

    // SHUFFLE
    shuffleArray(entries);

    // LIMIT QUESTIONS
    const questionAmount =
        Math.min(
            amount,
            entries.length
        );

    return entries.slice(0, questionAmount);
}


// ==========================================================
// GENERATE IRREGULAR VERB QUESTIONS
// ==========================================================
function generateIrregularVerbQuestions(amount) {
    const irregularVerbs =
        vocabulary.learning_english[
            "List of Irregular Verbs"
        ];

    if (!irregularVerbs) {
        console.error("Irregular verbs data was not found.");
        return [];
    }
    // COPY ARRAY
    const verbs = [...irregularVerbs];

    // SHUFFLE
    shuffleArray(verbs);

    // LIMIT
    const selectedVerbs =
        verbs.slice(
            0,
            Math.min(
                amount,
                verbs.length
            )
        );

    // RANDOM MODE
    if (state.irregularVerbMode === "random") {
        const questions = [];

        selectedVerbs.forEach(
            verb => {
                const forms = Object.entries(verb);
                const randomForm =
                    forms[
                        Math.floor(
                            Math.random() *
                            forms.length
                        )
                    ];
                questions.push(randomForm);
            }
        );
        return questions;
    }

    // TENSES MODE
    if (state.irregularVerbMode === "tenses") {
        return selectedVerbs;
    }

    return [];
}



// GET ALL VOCABULARY
function getAllVocabulary() {
    const allVocabulary = {};
    const categories = vocabulary.learning_english;

    for (const category in categories) {
        Object.assign(
            allVocabulary,
            categories[category]
        );
    }
    return allVocabulary;
}


// SHUFFLE ARRAY
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor( Math.random() * (i + 1) );
        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];
    }
}


// SHOW PRACTICE SCREEN
function showPracticeScreen() {
    document.getElementById("language-selection").hidden = true;
    document.getElementById("level-selection").hidden = true;
    document.getElementById("category-selection").hidden = true;
    document.getElementById("irregular-verbs-selection").hidden = true;
    document.getElementById("vocabulary-practice").hidden = false;
    const lang = getCurrentMessages();
    document.getElementById("main-message").textContent = lang.translation_input;
    document.getElementById("answer-button").textContent = lang.next;
}


// SHOW CURRENT QUESTION
function showCurrentQuestion() {
    if (practiceState.currentQuestion >= practiceState.totalQuestions) {
        finishPractice();
        return;
    }
    const entry = practiceState.questions[practiceState.currentQuestion];
    const englishWord = entry[0];
    const spanishWord = entry[1];

    // DETERMINE QUESTION / ANSWER
    if (state.languageMode === "es") {
        practiceState.currentWord = spanishWord;
        practiceState.currentAnswer = englishWord;
    }
    else {
        practiceState.currentWord = englishWord;
        practiceState.currentAnswer = spanishWord;
    }
    practiceState.answered = false;

    // DISPLAY WORD
    document.getElementById("question-word").textContent = practiceState.currentWord;

    // PROGRESS
    const lang = getCurrentMessages();

    document.getElementById(
        "question-progress"
    ).textContent =
        `${lang.question} ${
            practiceState.currentQuestion + 1
        }/${practiceState.totalQuestions}`;

    // RESET INPUT
    const input = document.getElementById("answer-input");
    const questionBody = document.querySelector(".question__body");

    // RESET INPUT
    input.value = "";
    input.disabled = false;
    input.classList.remove(
        "answer-input--correct",
        "answer-input--incorrect"
    );

    // RESET QUESTION BODY
    questionBody.classList.remove(
        "question__body--correct",
        "question__body--incorrect"
    );
    // FOCUS
    input.focus();

    // RESET FEEDBACK
    const feedback = document.getElementById("answer-feedback");
    feedback.textContent = "";
    feedback.className = "answer-feedback";

    // BUTTON
    document.getElementById("answer-button").textContent = lang.next;
}


// UPDATE PRACTICE STATISTICS
function updatePracticeStats() {
    const lang = getCurrentMessages();

    // CORRECT ANSWERS
    document.getElementById(
        "correct-count"
    ).textContent =
        `✅ ${lang.correct}: ${practiceState.correctAnswers}`;

    // INCORRECT ANSWERS
    document.getElementById(
        "incorrect-count"
    ).textContent =
        `❌ ${lang.incorrect}: ${practiceState.incorrectAnswers}`;


    // PROGRESS
    const answered = practiceState.correctAnswers + practiceState.incorrectAnswers;
    const total = practiceState.totalQuestions;

    const percentage =
        total > 0
            ? Math.round(
                (answered / total) * 100
            )
            : 0;

    // PROGRESS TEXT
    document.getElementById(
        "progress-text"
    ).textContent =
        `${lang.progress}: ${percentage}%`;


    // PROGRESS BAR
    document.getElementById(
        "progress-bar"
    ).style.width =
        `${percentage}%`;


    // ROUND COUNT
    document.getElementById(
        "round-count"
    ).textContent =
        `🔤 ${lang.word}: ${answered}/${total}`;
}


// ==========================================================
// HANDLE ANSWER
function handleAnswer() {
    if (practiceState.answered) {
        return;
    }
    const input = document.getElementById("answer-input");
    const userAnswer =normalizeAnswer(input.value);

    if (!userAnswer) {
        input.focus();
        return;
    }
    const correctAnswer = normalizeAnswer(practiceState.currentAnswer);
    practiceState.answered = true;
    input.disabled = true;
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
        showCorrectAnswer();
        practiceState.correctAnswers++;
    }
    else {
        showIncorrectAnswer();
        practiceState.incorrectAnswers++;
    }

    // UPDATE STATISTICS
    updatePracticeStats();

    // DISABLE BUTTON
    const answerButton = document.getElementById("answer-button");
    answerButton.disabled = true;

    const delay = isCorrect ? 1000 : 3000;
    setTimeout(
        () => {
            answerButton.disabled = false;
            nextQuestion();
        },
        delay
    );

}

// NORMALIZE ANSWER
function normalizeAnswer(answer) {
    return answer
        .trim()
        .toLowerCase();
}

// SHOW CORRECT ANSWER
function showCorrectAnswer() {
    const input = document.getElementById("answer-input");
    const feedback = document.getElementById("answer-feedback");
    const questionBody = document.querySelector(".question__body");

    // INPUT
    input.classList.remove("answer-input--incorrect");
    input.classList.add("answer-input--correct");

    // QUESTION BODY
    questionBody.classList.remove("question__body--incorrect");
    questionBody.classList.add("question__body--correct");

    // FEEDBACK
    const lang = getCurrentMessages();
    feedback.textContent = `✓ ${lang.correct}`;
    feedback.className = "answer-feedback answer-feedback--correct";
}


// SHOW INCORRECT ANSWER
function showIncorrectAnswer() {
    const input = document.getElementById("answer-input");
    const feedback = document.getElementById("answer-feedback");
    const questionBody = document.querySelector(".question__body");

    // INPUT
    input.classList.remove("answer-input--correct");
    input.classList.add("answer-input--incorrect");

    // QUESTION BODY
    questionBody.classList.remove("question__body--correct");
    questionBody.classList.add("question__body--incorrect");

    // FEEDBACK
    const lang = getCurrentMessages();

    feedback.textContent =
        `✗ ${lang.incorrect} — ${
            lang.correct_answer
        } ${
            practiceState.currentAnswer
        }`;

    feedback.className = "answer-feedback answer-feedback--incorrect";
}


// NEXT QUESTION
function nextQuestion() {
    practiceState.currentQuestion++;
    showCurrentQuestion();
}

// FINISH PRACTICE
function finishPractice() {
    const lang = getCurrentMessages();

    document.getElementById(
        "question-word"
    ).textContent =
        "🎉";

    document.getElementById(
        "question-progress"
    ).textContent =
        `${practiceState.totalQuestions}/${practiceState.totalQuestions}`;


    document.getElementById("answer-input").style.display = "none";
    document.getElementById("answer-button").style.display = "none";
    document.getElementById("answer-feedback").textContent = lang.correct;
    document.getElementById("answer-feedback").className = "answer-feedback answer-feedback--correct";
}

// ==========================================================
// INITIALIZE PRACTICE EVENTS
// ==========================================================
document.addEventListener(
    "DOMContentLoaded",
    initializePractice
);