// ==========================================================
// VOCABULARY PRACTICE
// ==========================================================


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
    answered: false

};


// ==========================================================
// INITIALIZE PRACTICE
// ==========================================================

function initializePractice() {

    const answerButton =
        document.getElementById(
            "answer-button"
        );


    const answerInput =
        document.getElementById(
            "answer-input"
        );


    if (answerButton) {

        answerButton.addEventListener(
            "click",
            handleAnswer
        );

    }


    if (answerInput) {

        answerInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    handleAnswer();

                }

            }
        );

    }

}


// ==========================================================
// START VOCABULARY PRACTICE
// ==========================================================

function startVocabularyPractice() {

    const amount =
        state.customAmount;


    const category =
        state.categoryMode;


    if (!amount) {

        console.error(
            "No amount of words selected."
        );

        return;

    }


    if (!category) {

        console.error(
            "No category selected."
        );

        return;

    }


    // Generate questions

    practiceState.questions =
        generateQuestions(
            category,
            amount
        );


    practiceState.currentQuestion =
        0;


    practiceState.totalQuestions =
        practiceState.questions.length;


    practiceState.answered =
        false;


    // Show practice screen

    showPracticeScreen();


    // Show first question

    showCurrentQuestion();

}


// ==========================================================
// GENERATE QUESTIONS
// ==========================================================

function generateQuestions(
    category,
    amount
) {

    let categoryVocabulary;


    // ------------------------------------------------------
    // RANDOM CATEGORY
    // ------------------------------------------------------

    if (category === "Aleatorio") {

        categoryVocabulary =
            getAllVocabulary();

    }

    // ------------------------------------------------------
    // SPECIFIC CATEGORY
    // ------------------------------------------------------

    else {

        categoryVocabulary =
            vocabulary.learning_english[
                category
            ];

    }


    if (!categoryVocabulary) {

        console.error(
            `Category "${category}" was not found.`
        );

        return [];

    }


    const entries =
        Object.entries(
            categoryVocabulary
        );


    // Shuffle entries

    shuffleArray(entries);


    // Number of questions cannot exceed
    // available vocabulary

    const questionAmount =
        Math.min(
            amount,
            entries.length
        );


    return entries.slice(
        0,
        questionAmount
    );

}


// ==========================================================
// GET ALL VOCABULARY
// ==========================================================

function getAllVocabulary() {

    const allVocabulary = {};


    const categories =
        vocabulary.learning_english;


    for (
        const category in categories
    ) {

        Object.assign(
            allVocabulary,
            categories[category]
        );

    }


    return allVocabulary;

}


// ==========================================================
// SHUFFLE ARRAY
// ==========================================================

function shuffleArray(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


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


// ==========================================================
// SHOW PRACTICE SCREEN
// ==========================================================

function showPracticeScreen() {

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
        "vocabulary-practice"
    ).hidden = false;


    const lang =
        getCurrentMessages();


    document.getElementById(
        "main-message"
    ).textContent =
        lang.translation_input;


    document.getElementById(
        "answer-button"
    ).textContent =
        lang.next;

}


// ==========================================================
// SHOW CURRENT QUESTION
// ==========================================================

function showCurrentQuestion() {

    if (
        practiceState.currentQuestion >=
        practiceState.totalQuestions
    ) {

        finishPractice();

        return;

    }


    const entry =
        practiceState.questions[
            practiceState.currentQuestion
        ];


    const englishWord =
        entry[0];


    const spanishWord =
        entry[1];


    // ------------------------------------------------------
    // DETERMINE QUESTION / ANSWER
    // ------------------------------------------------------

    if (
        state.languageMode === "es"
    ) {

        // Show Spanish
        // User must answer English

        practiceState.currentWord =
            spanishWord;

        practiceState.currentAnswer =
            englishWord;

    }

    else {

        // Show English
        // User must answer Spanish

        practiceState.currentWord =
            englishWord;

        practiceState.currentAnswer =
            spanishWord;

    }


    practiceState.answered =
        false;


    // ------------------------------------------------------
    // DISPLAY WORD
    // ------------------------------------------------------

    document.getElementById(
        "question-word"
    ).textContent =
        practiceState.currentWord;


    // ------------------------------------------------------
    // PROGRESS
    // ------------------------------------------------------

    const lang =
        getCurrentMessages();


    document.getElementById(
        "question-progress"
    ).textContent =
        `${lang.question} ${
            practiceState.currentQuestion + 1
        }/${practiceState.totalQuestions}`;


    // ------------------------------------------------------
    // RESET INPUT
    // ------------------------------------------------------

    const input =
        document.getElementById(
            "answer-input"
        );


    input.value = "";

    input.disabled = false;

    input.focus();


    // ------------------------------------------------------
    // RESET FEEDBACK
    // ------------------------------------------------------

    const feedback =
        document.getElementById(
            "answer-feedback"
        );


    feedback.textContent = "";

    feedback.className =
        "answer-feedback";


    // ------------------------------------------------------
    // BUTTON
    // ------------------------------------------------------

    document.getElementById(
        "answer-button"
    ).textContent =
        lang.next;

}


