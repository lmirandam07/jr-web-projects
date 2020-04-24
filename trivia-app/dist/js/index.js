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

let numQuestion = 0;
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
            category: result.category,
            question: result.question,
            incorrectOpt: result.incorrect_answers,
            correctOpt: result.correct_answer,
        };
    });

    showQuestions(questions);
}

function showQuestions(questions) {
    const actQuestion = questions[numQuestion];
    let options = [...actQuestion.incorrectOpt, actQuestion.correctOpt];
    options = optionsShuffle(options);

    let questionEl = `
        <small>${numQuestion + 1}/<span class="question-num">10</span></small>
        <h3 class="subtitle">${actQuestion.category}</h3>
        <p>${actQuestion.question}</p>
        <form class="options">
            <div><input type="radio" name="option" id="opt-1" class="option" checked><label for="opt-1">${options[0]}</label></input></div>
            <div><input type="radio" name="option" id="opt-2" class="option"><label for="opt-2">${options[1]}</label></input></div>
            <div><input type="radio" name="option" id="opt-3" class="option"><label for="opt-3">${options[2]}</label></input></div>
            <div><input type="radio" name="option" id="opt-4" class="option"><label for="opt-4">${options[3]}</label></input></div>
            <input type="submit" class="next-btn" id="next-btn" onsubmit="${nextQuestion}" value="Next">
        </form>
    `;
    questionsSection.innerHTML = questionEl;


}

function checkAnswer() {

}

function nextQuestion() {

}

function optionsShuffle(array) {
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i);
        const aux = array[i];
        array[i] = array[j];
        array[j] = aux;
    }

    return array;
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
        displaySections(diffSection, questionsSection);
        getQuestions();
    });
}
