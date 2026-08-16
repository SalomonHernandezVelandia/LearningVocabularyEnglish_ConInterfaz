// ==========================================================
// APPLICATION DATA
// ==========================================================

let messages = null;
let levels = null;
let categories = null;
let vocabulary = null;

let interfaceLanguage = "en";


// ==========================================================
// APPLICATION STATE
// ==========================================================

const state = {

    // Idioma en el que se mostrarán las palabras
    languageMode: "random",

    // Nivel seleccionado
    levelMode: null,

    // Categoría seleccionada
    categoryMode: null,

    // Cantidad personalizada de palabras
    customAmount: null
};


// ==========================================================
// LOAD JSON DATA
// ==========================================================

async function loadData() {

    try {

        const [
            messagesResponse,
            levelsResponse,
            categoriesResponse,
            vocabularyResponse
        ] = await Promise.all([

            fetch("../data/messages.json"),

            fetch("../data/levels.json"),

            fetch("../data/categories.json"),

            fetch("../data/vocabulary.json")

        ]);


        // ==================================================
        // VALIDATE RESPONSES
        // ==================================================

        if (!messagesResponse.ok) {
            throw new Error(
                `Unable to load messages.json: ${messagesResponse.status}`
            );
        }

        if (!levelsResponse.ok) {
            throw new Error(
                `Unable to load levels.json: ${levelsResponse.status}`
            );
        }

        if (!categoriesResponse.ok) {
            throw new Error(
                `Unable to load categories.json: ${categoriesResponse.status}`
            );
        }

        if (!vocabularyResponse.ok) {
            throw new Error(
                `Unable to load vocabulary.json: ${vocabularyResponse.status}`
            );
        }


        // ==================================================
        // PARSE JSON
        // ==================================================

        messages = await messagesResponse.json();

        levels = await levelsResponse.json();

        categories = await categoriesResponse.json();

        vocabulary = await vocabularyResponse.json();


        // ==================================================
        // DEFAULT LANGUAGE
        // ==================================================

        interfaceLanguage =
            messages.default_language || "en";


        // ==================================================
        // INITIALIZE APPLICATION
        // ==================================================

        initializeApplication();


    } catch (error) {

        console.error(
            "Error loading application data:",
            error
        );

    }

}


// ==========================================================
// INITIALIZE APPLICATION
// ==========================================================

function initializeApplication() {

    applyMessages();

    initializeLanguageSelection();

    initializeInterfaceLanguageSelection();

    initializeCustomAmount();

    initializeCategorySelection();

}

// ==========================================================
// INITIALIZE CUSTOM AMOUNT
// ==========================================================

function initializeCustomAmount() {

    const button =
        document.getElementById(
            "custom-amount-continue"
        );


    button.addEventListener(
        "click",
        continueWithCustomAmount
    );

}


// ==========================================================
// GET CURRENT LANGUAGE DATA
// ==========================================================

function getCurrentMessages() {

    return messages[interfaceLanguage];

}


// ==========================================================
// APPLY INTERFACE TRANSLATIONS
// ==========================================================

function applyMessages() {

    const lang =
        getCurrentMessages();


    if (!lang) {

        console.error(
            `Language "${interfaceLanguage}" not found.`
        );

        return;

    }


    // ======================================================
    // HTML LANGUAGE
    // ======================================================

    document.documentElement.lang =
        interfaceLanguage;


    // ======================================================
    // BROWSER TITLE
    // ======================================================

    document.title =
        lang.title;


    // ======================================================
    // MAIN TITLE
    // ======================================================

    document.getElementById(
        "app-title"
    ).textContent =
        lang.title;


    // ======================================================
    // SIDEBAR
    // ======================================================

    document.getElementById(
        "options-title"
    ).textContent =
        lang.options;

    document.getElementById(
        "interface-language-label"
    ).textContent =
        lang.interface_language;


    // ======================================================
    // LANGUAGE
    // ======================================================

    document.getElementById(
        "language-button"
    ).textContent =
        lang.language;


    document.getElementById(
        "language-status"
    ).textContent =
        lang.selected_language;


    // ======================================================
    // LEVEL
    // ======================================================

    document.getElementById(
        "level-button"
    ).textContent =
        lang.level;


    document.getElementById(
        "level-status"
    ).textContent =
        lang.selected_level;


    // ======================================================
    // CATEGORY
    // ======================================================

    document.getElementById(
        "category-button"
    ).textContent =
        lang.category;


    document.getElementById(
        "category-status"
    ).textContent =
        lang.selected_category;


    // ======================================================
    // STATISTICS
    // ======================================================

    document.getElementById(
        "score-title"
    ).textContent =
        lang.score;


    document.getElementById(
        "progress-text"
    ).textContent =
        `${lang.progress}: 0%`;


    document.getElementById(
        "correct-count"
    ).textContent =
        `✅ ${lang.correct}: 0`;


    document.getElementById(
        "incorrect-count"
    ).textContent =
        `❌ ${lang.incorrect}: 0`;


    document.getElementById(
        "round-count"
    ).textContent =
        `🔤 ${lang.word}: 0/0`;


    // ======================================================
    // MAIN MESSAGE
    // ======================================================

    document.getElementById(
        "main-message"
    ).textContent =
        lang.language_selection;


    // ======================================================
    // PRACTICE LANGUAGE BUTTONS
    // ======================================================

    updateLanguageButtons();


    // ======================================================
    // UPDATE PRACTICE LANGUAGE STATUS
    // ======================================================

    updateLanguageStatus();


    // ======================================================
    // INTERFACE LANGUAGE BUTTONS
    // ======================================================

    updateInterfaceLanguageButtons();

}


