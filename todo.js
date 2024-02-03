//declare dom variables
const modalPageElement = document.getElementById("modal-page");
const createEntryPageElement = document.getElementById("create-entry-page");
const addEntryButtonElement = document.getElementById("add-entry-button");
const entryContainerElement = document.getElementById("entry-container");
let entriesObject = [];


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
    <button onclick="addTaskToObject(); updateEntryContainer()" id="add-task-button" class="large-button">Add Task</button>    
    `;
  createEntryPageElement.innerHTML = HTML;
};

addEntryButtonElement.addEventListener("click", () => {
  createEntry();
});

//add task functionality

const addTaskToObject = () => {
  const titleEntry = document.getElementById("title-input");
  const dateEntry = document.getElementById("date-input");
  const descriptionEntry = document.getElementById("description-input");
  entriesObject.push({
    title: `${titleEntry.value}`,
    dateEntry: `${dateEntry.value}`,
    description: `${descriptionEntry.value}`,    
  });

  //updating the local storage 
  localStorage.setItem('entryData',JSON.stringify(entriesObject));
};

//update entry container html
const updateEntryContainer = ()=>{
const counter = entriesObject.length-1;
const title = entriesObject[counter].title;
const date = entriesObject[counter].dateEntry;
const description = entriesObject[counter].description;

  //resetting the page
  if(entryContainerElement.classList.contains('hidden')){
  addEntryButtonElement.classList.toggle("hidden");
  entryContainerElement.classList.toggle("hidden");
  createEntryPageElement.innerHTML = "";
  }
 

  //creating HTML
  const HTML = `
  <div class="entry" id="entry-${counter}">
  <label for="title-entry-${counter}"><strong>Title: </strong><p id="title-entry-${counter}">${title}</p></label>
  <br>
  <label for="date-entry-${counter}"><strong>Date: </strong><p id="date-entry-${counter}">${date}</p></label>
  <br>
  <label for="description-entry-${counter}"><strong>Description: </strong><p id="description-entry-${counter}">${description}</p></label>
  <br>
  <button id="edit-button-${counter}">Edit</button>
  <button onclick="deleteEntry(${counter})" id="delete-button-${counter}">Delete</button>
  </div>
  `;

  entryContainerElement.insertAdjacentHTML("beforeend", HTML);
}

//update base on local storage function

const updateEntryContainerLocalStorage = (element)=>{
  const title = entriesObject[element].title;
  const date = entriesObject[element].dateEntry;
  const description = entriesObject[element].description;
   
  
    //creating HTML
    const HTML = `
    <div class="entry" id="entry-${element}">
    <label for="title-entry-${element}"><strong>Title: </strong><p id="title-entry-${element}">${title}</p></label>
    <br>
    <label for="date-entry-${element}"><strong>Date: </strong><p id="date-entry-${element}">${date}</p></label>
    <br>
    <label for="description-entry-${element}"><strong>Description: </strong><p id="description-entry-${element}">${description}</p></label>
    <br>
    <button id="edit-button-${element}">Edit</button>
    <button onclick="deleteEntry(${element})" id="delete-button-${element}">Delete</button>
    </div>
    `;
  
    entryContainerElement.insertAdjacentHTML("beforeend", HTML);
  }

if(localStorage.length){
entriesObject = JSON.parse(localStorage.getItem('entryData'));
entriesObject.forEach((element,index) => {
  updateEntryContainerLocalStorage(index);
});
}

//event listener

//cancel functionality
const cancel = () => {
  addEntryButtonElement.classList.toggle("hidden");
  entryContainerElement.classList.toggle("hidden");
  createEntryPageElement.innerHTML = "";
};

// delete button onclick function
const deleteEntry = (counter)=>{
const selectedEntry = document.getElementById(`entry-${counter}`);
entriesObject.splice(`${counter}`,1);
selectedEntry.remove();
localStorage.setItem('entryData',JSON.stringify(entriesObject));
}