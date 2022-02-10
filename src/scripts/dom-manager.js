import {
    getProjectById,
    projects,
    removeProject,
    save,
} from "./project-manager";
import Overlay from "./todo-overlay";

const addButton = document.getElementById("addButton"); //Add to List Button
const taskInput = document.getElementById("task"); //Text input of todo
const tasksDiv = document.getElementById("tasks"); //container for all todos
const headerContainer = document.getElementById("projectHeader");
const main = document.querySelector("#main"); //the main container where the todo list is displayed
let currentProjectID = 0; //keeps track of the index number of the current project

function saveCurrentId() {
    //saves the current project ID to local storage
    localStorage.setItem("currentProjectID", JSON.stringify(currentProjectID));
}

function loadCurrentId() {
    //loads the current project ID from local storage
    currentProjectID = JSON.parse(localStorage.getItem("currentProjectID"));
}

function parseExistingTodos(id) {
    //calls the append todo function for each todo item in the project object
    getProjectById(id).todos.forEach((item) => {
        appendTodo(item);
    });
}

function appendTodo(todo) {
    //appends the todo to the list
    const newTodo = document.createElement("div"); //container for todo element
    newTodo.classList.add("todo"); //styling
    newTodo.setAttribute("data-todoID", `${todo.id}`); //stores the todos unique id (unique in the project) as a data attribute

    const container = document.createElement("div"); //this will include the checkbox and todo description
    container.classList.add("todoContainer");

    const todoCheckbox = document.createElement("input"); //checkbox for todo element
    todoCheckbox.setAttribute("type", "checkbox");
    todoCheckbox.classList.add("checkbox");

    //Adds functionality to the checkboxes that the task gets deleted once checkbox is clicked
    todoCheckbox.addEventListener("click", () => {
        getProjectById(currentProjectID).removeTodo(
            //removes the todo item from the todo array in the project when it is markes as complete (checked)
            todoCheckbox.parentElement.parentElement.getAttribute("data-todoID")
        );
        todoCheckbox.parentElement.parentElement.remove(); // removes the todo item from the dom when it is marked as complete (checked)
        save(); //saves project data to local storage
    });

    const todoText = document.createElement("p"); //description for todo element
    todoText.setAttribute("id", "todoText");
    todoText.innerHTML = todo.descr;

    const todoPriority = document.createElement("p"); //creates the small exclamation mark on the right to show the todos priority (0 by default)
    todoPriority.innerHTML = "!";
    todoPriority.classList.add("todoPriority");
    todoPriority.setAttribute("data-priorityid", `${todo.id}`); //assigns the exclamation mark a project-unique id to access it later on when in card view

    //Styles the small checkmark in list view accordingly if the items priority has already been set.
    switch (todo.priority) {
        case 1:
            todoPriority.classList.add("cardPriorityOne");
            break;
        case 2:
            todoPriority.classList.add("cardPriorityTwo");
            break;
        case 3:
            todoPriority.classList.add("cardPriorityThree");
            break;
    }

    newTodo.addEventListener("click", (e) => {
        //This opens up the card view whenever a todo item is clicked on
        if (e.target.className !== "checkbox") {
            Overlay(todo); //generate card for the todo item
            removeOverlayListener(); //adds event listener to whole screen except the todo card so when it is clicked, the card view is closed.
        }
    });

    const datecontainer = document.createElement("div"); //creates container for the due date (empty by default)
    datecontainer.classList.add("datecontainer");
    const datep = document.createElement("p");
    datep.classList.add("datep");
    datep.setAttribute("data-dateindex", `${todo.id}`); //assigns it project-unique id to access it later in card view

    if (todo.due) {
        //if the date has already been set, it will load the due date and display it
        datep.innerHTML = todo.due;
    }

    datecontainer.appendChild(datep);

    container.appendChild(todoCheckbox);
    container.appendChild(todoText);
    newTodo.appendChild(container);
    newTodo.appendChild(datecontainer);
    newTodo.appendChild(todoPriority);
    tasksDiv.appendChild(newTodo); //append completed todo item to list view

    save();
}

function switchProjects(projectID) {
    //called whenever a project is clicked in the sidebar
    const newHeader = document.createElement("h1"); //creates and changes the project header
    newHeader.innerHTML = getProjectById(projectID).name;
    headerContainer.innerHTML = "";
    headerContainer.appendChild(newHeader);

    currentProjectID = projectID; //updates the current project id to keep track of what project is currently being worked on
    tasksDiv.innerHTML = "";

    parseExistingTodos(projectID); //parses all existing todos in the project and adds them to the dom
    addRemoveButton(projectID); //removes old remove button and adds a new one at the bottom
    saveCurrentId(); //saves the current project id to local storage
}

//this adds the remove project button at the bottom of the page
function addRemoveButton(projectID) {
    if (document.querySelector(".removeButton")) {
        //if there is already a remove button, deletes it
        document.querySelector(".removeButton").remove();
    }
    //create remove button
    const btn = document.createElement("input");
    btn.setAttribute("type", "button");
    btn.classList.add("removeButton");
    btn.setAttribute("value", "Delete Project");
    btn.setAttribute("data-btnid", `${projectID}`);

    btn.addEventListener("click", () => {
        //functionality for when button is actually clicked
        if (projects.length === 1) {
            //makes sure that you have at least one project left after deleting
            alert("You need to have at least one project!");
        } else {
            if (confirm("Are you sure you want to delete this project?")) {
                removeProject(projectID); //deletes project from storage
                document //deletes it from sidebar
                    .querySelector(`[data-projectid="${projectID}"]`)
                    .remove();
                switchProjects(projects[0].id); //switches to the first project
                save(); //saves projects to local storage
            }
        }
    });

    main.appendChild(btn); //adds button to DOM
}

//This Listens for when the user clicks outside of the card overlay and removes the overlay if he does
function removeOverlayListener() {
    const overlay = document.getElementById("overlay");
    overlay.addEventListener("click", (e) => {
        if (e.target.id === "overlay") {
            overlay.style.display = "none";
            document.getElementById("overlay-item").innerHTML = "";
        }
    });
}

export {
    appendTodo,
    parseExistingTodos,
    switchProjects,
    addRemoveButton,
    loadCurrentId,
    addButton,
    taskInput,
    tasksDiv,
    currentProjectID,
};
