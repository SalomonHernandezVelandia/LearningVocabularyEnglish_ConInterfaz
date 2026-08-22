// ==========================================================
// ¿Cómo generamos las preguntas?
// ==========================================================
function generateQuestions(category, amount) {
    // IRREGULAR VERBS
    if (category === "List of Irregular Verbs") {
        return generateIrregularVerbQuestions(amount);
    }

    // NORMAL VOCABULARY
    let categoryVocabulary;
    if (category === "Aleatorio") {
        categoryVocabulary = getAllVocabulary();
    } else {
        categoryVocabulary =
            vocabulary.learning_english[category];
    }

    // VALIDATE CATEGORY
    if (!categoryVocabulary) {
        console.error(
            `Category "${category}" was not found.`
        );
        return [];
    }

    // GET WORDS
    const entries = Object.entries(categoryVocabulary);
    if (entries.length === 0) {
        console.error(
            `Category "${category}" has no vocabulary.`
        );
        return [];
    }

    // GENERATE QUESTIONS
    const questions = [];
    while (questions.length < amount) {
        // Create a new shuffled cycle
        const cycle = [...entries];
        shuffleArray(cycle);
        // Add words from this cycle
        for (const entry of cycle) {
            questions.push(entry);
            // Stop exactly when we reach the requested amount
            if (questions.length >= amount) {
                break;
            }
        }
    }
    return questions;
}


// ==========================================================
// GENERATE IRREGULAR VERB QUESTIONS
// ==========================================================
function generateIrregularVerbQuestions(amount) {
    const irregularVerbs =
        vocabulary.learning_english[
            "List of Irregular Verbs"
        ];

    if (!irregularVerbs) {
        console.error("Irregular verbs data was not found.");

        return [];
    }

    const verbs = [...irregularVerbs];
    shuffleArray(verbs);
    const selectedVerbs = verbs.slice(
        0,
        Math.min(amount, verbs.length)
    );

    // RANDOM MODE
    if (state.irregularVerbMode === "random") {
        const questions = [];
        selectedVerbs.forEach(verb => {
            const forms = Object.entries(verb);
            const randomForm =
                forms[
                    Math.floor(
                        Math.random() * forms.length
                    )
                ];
            questions.push(randomForm);
        });
        return questions;
    }

    // TENSES MODE
    if (state.irregularVerbMode === "tenses") {
        return selectedVerbs;
    }

    return [];
}


// ==========================================================
// GET ALL VOCABULARY
// ==========================================================
function getAllVocabulary() {
    const allVocabulary = {};
    const categories = vocabulary.learning_english;
    for (const category in categories) {
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
    for (let i = array.length - 1; i > 0; i--) {
        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];
    }
}