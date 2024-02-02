//declare dom variables
const modalPageElement = document.getElementById('modal-page');
const createEntryPageElement = document.getElementById('create-entry-page');
const addEntryButtonElement = document.getElementById('add-entry-button');
const entryContainerElement = document.getElementById('entry-container');
const entriesObject = {}

const createEntry=()=>{
    const counter = document.querySelectorAll('input')+1;
    addEntryButtonElement.classList.add('hidden');
    entryContainerElement.classList.add('hidden');
    const HTML = `
    <i id="cancel-icon-${counter}" class="cancel-icon fa-solid fa-x"></i>
    <label for="title-input-${counter}"><strong>Title</strong></label>
    <input required type="text" id="title-input-${counter}">
    <label for="date-input-${counter}"><strong>Date</strong></label>
    <input required id="date-input-${counter}" type="date">
    <label for="description-input-${counter}"><strong>Description</strong></label>
    <textarea cols="20" rows="10" required id="description-input-${counter}"></textarea>
    <button class="large-button">Add Task</button>    
    `
    createEntryPageElement.innerHTML = HTML;
}

addEntryButtonElement.addEventListener('click',()=>{
    createEntry();
})