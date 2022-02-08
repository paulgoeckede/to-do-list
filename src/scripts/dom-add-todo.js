import { removeTodo } from "./manage-todos";

const addButton = document.getElementById("addButton"); //Add to List Button
const taskInput = document.getElementById("task"); //Text input of todo
const tasksDiv = document.getElementById("tasks"); //container for all todos

function appendTodo(todo) {
    const newTodo = document.createElement("div"); //container for todo element
    newTodo.classList.add("todo"); //styling
    newTodo.setAttribute("data-todoID", `${todo.id}`);

    const todoCheckbox = document.createElement("input"); //checkbox for todo element
    todoCheckbox.setAttribute("type", "checkbox");
    todoCheckbox.classList.add("checkbox");

    //Adds functionality to the checkboxes that the task gets deleted once checkbox is clicked
    todoCheckbox.addEventListener("click", () => {
        removeTodo(todoCheckbox.parentElement.getAttribute("data-todoID"));
        todoCheckbox.parentElement.remove();
    });

    const todoText = document.createElement("p"); //description for todo element
    todoText.setAttribute("id", "todoText");
    todoText.innerHTML = todo.descr;

    newTodo.appendChild(todoCheckbox);
    newTodo.appendChild(todoText);
    tasksDiv.appendChild(newTodo);
}

export { appendTodo, addButton, taskInput, tasksDiv };
