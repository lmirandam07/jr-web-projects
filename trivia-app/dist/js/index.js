const startSection = document.getElementById("trivia-start");
const catsSection = document.getElementById("trivia-cats");
const diffSection = document.getElementById("trivia-diff");
const questionsSection = document.getElementById("trivia-questions");
const resultSection = document.getElementById("trivia-results");

const startBtn = document.getElementById("start-btn");
const catsBtns = document.querySelectorAll(".category");
const diffBtns = document.querySelectorAll(".difficulty");
const playAgainBtn = document.getElementById(".play-again-btn");

const infoAPI = {
    URL: "https://opentdb.com/api.php?amount=10",
    categoryID: "",
    difficulty: "",
};

let numPregunta = 1;
let totalCorrect = 0;

// * Functions

function displaySections(section, nextSection) {
    section.style.animationPlayState = "running";

    setTimeout(() => {
        section.style.display = "none";
        nextSection.style.display = "inline-block";
    }, 950);
}

async function getQuestions() {
    const resp = await fetch(
        `${infoAPI.URL}&category=${infoAPI.categoryID}&difficulty=${infoAPI.difficulty}&type=multiple`
    );
    const data = await resp.json();

    const questions = data.results.map((result) => {
        return {
            question: result.question,
            incorrectOpt: result.incorrect_answers,
            correctOpt: result.correct_answer,
        };
    });

    showQuestions(questions);
}

function showQuestions(questions) {
    let questionEl = `

    `;
    questionsSection.innerHTML = questionEl;
}

// * Event listeners
// * Change sections display

startBtn.addEventListener("click", () =>
    displaySections(startSection, catsSection)
);

for (const category of catsBtns) {
    category.addEventListener("click", () => {
        infoAPI.categoryID = event.target.dataset.id;
        displaySections(catsSection, diffSection);
    });
}

for (const diff of diffBtns) {
    diff.addEventListener("click", () => {
        infoAPI.difficulty = event.target.dataset.diff;
        getQuestions();
    });
}
