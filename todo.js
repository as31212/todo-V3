//declare dom variables
const modalPageElement = document.getElementById("modal-page");
const createEntryPageElement = document.getElementById("create-entry-page");
const addEntryButtonElement = document.getElementById("add-entry-button");
const entryContainerElement = document.getElementById("entry-container");
let entriesObjects = [];

//will be used to keep track of what objects go to which dom entries
let counter = 0;


//local storage on page reset functionality

//creating the create task page
const createEntryWindow = () => {
  addEntryButtonElement.classList.toggle("hidden");
  entryContainerElement.classList.toggle("hidden");

  createEntryPageElement.innerHTML = `
  <i onclick="cancel()" class="cancel-icon fa-solid fa-x"></i>
  <label for="title"><strong>Title</strong></label><input type="text" id="title">
  <label for="date"><strong>Date</strong></label><input id="date" type="date">
  <label for="description"><strong>Description</strong></label><textarea id="description" cols="20" rows="20"></textarea>
  <button onclick="addEntryObject()" class="large-button">Add Task</button>
  `;
};

//cancel task page
const cancel = () => {
  addEntryButtonElement.classList.toggle("hidden");
  entryContainerElement.classList.toggle("hidden");
  createEntryPageElement.innerHTML = "";
};

//create task page event listener
addEntryButtonElement.addEventListener("click", () => {
  createEntryWindow();
});

//adding the entries to array
const addEntryObject = () => {
  const titleInput = document.getElementById("title");
  const dateInput = document.getElementById("date");
  const descriptionInput = document.getElementById("description");

  const newObj = {
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
    id: counter,
  };
  entriesObjects.push(newObj);

  //display changes
  createEntryPageElement.innerHTML = "";
  addEntryButtonElement.classList.toggle("hidden");
  entryContainerElement.classList.toggle("hidden");

  //set to local storage
  localStorage.setItem("entryData", JSON.stringify(entriesObjects));

  //add entry for id

  addEntry(entriesObjects.findIndex((element,index) => entriesObjects[index].id === newObj.id));
};

const addEntry = (index) => {
  //i have created this to efficiently look at the last entry within the array of entry objects
  const currentObj = entriesObjects[index];

  entryContainerElement.insertAdjacentHTML(
    "beforeend",
    `
  <div class="entry" id="entry-${currentObj.id}">  
  <label for="display-title-${currentObj.id}"><strong>Title: </strong></label><p id="display-title-${currentObj.id}">${currentObj.title}</p><br>
  <label for="display-date-${currentObj.id}"><strong>Date: </strong></label><p id="display-date-${currentObj.id}">${currentObj.date}</p><br>
  <label for="display-description-${currentObj.id}"><strong>Description: </strong></label><p id="display-description-${currentObj.id}">${currentObj.description}</p><br>
  <button onclick="createEditEntry(${currentObj.id})" id="edit-${currentObj.id}">Edit</button>
  <button onclick="deleteEntry(${currentObj.id})" id="delete-${currentObj.id}">Delete</button>
  </div>
  `
  );

  //add to counter to move on to the next id
  counter++;
};

//open edit entry window
const createEditEntry = (id) => {
  //retrieve object info
  const currentObj = entriesObjects[entriesObjects.findIndex((element)=>element.id===id)];

  addEntryButtonElement.classList.toggle("hidden");
  entryContainerElement.classList.toggle("hidden");

  createEntryPageElement.innerHTML = `
  <i onclick="cancel()" class="cancel-icon fa-solid fa-x"></i>
  <label for="title"><strong>Title</strong></label><input value="${currentObj.title}" type="text" id="title">
  <label for="date"><strong>Date</strong></label><input value="${currentObj.date}" id="date" type="date">
  <label for="description"><strong>Description</strong></label><textarea id="description" cols="20" rows="20">${currentObj.description}</textarea>
  <button onclick="editEntry(${currentObj.id})" class="large-button">Edit Task</button>
  `;
};

//edit entry functionality
const editEntry = (iD) => {
  const titleInput = document.getElementById("title");
  const dateInput = document.getElementById("date");
  const descriptionInput = document.getElementById("description");

  entriesObjects.splice(
    entriesObjects.findIndex((element) => element.id === iD),
    1,
    {
      title: titleInput.value,
      date: dateInput.value,
      description: descriptionInput.value,
      id: iD, //id property===id parameter
    }
  );
  localStorage.setItem("entryData", JSON.stringify(entriesObjects));

  //dom edit
  const currentObj = entriesObjects[entriesObjects.findIndex((element)=>element.id===iD)]
  const currentDOMEntry = document.getElementById(`entry-${iD}`);
  currentDOMEntry.innerHTML = `
<div class="entry" id="entry-${currentObj.id}">  
  <label for="display-title-${currentObj.id}"><strong>Title: </strong></label><p id="display-title-${currentObj.id}">${currentObj.title}</p><br>
  <label for="display-date-${currentObj.id}"><strong>Date: </strong></label><p id="display-date-${currentObj.id}">${currentObj.date}</p><br>
  <label for="display-description-${currentObj.id}"><strong>Description: </strong></label><p id="display-description-${currentObj.id}">${currentObj.description}</p><br>
  <button onclick="createEditEntry(${currentObj.id})" id="edit-${currentObj.id}">Edit</button>
  <button onclick="deleteEntry(${currentObj.id})" id="delete-${currentObj.id}">Delete</button>
  </div>
`;

  //display change
  addEntryButtonElement.classList.toggle("hidden");
  entryContainerElement.classList.toggle("hidden");
  createEntryPageElement.innerHTML = "";
};

//delete entry functionality
const deleteEntry = (id) => {
  //find the index of the object that needs to be deleted, then splice the object out of the array. then I update the local storage
  entriesObjects.splice(
    entriesObjects.findIndex((element) => element.id === id),
    1
  );
  localStorage.setItem("entryData", JSON.stringify(entriesObjects));

  //removing the element from the dom
  const currentEntry = document.getElementById(`entry-${id}`);
  currentEntry.remove();
};

//local storage reset obj and dom and counter
if(localStorage.length){
  entriesObjects = JSON.parse(localStorage.getItem("entryData"));
  entriesObjects.forEach((element,index) => {
   addEntry(index);
  });
  counter = entriesObjects.length-1;
 }