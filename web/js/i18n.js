// ==========================================================
// Idioma de interfaz/traducciones
// ==========================================================
function getCurrentMessages() {
    return messages[interfaceLanguage];
}


// ==========================================================
// APPLY INTERFACE TRANSLATIONS
// ==========================================================
function applyMessages() {
    const lang = getCurrentMessages();
    if (!lang) {
        console.error(
            `Language "${interfaceLanguage}" not found.`
        );
        return;
    }

    // HTML LANGUAGE
    document.documentElement.lang = interfaceLanguage;

    // BROWSER TITLE
    document.title = lang.title;

    // MAIN TITLE
    document.getElementById("app-title").textContent = lang.title;

    // SIDEBAR
    document.getElementById("options-title").textContent = lang.options;
    document.getElementById("interface-language-label").textContent = lang.interface_language;

    // LANGUAGE
    document.getElementById("language-button").textContent = lang.language;

    // LEVEL
    document.getElementById("level-button").textContent = lang.level;

    // CATEGORY
    document.getElementById("category-button").textContent = lang.category;

    // STATISTICS
    document.getElementById("score-title").textContent = lang.score;
    updatePracticeStats();

    // MAIN MESSAGE
    document.getElementById("main-message").textContent = lang.language_selection;

    // ======================================================
    // UPDATE DYNAMIC ELEMENTS
    // ======================================================
    updateLanguageButtons();
    updateLanguageStatus();
    updateLevelStatus();
    updateCategoryStatus();
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