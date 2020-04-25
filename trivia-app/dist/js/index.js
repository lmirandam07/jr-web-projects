const startSection = document.getElementById("trivia-start");
const catsSection = document.getElementById("trivia-cats");
const diffSection = document.getElementById("trivia-diff");
const questionsSection = document.getElementById("trivia-questions");
const resultSection = document.getElementById("trivia-results");

const startBtn = document.getElementById("start-btn");
const catsBtns = document.querySelectorAll(".category");
const diffBtns = document.querySelectorAll(".difficulty");
const playAgainBtn = document.getElementById("play-again-btn");

const finalEscoreEl = document.getElementById("score");

const infoAPI = {
    URL: "https://opentdb.com/api.php?amount=10",
    categoryID: "",
    difficulty: "",
};

let numQuestion = 0;
let finalEscore = 0;

// * Functions

function displaySections(section, nextSection) {
    section.style.animationPlayState = "running";

    setTimeout(() => {
        section.style.display = "none";
        nextSection.style.display = "inline-block";
    }, 500);
}

async function getQuestions() {
    const resp = await fetch(
        `${infoAPI.URL}&category=${infoAPI.categoryID}&difficulty=${infoAPI.difficulty}&type=multiple`
    );
    const data = await resp.json();

    // * Reduce fetched data into the required values
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

    // * Validate if selected option is correct
    function checkAnswer() {
        const optionsRadio = document.getElementsByClassName('option');
        for (const option of optionsRadio) {
            if(option.checked) {
                if(option.dataset.option === actQuestion.correctOpt) {
                    finalEscore++;
                }
            }
        }

        if(numQuestion < 9) {
            numQuestion++;
            questionsSection.innerHTML = '';
            showQuestions(questions);
        } else {

            finalEscoreEl.innerText = finalEscore;
            displaySections(questionsSection, resultSection);
        }

    }
    // * Create question HTML element and add to the question section container
    let questionEl = `
        <small>${numQuestion + 1}/<span class="question-num">10</span></small>
        <h3 class="subtitle">${actQuestion.category}</h3>
        <p>${actQuestion.question}</p>
        <form class="options">
            <div>
                <input type="radio" name="option" id="opt-1" class="option" data-option="${options[0]}" checked><label for="opt-1">${options[0]}</label></input>
            </div>
            <div>
                <input type="radio" name="option" id="opt-2" class="option" data-option="${options[1]}"><label for="opt-2">${options[1]}</label></input>
            </div>
            <div>
                <input type="radio" name="option" id="opt-3" class="option" data-option="${options[2]}"><label for="opt-3">${options[2]}</label></input>
            </div>
            <div>
                <input type="radio" name="option" id="opt-4" class="option" data-option="${options[3]}"><label for="opt-4">${options[3]}</label></input>
            </div>
            <button type="button" class="next-btn" id="next-btn">Next</button>
        </form>
    `;
    questionsSection.innerHTML = questionEl;

    document.getElementById('next-btn').addEventListener('click', checkAnswer);
}


// * Shuffle array of options to show it in a random order
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

// * Go over categories and difficulties NodeList, and add click events listeners
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

playAgainBtn.addEventListener('click', () => location.reload());