// ==========================================================
// INTERFACE LANGUAGE SELECTION
// ==========================================================

function initializeInterfaceLanguageSelection() {

    const buttons =
        document.querySelectorAll(
            "[data-interface-language]"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const language =
                    button.dataset.interfaceLanguage;

                selectInterfaceLanguage(language);

            }
        );

    });

}

// ==========================================================
// SELECT INTERFACE LANGUAGE
// ==========================================================

function selectInterfaceLanguage(language) {

    if (!messages[language]) {

        console.error(
            `Interface language "${language}" not found.`
        );

        return;

    }


    interfaceLanguage = language;


    applyMessages();

}

// ==========================================================
// UPDATE INTERFACE LANGUAGE BUTTONS
// ==========================================================

function updateInterfaceLanguageButtons() {

    const buttons =
        document.querySelectorAll(
            "[data-interface-language]"
        );


    buttons.forEach(button => {

        const language =
            button.dataset.interfaceLanguage;


        if (language === interfaceLanguage) {

            button.classList.add(
                "interface-language__button--active"
            );

        } else {

            button.classList.remove(
                "interface-language__button--active"
            );

        }

    });

}


// ==========================================================
// PRACTICE LANGUAGE SELECTION
// ==========================================================

function initializeLanguageSelection() {

    const buttons =
        document.querySelectorAll(
            "[data-language]"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const language =
                    button.dataset.language;

                selectLanguage(language);

            }
        );

    });

}




// ==========================================================
// SELECT LANGUAGE
// ==========================================================

function selectLanguage(language) {

    state.languageMode =
        language;


    // Update selected language in sidebar

    updateLanguageStatus();


    // Move to level selection

    showLevelSelection();

}

// ==========================================================
// SHOW LEVEL SELECTION
// ==========================================================

function showLevelSelection() {

    const languageSelection =
        document.getElementById(
            "language-selection"
        );


    const levelSelection =
        document.getElementById(
            "level-selection"
        );


    // Hide language selection

    languageSelection.hidden =
        true;


    // Show level selection

    levelSelection.hidden =
        false;


    // Update main message

    const lang =
        getCurrentMessages();


    document.getElementById(
        "main-message"
    ).textContent =
        lang.level_selection;


    // Generate level buttons

    renderLevelOptions();

}





// ==========================================================
// RENDER LEVEL OPTIONS
// ==========================================================

function renderLevelOptions() {

    const container =
        document.getElementById(
            "level-options"
        );


    // Clear previous options

    container.innerHTML = "";


    if (!levels || !levels.levels) {

        console.error(
            "Levels data is not available."
        );

        return;

    }


    // ======================================================
    // CREATE LEVEL BUTTONS
    // ======================================================

    levels.levels.forEach(level => {

        const button =
            document.createElement("button");


        button.type =
            "button";


        button.className =
            "button button--primary";


        button.textContent =
            level.name;


        button.dataset.level =
            level.id;


        button.addEventListener(
            "click",
            () => {

                selectLevel(level.id);

            }
        );


        container.appendChild(
            button
        );

    });

}

// ==========================================================
// SELECT LEVEL
// ==========================================================

