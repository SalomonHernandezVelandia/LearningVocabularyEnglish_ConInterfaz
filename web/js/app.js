// ==========================================================
// INITIALIZE APPLICATION
// ==========================================================

function initializeApplication() {
    // INTERFACE
    applyMessages();
    initializeInterfaceLanguageSelection();

    // PRACTICE LANGUAGE
    initializeLanguageSelection();

    // LEVEL
    initializeCustomAmount();

    // CATEGORY
    initializeCategorySelection();

    // VOCABULARY PRACTICE
    initializePractice();
}


// ==========================================================
// START APPLICATION
// ==========================================================
document.addEventListener(
    "DOMContentLoaded",
    loadData
);