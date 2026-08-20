// ¿Cómo calculamos/mostramos estadísticas?
// ==========================================================
// UPDATE PRACTICE STATISTICS
// ==========================================================

function updatePracticeStats() {
    const lang = getCurrentMessages();
    const correct = practiceState.correctAnswers;
    const incorrect = practiceState.incorrectAnswers;
    const answered = correct + incorrect;
    const total = practiceState.totalQuestions;

    const percentage =
        total > 0
            ? Math.round(
                (answered / total) * 100
            )
            : 0;

    document.getElementById(
        "correct-count"
    ).textContent =
        `✅ ${lang.correct}: ${correct}`;

    document.getElementById(
        "incorrect-count"
    ).textContent =
        `❌ ${lang.incorrect}: ${incorrect}`;

    document.getElementById(
        "progress-text"
    ).textContent =
        `${lang.progress}: ${percentage}%`;

    document.getElementById(
        "progress-bar"
    ).style.width =
        `${percentage}%`;

    document.getElementById(
        "round-count"
    ).textContent =
        `🔤 ${lang.word}: ${answered}/${total}`;
}