function selectLevel(levelId) {

    // ======================================================
    // CUSTOM AMOUNT
    // ======================================================

    if (levelId === "custom") {

        showCustomAmount();

        return;

    }


    // ======================================================
    // VALIDATE LEVEL
    // ======================================================

    if (
        !levels.ranges ||
        !levels.ranges[levelId]
    ) {

        console.error(
            `Range for level "${levelId}" not found.`
        );

        return;

    }


    // ======================================================
    // GET RANGE
    // ======================================================

    const range =
        levels.ranges[levelId];


    // ======================================================
    // GENERATE RANDOM AMOUNT
    // ======================================================

    const amount =
        getRandomAmount(
            range.start,
            range.stop,
            range.step
        );


    // ======================================================
    // SAVE STATE
    // ======================================================

    state.levelMode =
        levelId;


    state.customAmount =
        amount;


    // ======================================================
    // UPDATE SIDEBAR
    // ======================================================

    updateLevelStatus();


    // ======================================================
    // CONTINUE TO CATEGORY
    // ======================================================

    showCategorySelection();

}

// ==========================================================
// GENERATE RANDOM AMOUNT
// ==========================================================

function getRandomAmount(
    start,
    stop,
    step
) {

    const numberOfSteps =
        Math.floor(
            (stop - start) / step
        );


    const randomStep =
        Math.floor(
            Math.random() *
            (numberOfSteps + 1)
        );


    return (
        start +
        randomStep * step
    );

}


// ==========================================================
// RENDER CATEGORY OPTIONS
// ==========================================================

function renderCategoryOptions() {

    const container =
        document.getElementById(
            "category-options"
        );


    // Clear previous options

    container.innerHTML = "";


    if (
        !categories ||
        !categories.categories
    ) {

        console.error(
            "Categories data is not available."
        );

        return;

    }


    // ======================================================
    // CREATE CATEGORY BUTTONS
    // ======================================================

    categories.categories.forEach(
        category => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "button button--primary";


            button.textContent =
                category;


            button.dataset.category =
                category;


            button.addEventListener(
                "click",
                () => {

                    selectCategory(
                        category
                    );

                }
            );


            container.appendChild(
                button
            );

        }
    );

}

// ==========================================================
// SELECT CATEGORY
// ==========================================================

function selectCategory(category) {

    // ======================================================
    // SAVE CATEGORY
    // ======================================================

    state.categoryMode =
        category;


    // ======================================================
    // UPDATE SIDEBAR
    // ======================================================

    updateCategoryStatus();


    // ======================================================
    // START VOCABULARY PRACTICE
    // ======================================================

    startVocabularyPractice();

}

// ==========================================================
// UPDATE CATEGORY STATUS
// ==========================================================

function updateCategoryStatus() {

    const lang =
        getCurrentMessages();


    document.getElementById(
        "category-status"
    ).textContent =
        lang.selected_category.replace(
            "—",
            state.categoryMode
        );

}





// ==========================================================
// SHOW CUSTOM AMOUNT
// ==========================================================

function showCustomAmount() {

    const customAmount =
        document.getElementById(
            "custom-amount"
        );


    const label =
        document.getElementById(
            "custom-amount-label"
        );


    const continueButton =
        document.getElementById(
            "custom-amount-continue"
        );


    const lang =
        getCurrentMessages();


    // ======================================================
    // UPDATE TEXT
    // ======================================================

    label.textContent =
        lang.word_count_label;


    continueButton.textContent =
        lang.continue;


    // ======================================================
    // SHOW FORM
    // ======================================================

    customAmount.hidden =
        false;


    // ======================================================
    // FOCUS INPUT
    // ======================================================

    document.getElementById(
        "custom-amount-input"
    ).focus();

}

// ==========================================================
// INITIALIZE CATEGORY SELECTION
// ==========================================================

function initializeCategorySelection() {

    const container =
        document.getElementById(
            "category-options"
        );


    if (!container) {

        return;

    }


    container.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-category]"
                );


            if (!button) {

                return;

            }


            const category =
                button.dataset.category;


            selectCategory(category);

        }
    );

}

// ==========================================================
// SHOW CATEGORY SELECTION
// ==========================================================

function showCategorySelection() {

    const levelSelection =
        document.getElementById(
            "level-selection"
        );


    const categorySelection =
        document.getElementById(
            "category-selection"
        );


    // ======================================================
    // HIDE LEVEL
    // ======================================================

    levelSelection.hidden =
        true;


    // ======================================================
    // SHOW CATEGORY
    // ======================================================

    categorySelection.hidden =
        false;


    // ======================================================
    // UPDATE MAIN MESSAGE
    // ======================================================

    const lang =
        getCurrentMessages();


    document.getElementById(
        "main-message"
    ).textContent =
        lang.category_selection;


    // ======================================================
    // RENDER CATEGORIES
    // ======================================================

    renderCategoryOptions();

}



