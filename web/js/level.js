// ==========================================================
// Niveles y cantidad de palabras
// ==========================================================
function renderLevelOptions() {

    const container =
        document.getElementById("level-options");

    container.innerHTML = "";

    if (!levels || !levels.levels) {
        console.error("Levels data is not available.");
        return;
    }

    levels.levels.forEach(level => {

        const button =
            document.createElement("button");

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
    else {
        const selectedLevel =
            levels?.levels?.find(
                level =>
                    level.id === state.levelMode
            );

        if (selectedLevel) {
            selectedValue =
                `${selectedLevel.id} — ${state.customAmount} ${lang.words}`;
        }
        else {
            selectedValue = "—";
        }
    }

    const status = document.getElementById("level-status");

    status.innerHTML =
        lang.selected_level.replace(
            "—",
            `<span class="option__selected">${selectedValue}</span>`
        );
}


// ==========================================================
// SHOW CUSTOM AMOUNT
// ==========================================================
function showCustomAmount() {
    const container = document.getElementById("level-options");

    const customButton =
        container.querySelector(
            '[data-level="custom"]'
        );

    if (!customButton) {
        console.error("Custom amount button was not found.");
        return;
    }

    // Evitar crear el formulario dos veces
    const existingForm = document.getElementById("custom-amount");

    if (existingForm) {
        existingForm.remove();
    }
    const lang = getCurrentMessages();

    // CUSTOM AMOUNT CONTAINER
    const customAmount = document.createElement("div");
    customAmount.className = "custom-amount";
    customAmount.id = "custom-amount";

    // LABEL
    const label = document.createElement("label");
    label.className = "custom-amount__label";
    label.id = "custom-amount-label";
    label.htmlFor = "custom-amount-input";
    label.textContent = lang.word_count_label;

    // INPUT
    const input = document.createElement("input");
    input.className = "custom-amount__input";
    input.id = "custom-amount-input";
    input.type = "number";
    input.min = "1";
    input.step = "1";
    input.autocomplete = "off";

    // CONTINUE BUTTON
    const continueButton = document.createElement("button");
    continueButton.className = "button button--primary";
    continueButton.id = "custom-amount-continue";
    continueButton.type = "button";
    continueButton.textContent = lang.continue;

    // EVENTS
    continueButton.addEventListener(
        "click",
        continueWithCustomAmount
    );

    input.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                continueWithCustomAmount();
            }
        }
    );

    // BUILD
    customAmount.appendChild(label);
    customAmount.appendChild(input);
    customAmount.appendChild(continueButton);

    // INSERT DIRECTLY BELOW CUSTOM BUTTON
    customButton.insertAdjacentElement(
        "afterend",
        customAmount
    );

    // FOCUS
    input.focus();
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