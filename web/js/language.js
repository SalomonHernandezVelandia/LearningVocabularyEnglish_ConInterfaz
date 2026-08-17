// ==========================================================
// Idioma de las palabras
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
    state.languageMode = language;
    updateLanguageStatus();
    showLevelSelection();
}


// ==========================================================
// UPDATE LANGUAGE STATUS
// ==========================================================
function updateLanguageStatus() {
    const lang = getCurrentMessages();
    let selectedText;
    if (state.languageMode === "random") {
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

    document.getElementById("language-status").textContent = selectedText;
}


// ==========================================================
// UPDATE LANGUAGE BUTTONS
// ==========================================================
function updateLanguageButtons() {
    const lang = getCurrentMessages();

    const buttons =
        document.querySelectorAll(
            "[data-language]"
        );

    buttons.forEach(button => {
        const language = button.dataset.language;

        if (language === "random") {
            button.textContent = lang.random;
        }
        else if (language === "en") {
            button.textContent = lang.english;
        }
        else if (language === "es") {
            button.textContent = lang.spanish;
        }
    });
}