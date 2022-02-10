import {
    getProjectById,
    load,
    projects,
    removeProject,
    save,
} from "./project-manager";
import Overlay from "./todo-overlay";
import { format } from "date-fns";

const addButton = document.getElementById("addButton"); //Add to List Button
const taskInput = document.getElementById("task"); //Text input of todo
const tasksDiv = document.getElementById("tasks"); //container for all todos
const headerContainer = document.getElementById("projectHeader");
const main = document.querySelector("#main");
let currentProjectID = 0; //keeps track of the index number of the current project

function saveCurrentId() {
    localStorage.setItem("currentProjectID", JSON.stringify(currentProjectID));
}

function loadCurrentId() {
    currentProjectID = JSON.parse(localStorage.getItem("currentProjectID"));
}

function parseExistingTodos(id) {
    getProjectById(id).todos.forEach((item) => {
        appendTodo(item);
    });
}

function appendTodo(todo) {
    const newTodo = document.createElement("div"); //container for todo element
    newTodo.classList.add("todo"); //styling
    newTodo.setAttribute("data-todoID", `${todo.id}`);

    const container = document.createElement("div");
    container.classList.add("todoContainer");

    const todoCheckbox = document.createElement("input"); //checkbox for todo element
    todoCheckbox.setAttribute("type", "checkbox");
    todoCheckbox.classList.add("checkbox");

    //Adds functionality to the checkboxes that the task gets deleted once checkbox is clicked
    todoCheckbox.addEventListener("click", () => {
        getProjectById(currentProjectID).removeTodo(
            todoCheckbox.parentElement.parentElement.getAttribute("data-todoID")
        );
        todoCheckbox.parentElement.parentElement.remove();
        save();
    });

    const todoText = document.createElement("p"); //description for todo element
    todoText.setAttribute("id", "todoText");
    todoText.innerHTML = todo.descr;

    const todoPriority = document.createElement("p");
    todoPriority.innerHTML = "!";
    todoPriority.classList.add("todoPriority");
    todoPriority.setAttribute("data-priorityid", `${todo.id}`);

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
        if (e.target.className !== "checkbox") {
            Overlay(todo);
            removeOverlayListener();
        }
    });

    const datecontainer = document.createElement("div");
    datecontainer.classList.add("datecontainer");
    const datep = document.createElement("p");
    datep.classList.add("datep");
    datep.setAttribute("data-dateindex", `${todo.id}`);

    if (todo.due) {
        datep.innerHTML = todo.due;
    }

    datecontainer.appendChild(datep);

    container.appendChild(todoCheckbox);
    container.appendChild(todoText);
    newTodo.appendChild(container);
    newTodo.appendChild(datecontainer);
    newTodo.appendChild(todoPriority);
    tasksDiv.appendChild(newTodo);

    save();
}

function switchProjects(projectID) {
    const newHeader = document.createElement("h1");
    newHeader.innerHTML = getProjectById(projectID).name;
    headerContainer.innerHTML = "";
    headerContainer.appendChild(newHeader);
    console.log(getProjectById(projectID));

    currentProjectID = projectID;
    tasksDiv.innerHTML = "";

    parseExistingTodos(projectID);
    addRemoveButton(projectID);
    saveCurrentId();
}

function addRemoveButton(projectID) {
    if (!document.querySelector(`[data-btnid="${projectID}"]`)) {
        if (document.querySelector(".removeButton")) {
            document.querySelector(".removeButton").remove();
        }
        const btn = document.createElement("input");
        btn.setAttribute("type", "button");
        btn.classList.add("removeButton");
        btn.setAttribute("value", "Delete Project");
        btn.setAttribute("data-btnid", `${projectID}`);

        btn.addEventListener("click", () => {
            if (projects.length === 1) {
                alert("You need to have at least one project!");
            } else {
                if (confirm("Are you sure you want to delete this project?")) {
                    removeProject(projectID);
                    document
                        .querySelector(`[data-projectid="${projectID}"]`)
                        .remove();
                    switchProjects(projects[0].id);
                    save();
                }
            }
        });

        main.appendChild(btn);
    }
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
