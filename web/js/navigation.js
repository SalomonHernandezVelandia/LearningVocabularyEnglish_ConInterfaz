// ==========================================================
// Mostrar/ocultar secciones
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

    languageSelection.hidden = true;
    levelSelection.hidden = false;
    const lang = getCurrentMessages();

    document.getElementById(
        "main-message"
    ).textContent =
        lang.level_selection;

    renderLevelOptions();
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

    levelSelection.hidden = true;
    categorySelection.hidden = false;
    const lang = getCurrentMessages();

    document.getElementById(
        "main-message"
    ).textContent =
        lang.category_selection;

    renderCategoryOptions();
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

    const lang = getCurrentMessages();

    document.getElementById(
        "main-message"
    ).textContent =
        lang.translation_input;

    document.getElementById(
        "answer-button"
    ).textContent =
        lang.next;
}