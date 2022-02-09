import { removeTodo, save, todos } from "./manage-todos";
import Overlay from "./todo-overlay";

const addButton = document.getElementById("addButton"); //Add to List Button
const taskInput = document.getElementById("task"); //Text input of todo
const tasksDiv = document.getElementById("tasks"); //container for all todos

function parseExistingTodos() {
    todos.forEach((item) => {
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
        removeTodo(
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
    datecontainer.appendChild(datep);

    container.appendChild(todoCheckbox);
    container.appendChild(todoText);
    newTodo.appendChild(container);
    newTodo.appendChild(datecontainer);
    newTodo.appendChild(todoPriority);
    tasksDiv.appendChild(newTodo);

    save();
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

export { appendTodo, parseExistingTodos, addButton, taskInput, tasksDiv };