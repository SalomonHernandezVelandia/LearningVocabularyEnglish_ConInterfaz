# English Vocabulary Learning

<a name="top"></a>

[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![SCSS](https://img.shields.io/badge/SCSS-CF649A?logo=sass&logoColor=white)](https://sass-lang.com/)
[![OOP](https://img.shields.io/badge/OOP-Object--Oriented%20Programming-6A5ACD)](#)
[![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white)](https://git-scm.com/)
[![JSON](https://img.shields.io/badge/JSON-000000?logo=json&logoColor=white)](https://www.json.org/)
[![CustomTkinter](https://img.shields.io/badge/CustomTkinter-2E86C1)](https://github.com/TomSchimansky/CustomTkinter)


An interactive English vocabulary practice application designed to make vocabulary learning more dynamic and engaging.

The application allows users to practice English vocabulary through different languages, proficiency levels, categories, and learning modes. 

The project was originally developed as a Python desktop application using CustomTkinter and it was extended with a web version so that the application can be accessed directly from a browser

## Features

* Practice vocabulary between English and Spanish.
* Select the language used during each practice session.
* Practice vocabulary according to different English proficiency levels.
* Choose a custom number of words for a practice session.
* Practice specific vocabulary categories or select a random category.
* Practice irregular verbs using different learning modes.
* Randomized vocabulary questions.
* Prevent the same word from appearing excessively during a session.
* Track correct and incorrect answers.
* Display practice progress and final results.
* Partial scoring system for grouped irregular-verb exercises.
* Dark-themed desktop interface with a customized orange/yellow visual theme.

## Technologies

### Desktop Application

* **Python** — Main programming language.
* **CustomTkinter** — Graphical user interface framework.
* **JSON** — Interface theme configuration.
* **Object-Oriented Programming** — Used to structure the application's GUI components and application state.
* **Git / GitHub** — Version control and source-code management.

### Planned Web Version

The project is being extended into a browser-based version using:

* **HTML5**
* **Sass / CSS**
* **JavaScript**
* **JSON**
* **Vercel** — Web deployment.

## Project Structure

The project is organized into separate components for data, application logic, interface components, and configuration.

```text
english-vocabulary-trainer/
│
├── data/
│   └── vocabulary.json
│
├── desktop/
│   ├── main.py
│   ├── config.py
│   ├── data.py
│   ├── messages.py
│   │
│   ├── gui/
│   │   ├── app.py
│   │   ├── screens.py
│   │   ├── functionalities.py
│   │   └── widgets.py
│   │
│   └── themes/
│       └── yellow.json
│
├── web/
│   └── ...
│
├── requirements.txt
├── README.md
└── .gitignore
```

## Application Architecture

The vocabulary data is being separated from the application logic so that it can be shared between the desktop and web versions.

```text
                  vocabulary.json
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
       Python Desktop          Web Application
              │                     │
       CustomTkinter           JavaScript
```

This approach avoids maintaining separate copies of the vocabulary for each version.

## Vocabulary Organization

Vocabulary is organized by categories such as:

* Family
* Relations
* Work Environment
* Characteristics of People
* Emotions
* Personality Traits
* Parts of the Body
* Clothes and Shoes
* Parts of the House
* Household Items
* Transportation
* Musical Instruments
* Adjectives
* Animals
* Food and Drinks
* Prepositions
* Adverbs
* Conjunctions
* Connectors
* Irregular Verbs
* Phrasal Verbs
* Technical English
* English Readings

The vocabulary structure is designed to allow new categories and words to be added without modifying the application's core logic.

## Learning Modes

The application supports three language modes:

* **Random** — The application randomly determines which language is displayed.
* **English** — An English word is displayed and the user provides the Spanish translation.
* **Spanish** — A Spanish word is displayed and the user provides the English translation.

Vocabulary can also be practiced according to different proficiency levels:

* A1
* A2
* B1
* B2
* C1
* C2
* Custom number of words

## Irregular Verbs

Irregular verbs have a specialized practice mode.

Users can choose between:

### Random Practice

Individual verb forms are presented randomly.

### Grouped Practice

Different forms of the same irregular verb are presented together, allowing the user to practice the different verb forms in a single exercise.

## Desktop Application

The desktop version is executed through:

```bash
python main.py
```

The application uses CustomTkinter to create the graphical interface and Python to manage the vocabulary selection, randomization, scoring, progress tracking, and exercise logic.

## Web Version

A browser-based version is being developed to make the application accessible without requiring Python or a local desktop installation.

The web version will preserve the main learning concepts of the desktop application while adapting the interface and interaction model to the browser.


## Future Improvements

Planned improvements include:

* Browser-based interactive version.
* Responsive design for desktop and mobile devices.
* Persistent learning progress.
* Additional vocabulary categories.
* Improved scoring and statistics.
* Pronunciation and audio support.
* Learning streaks and achievements.
* Expanded exercises for different proficiency levels.
* Improved accessibility and user experience.

## Author

**Salomón Hernández Velandia**

Multimedia Engineering — Universidad Militar Nueva Granada.

---

## License

This project is intended as a personal educational and portfolio project.


<!-- sass --watch scss/style.scss:css/style.css -->