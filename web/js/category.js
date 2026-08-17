// ==========================================================
// CATEGORY SELECTION
// ==========================================================
function initializeCategorySelection() {
    const container =
        document.getElementById(
            "category-options"
        );

    if (container) {
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
                const category = button.dataset.category;
                selectCategory(category);
            }
        );
    }

    // IRREGULAR VERBS SELECTION
    const irregularContainer =
        document.getElementById(
            "irregular-verbs-options"
        );

    if (!irregularContainer) {
        return;
    }

    irregularContainer.addEventListener(
        "click",
        event => {
            const button =
                event.target.closest(
                    "[data-irregular-mode]"
                );

            if (!button) {
                return;
            }

            const mode = button.dataset.irregularMode;
            selectIrregularVerbMode(mode);
        }
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

    container.innerHTML = "";

    if (!categories || !categories.categories) {
        console.error("Categories data is not available.");
        return;
    }

    categories.categories.forEach(
        category => {
            const button =
                document.createElement(
                    "button"
                );

            button.type = "button";
            button.className = "button button-category";
            button.textContent = category;
            button.dataset.category = category;
            container.appendChild(button);

        }
    );
}


// ==========================================================
// SELECT CATEGORY
// ==========================================================
function selectCategory(category) {
    // SAVE CATEGORY
    state.categoryMode =category;

    // UPDATE SIDEBAR
    updateCategoryStatus();

    // IRREGULAR VERBS
    if (category === "List of Irregular Verbs") {
        showIrregularVerbsSelection();
        return;
    }

    // NORMAL CATEGORY
    startVocabularyPractice();
}

// SHOW IRREGULAR VERBS SELECTION
function showIrregularVerbsSelection() {
    const categorySelection =
        document.getElementById(
            "category-selection"
        );

    const irregularSelection =
        document.getElementById(
            "irregular-verbs-selection"
        );

    // HIDE CATEGORY SELECTION
    categorySelection.hidden = true;

    // SHOW IRREGULAR VERBS SELECTION
    irregularSelection.hidden = false;

    // UPDATE MAIN MESSAGE
    const lang = getCurrentMessages();

    document.getElementById(
        "main-message"
    ).textContent =
        "Choose an irregular verbs mode";
}


// ==========================================================
// SELECT IRREGULAR VERB MODE
// ==========================================================
function selectIrregularVerbMode(mode) {
    // SAVE MODE
    state.irregularVerbMode = mode;

    // RANDOM VERBS
    if (mode === "random") {
        startVocabularyPractice();
        return;
    }

    // VERBS BY TENSES
    if (mode === "tenses") {
        startIrregularTensesPractice();
        return;
    }

}

// ==========================================================
// UPDATE CATEGORY STATUS
// ==========================================================
function updateCategoryStatus() {
    const lang = getCurrentMessages();
    let selectedValue = state.categoryMode || "—";

    document.getElementById(
        "category-status"
    ).textContent =
        lang.selected_category.replace(
            "—",
            selectedValue
        );
}