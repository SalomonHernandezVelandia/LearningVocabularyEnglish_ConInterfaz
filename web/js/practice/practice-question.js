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
        categoryVocabulary = vocabulary.learning_english[category];
    }

    if (!categoryVocabulary) {
        console.error(`Category "${category}" was not found.`);
        return [];
    }

    const entries = Object.entries(categoryVocabulary);
    shuffleArray(entries);
    const questionAmount = Math.min(amount,entries.length);

    return entries.slice(0, questionAmount);
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