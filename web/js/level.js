// ==========================================================
// Niveles y cantidad de palabras
// ==========================================================
function renderLevelOptions() {
    const container =
        document.getElementById(
            "level-options"
        );

    container.innerHTML = "";

    if (!levels || !levels.levels) {
        console.error("Levels data is not available.");
        return;
    }


    levels.levels.forEach(level => {
        const button =
            document.createElement(
                "button"
            );

        button.type = "button";
        button.className = "button button-level";
        button.textContent = level.name;
        button.dataset.level = level.id;
        button.addEventListener(
            "click",
            () => {
                selectLevel(level.id);
            }
        );

        container.appendChild(button);
    });
}


// ==========================================================
// SELECT LEVEL
// ==========================================================
function selectLevel(levelId) {
    // CUSTOM AMOUNT
    if (levelId === "custom") {
        showCustomAmount();
        return;
    }

    // VALIDATE LEVEL
    if (!levels.ranges || !levels.ranges[levelId]) {
        console.error(`Range for level "${levelId}" not found.`);
        return;
    }

    // GET RANGE
    const range = levels.ranges[levelId];

    // GENERATE RANDOM AMOUNT
    const amount =
        getRandomAmount(
            range.start,
            range.stop,
            range.step
        );

    // SAVE STATE
    state.levelMode = levelId;
    state.customAmount = amount;

    // UPDATE SIDEBAR
    updateLevelStatus();

    // CONTINUE
    showCategorySelection();
}


// ==========================================================
// GENERATE RANDOM AMOUNT
// ==========================================================
function getRandomAmount(start, stop, step) {
    const numberOfSteps =
        Math.floor(
            (stop - start) / step
        );


    const randomStep =
        Math.floor(
            Math.random() *
            (numberOfSteps + 1)
        );


    return (start +randomStep * step);
}


// ==========================================================
// UPDATE LEVEL STATUS
// ==========================================================
function updateLevelStatus() {
    const lang = getCurrentMessages();
    let selectedValue;

    if (state.levelMode === "custom") {
        selectedValue = `${state.customAmount} ${lang.words}`;
    }
    // PREDEFINED LEVEL
    else {
        const selectedLevel =
            levels?.levels?.find(
                level =>
                    level.id === state.levelMode
            );

        if (selectedLevel) {
            selectedValue = `${selectedLevel.id} — ${state.customAmount} ${lang.words}`;
        }
        else {
            selectedValue = "—";
        }
    }

    // UPDATE SIDEBAR
    document.getElementById(
        "level-status"
    ).textContent =
        lang.selected_level.replace(
            "—",
            selectedValue
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

    const lang = getCurrentMessages();
    label.textContent = lang.word_count_label;
    continueButton.textContent = lang.continue;
    customAmount.hidden = false;

    document.getElementById(
        "custom-amount-input"
    ).focus();
}


// ==========================================================
// INITIALIZE CUSTOM AMOUNT
// ==========================================================
function initializeCustomAmount() {
    const button =
        document.getElementById(
            "custom-amount-continue"
        );

    if (!button) {
        return;
    }

    button.addEventListener("click", continueWithCustomAmount);
}


// ==========================================================
// CONTINUE WITH CUSTOM AMOUNT
// ==========================================================
function continueWithCustomAmount() {
    const input =
        document.getElementById(
            "custom-amount-input"
        );

    const amount = Number(input.value);

    // VALIDATE
    if (!Number.isInteger(amount) || amount <= 0) {
        alert(getCurrentMessages().invalid_amount);
        input.focus();
        return;
    }

    // SAVE STATE
    state.customAmount = amount;
    state.levelMode = "custom";

    // UPDATE SIDEBAR
    updateLevelStatus();

    // CONTINUE
    showCategorySelection();
}