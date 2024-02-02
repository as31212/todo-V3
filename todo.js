//declare dom variables
const modalPageElement = document.getElementById("modal-page");
const createEntryPageElement = document.getElementById("create-entry-page");
const addEntryButtonElement = document.getElementById("add-entry-button");
const entryContainerElement = document.getElementById("entry-container");
const entriesObject = [];

//create entry button functionality, unsure if i need a counter as of right now, but I will remove it later if not needed
const createEntry = () => {
  addEntryButtonElement.classList.toggle("hidden");
  entryContainerElement.classList.toggle("hidden");
  const HTML = `
    <i onclick="cancel()" id="cancel-icon" class="cancel-icon fa-solid fa-x"></i>
    <label for="title-input"><strong>Title</strong></label>
    <input required type="text" id="title-input">
    <label for="date-input"><strong>Date</strong></label>
    <input required id="date-input" type="date">
    <label for="description-input"><strong>Description</strong></label>
    <textarea cols="20" rows="10" required id="description-input"></textarea>
    <button onclick="addTask()" id="add-task-button" class="large-button">Add Task</button>    
    `;
  createEntryPageElement.innerHTML = HTML;
};

addEntryButtonElement.addEventListener("click", () => {
  createEntry();
});

//add task functionality

const addTask = () => {
  const titleEntry = document.getElementById("title-input");
  const dateEntry = document.getElementById("date-input");
  const descriptionEntry = document.getElementById("description-input");
  entriesObject.push({
    title: `${titleEntry.value}`,
    dateEntry: `${dateEntry.value}`,
    description: `${descriptionEntry.value}`,
  });

  //resetting the page
  addEntryButtonElement.classList.toggle("hidden");
  entryContainerElement.classList.toggle("hidden");
  createEntryPageElement.innerHTML = "";

  const counter = document.querySelectorAll(".entry");

  //creating HTML
  const HTML = `
  <div class="entry" id="entry-${counter}">
  <label for="title-entry-${counter}"><strong>Title: </strong><p id="title-entry-${counter}">${titleEntry.value}</p></label>
  <br>
  <label for="date-entry-${counter}"><strong>Date: </strong><p id="date-entry-${counter}">${dateEntry.value}</p></label>
  <br>
  <label for="description-entry-${counter}"><strong>Description: </strong><p id="description-entry-${counter}">${descriptionEntry.value}</p></label>
  <br>
  <button id="edit-button-${counter}">Edit</button>
  <button id="delete-button-${counter}">Delete</button>
  </div>
  `;

  entryContainerElement.insertAdjacentHTML("beforeend", HTML);
  localStorage.setItem(JSON.stringify(entriesObject));
};

//cancel functionality
const cancel = () => {
  addEntryButtonElement.classList.toggle("hidden");
  entryContainerElement.classList.toggle("hidden");
  createEntryPageElement.innerHTML = "";
};
