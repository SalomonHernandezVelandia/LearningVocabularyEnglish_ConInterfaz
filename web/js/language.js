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
    let selectedValue;

    if (state.languageMode === "random") {
        selectedValue = lang.random;
    }
    else if (state.languageMode === "en") {
        selectedValue = lang.english;
    }
    else {
        selectedValue = lang.spanish;
    }

    const status =
        document.getElementById("language-status");

    status.innerHTML =
        lang.selected_language.replace(
            "—",
            `<br><span class="option__selected">${selectedValue}</span>`
        );
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
        const language =
            button.dataset.language;

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