// ==========================================================
// CUSTOM AMOUNT CONTINUE
// ==========================================================

function continueWithCustomAmount() {

    const input =
        document.getElementById(
            "custom-amount-input"
        );


    const amount =
        Number(input.value);


    // ======================================================
    // VALIDATE
    // ======================================================

    if (
        !Number.isInteger(amount) ||
        amount <= 0
    ) {

        alert(
            getCurrentMessages().invalid_amount
        );

        input.focus();

        return;

    }


    // ======================================================
    // SAVE AMOUNT
    // ======================================================

    state.customAmount =
        amount;


    state.levelMode =
        "custom";


    // ======================================================
    // UPDATE SIDEBAR
    // ======================================================

    updateLevelStatus();


    // ======================================================
    // CONTINUE
    // ======================================================

    showCategorySelection();

}





// ==========================================================
// UPDATE LANGUAGE STATUS
// ==========================================================

function updateLanguageStatus() {

    const lang =
        getCurrentMessages();


    let selectedText;


    if (
        state.languageMode === "random"
    ) {

        selectedText =
            lang.selected_language.replace(
                "—",
                lang.random
            );

    }

    else if (
        state.languageMode === "en"
    ) {

        selectedText =
            lang.selected_language.replace(
                "—",
                lang.english
            );

    }

    else {

        selectedText =
            lang.selected_language.replace(
                "—",
                lang.spanish
            );

    }


    document.getElementById(
        "language-status"
    ).textContent =
        selectedText;

}


// ==========================================================
// UPDATE LANGUAGE BUTTONS
// ==========================================================

function updateLanguageButtons() {

    const lang =
        getCurrentMessages();


    const randomButton =
        document.querySelector(
            '[data-language="random"]'
        );


    const englishButton =
        document.querySelector(
            '[data-language="en"]'
        );


    const spanishButton =
        document.querySelector(
            '[data-language="es"]'
        );


    if (randomButton) {

        randomButton.textContent =
            lang.random;

    }


    if (englishButton) {

        englishButton.textContent =
            lang.english;

    }


    if (spanishButton) {

        spanishButton.textContent =
            lang.spanish;

    }

}

// ==========================================================
// UPDATE LEVEL STATUS
// ==========================================================

// ==========================================================
// UPDATE LEVEL STATUS
// ==========================================================

function updateLevelStatus() {

    const lang =
        getCurrentMessages();


    let selectedValue;


    // ======================================================
    // CUSTOM
    // ======================================================

    if (
        state.levelMode === "custom"
    ) {

        selectedValue =
            state.customAmount;

    }


    // ======================================================
    // LEVEL
    // ======================================================

    else {

        const selectedLevel =
            levels.levels.find(
                level =>
                    level.id === state.levelMode
            );


        selectedValue =
            selectedLevel
                ? selectedLevel.name
                : "—";

    }


    // ======================================================
    // UPDATE SIDEBAR
    // ======================================================

    document.getElementById(
        "level-status"
    ).textContent =
        lang.selected_level.replace(
            "—",
            selectedValue
        );

}


// ==========================================================
// RANDOM NUMBER
// ==========================================================

function getRandomNumber(
    min,
    max
) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}

function showCustomAmountInput() {

    const customAmount =
        document.getElementById(
            "custom-amount"
        );


    customAmount.hidden =
        false;


    const lang =
        getCurrentMessages();


    document.getElementById(
        "custom-amount-label"
    ).textContent =
        lang.amount_placeholder;


    document.getElementById(
        "custom-amount-input"
    ).placeholder =
        lang.amount_placeholder;


    document.getElementById(
        "custom-amount-continue"
    ).textContent =
        lang.continue;


    document.getElementById(
        "custom-amount-input"
    ).focus();

}

// ==========================================================
// CUSTOM AMOUNT
// ==========================================================

function initializeCustomAmount() {

    const button =
        document.getElementById(
            "custom-amount-continue"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            const input =
                document.getElementById(
                    "custom-amount-input"
                );


            const amount =
                parseInt(
                    input.value,
                    10
                );


            if (
                !Number.isInteger(amount) ||
                amount <= 0
            ) {

                input.focus();

                return;

            }


            state.customAmount =
                amount;


            showCategorySelection();

        }
    );

}





// ==========================================================
// START APPLICATION
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    loadData
);