// ==========================================================
// HANDLE ANSWER
// ==========================================================

function handleAnswer() {

    if (
        practiceState.answered
    ) {

        nextQuestion();

        return;

    }


    const input =
        document.getElementById(
            "answer-input"
        );


    const userAnswer =
        normalizeAnswer(
            input.value
        );


    if (!userAnswer) {

        input.focus();

        return;

    }


    const correctAnswer =
        normalizeAnswer(
            practiceState.currentAnswer
        );


    const feedback =
        document.getElementById(
            "answer-feedback"
        );


    // ------------------------------------------------------
    // CORRECT
    // ------------------------------------------------------

    if (
        userAnswer === correctAnswer
    ) {

        showCorrectAnswer();

    }

    // ------------------------------------------------------
    // INCORRECT
    // ------------------------------------------------------

    else {

        showIncorrectAnswer();

    }


    practiceState.answered =
        true;


    input.disabled =
        true;


    const lang =
        getCurrentMessages();


    document.getElementById(
        "answer-button"
    ).textContent =
        lang.next;

}


// ==========================================================
// NORMALIZE ANSWER
// ==========================================================

function normalizeAnswer(answer) {

    return answer
        .trim()
        .toLowerCase();

}


// ==========================================================
// SHOW CORRECT ANSWER
// ==========================================================

function showCorrectAnswer() {

    const input =
        document.getElementById(
            "answer-input"
        );


    const feedback =
        document.getElementById(
            "answer-feedback"
        );


    input.classList.remove(
        "answer-input--incorrect"
    );


    input.classList.add(
        "answer-input--correct"
    );


    const lang =
        getCurrentMessages();


    feedback.textContent =
        `✓ ${lang.correct}`;


    feedback.classList.add(
        "answer-feedback--correct"
    );

}


// ==========================================================
// SHOW INCORRECT ANSWER
// ==========================================================

function showIncorrectAnswer() {

    const input =
        document.getElementById(
            "answer-input"
        );


    const feedback =
        document.getElementById(
            "answer-feedback"
        );


    input.classList.remove(
        "answer-input--correct"
    );


    input.classList.add(
        "answer-input--incorrect"
    );


    const lang =
        getCurrentMessages();


    feedback.textContent =
        `✗ ${lang.incorrect} — ${
            lang.correct_answer
        } ${
            practiceState.currentAnswer
        }`;


    feedback.classList.add(
        "answer-feedback--incorrect"
    );

}


// ==========================================================
// NEXT QUESTION
// ==========================================================

function nextQuestion() {

    practiceState.currentQuestion++;


    showCurrentQuestion();

}


// ==========================================================
// FINISH PRACTICE
// ==========================================================

function finishPractice() {

    const lang =
        getCurrentMessages();


    document.getElementById(
        "question-word"
    ).textContent =
        "🎉";


    document.getElementById(
        "question-progress"
    ).textContent =
        `${practiceState.totalQuestions}/${practiceState.totalQuestions}`;


    document.getElementById(
        "answer-input"
    ).style.display =
        "none";


    document.getElementById(
        "answer-button"
    ).style.display =
        "none";


    document.getElementById(
        "answer-feedback"
    ).textContent =
        lang.correct;


    document.getElementById(
        "answer-feedback"
    ).className =
        "answer-feedback answer-feedback--correct";


}


// ==========================================================
// INITIALIZE PRACTICE EVENTS
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    initializePractice
);