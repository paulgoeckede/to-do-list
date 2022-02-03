import { todos } from "./manage-todos";

const addButton = document.getElementById("addButton"); //Add to List Button
const taskInput = document.getElementById("task"); //Text input of todo
const tasksDiv = document.getElementById("tasks"); //container for all todos

function appendTodo(todo) {
    const newTodo = document.createElement("div"); //container for todo element
    newTodo.classList.add("todo"); //styling

    const todoCheckbox = document.createElement("input"); //checkbox for todo element
    todoCheckbox.setAttribute("type", "checkbox");
    todoCheckbox.setAttribute("id", "checkbox");

    todoCheckbox.addEventListener("click", () => {
        todoCheckbox.parentElement.remove();
        updateIndexes();
    });

    const todoText = document.createElement("p"); //description for todo element
    todoText.setAttribute("id", "todoText");
    todoText.innerHTML = todo;

    newTodo.appendChild(todoCheckbox);
    newTodo.appendChild(todoText);
    tasksDiv.appendChild(newTodo);
}

function updateIndexes() {
    const currentTodos = document.querySelectorAll(".todo");
    const arr = Array.from(currentTodos);

    arr.forEach((item, index) => {
        item.setAttribute("data-index", `${index}`);
    });
}

function start() {
    addButton.addEventListener("click", () => {
        appendTodo(taskInput.value);
        taskInput.value = "";
        updateIndexes();
    });
}

export { appendTodo, start, addButton, taskInput, tasksDiv };
