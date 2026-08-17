// ==========================================================
// Cargar JSON y almacenar datos
// ==========================================================
let messages = null;
let levels = null;
let categories = null;
let vocabulary = null;
let interfaceLanguage = "en";


// ==========================================================
// APPLICATION STATE
// ==========================================================
const state = {
    // Idioma en el que se mostrarán las palabras
    languageMode: "random",
    // Nivel seleccionado
    levelMode: null,
    // Categoría seleccionada
    categoryMode: null,
    // Modalidad de verbos irregulares
    irregularVerbMode: null,
    // Cantidad personalizada de palabras
    customAmount: null
};


// ==========================================================
// LOAD JSON DATA
// ==========================================================
async function loadData() {
    try {
        const [
            messagesResponse,
            levelsResponse,
            categoriesResponse,
            vocabularyResponse
        ] = await Promise.all([
            // fetch("../data/messages.json"),
            // fetch("../data/levels.json"),
            // fetch("../data/categories.json"),
            // fetch("../data/vocabulary.json")
            fetch("/data/messages.json"),
            fetch("/data/levels.json"),
            fetch("/data/categories.json"),
            fetch("/data/vocabulary.json")
        ]);


        // ==================================================
        // VALIDATE RESPONSES
        // ==================================================
        if (!messagesResponse.ok) {
            throw new Error(
                `Unable to load messages.json: ${messagesResponse.status}`
            );
        }
        if (!levelsResponse.ok) {
            throw new Error(
                `Unable to load levels.json: ${levelsResponse.status}`
            );
        }
        if (!categoriesResponse.ok) {
            throw new Error(
                `Unable to load categories.json: ${categoriesResponse.status}`
            );
        }
        if (!vocabularyResponse.ok) {
            throw new Error(
                `Unable to load vocabulary.json: ${vocabularyResponse.status}`
            );
        }


        // ==================================================
        // PARSE JSON
        // ==================================================
        messages =
            await messagesResponse.json();
        levels =
            await levelsResponse.json();
        categories =
            await categoriesResponse.json();
        vocabulary =
            await vocabularyResponse.json();


        // DEFAULT LANGUAGE
        interfaceLanguage = messages.default_language || "en";


        // APPLICATION READY
        initializeApplication();


    } catch (error) {
        console.error(
            "Error loading application data:",
            error
        );
    }
}