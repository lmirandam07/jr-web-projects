const addNoteBtn = document.getElementById("add-note");
const modal = document.getElementById("modal__container");
const title = document.getElementById("modal-title");
const modalCloseBtn = document.getElementById("modal-close");
const modalForm = document.getElementById("modal-content");
const notesContainer = document.getElementById('notes__container');
const colorBoxes = document.getElementsByClassName("color-box");
const message = document.getElementById("modal-message");
const saveBtn = document.getElementById("modal-btn");

let now = moment();

function obtainColor() {

    // * Check which color do the user select
    for (const colorBox of colorBoxes) {
        if (colorBox.checked) {
            if (colorBox.classList.contains('red')) {
                return 'red';

            } else if (colorBox.classList.contains('blue')) {
                return 'blue';

            } else if (colorBox.classList.contains('green')) {
                return 'green';

            } else if (colorBox.classList.contains('orange')) {
                return 'orange';

            } else if (colorBox.classList.contains('purple')) {
                return 'purple';
            }
        }
    }
}

// * Generate unique ids for every note
function* generateID() {
    let i = 1;
    while(true) {
        yield i++;
    }
}

const gen = generateID();

function createNote() {
    const noteEl = document.createElement("div");
    noteEl.id = `note-${gen.next().value}`;
    noteEl.classList.add("note");
    noteEl.classList.add(obtainColor());

    noteEl.innerHTML = `
        <div class="note-header">
            <h3 contentEditable="true">${title.value}</h3>
            <button class="delete-note" id="delete-note" onClick="deleteNote(this.parentNode.parentNode)" ondblclick="editNote(this.parentNode)">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5 15.538l-3.592-3.548 3.546-3.587-1.416-1.403-3.545 3.589-3.588-3.543-1.405 1.405 3.593 3.552-3.547 3.592 1.405 1.405 3.555-3.596 3.591 3.55 1.403-1.416z"
                    />
                </svg>
            </button>
        </div>
        <p contentEditable="true">${message.value}</p>
        <small>Creada: ${now.format('l')}</small>
    `;

    return noteEl;
    
}

const deleteNote = (el) => document.getElementById(el.id).remove(); 

// * Event listeners
addNoteBtn.addEventListener("click", () => modal.style.display = "flex");
modalCloseBtn.addEventListener("click", () => modal.style.display = "none");

modalForm.addEventListener("submit", event => {
    event.preventDefault();
    createNote();
    notesContainer.appendChild(createNote());
    message.value = '';
    title.value = '';
});
