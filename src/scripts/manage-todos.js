import Todo from "./todo-class";

const addButton = document.getElementById("addButton"); //Add to List Button
const taskInput = document.getElementById("task"); //Text input of todo

const todos = [];

function createTodo(descr) {
    return new Todo(descr);
}

function addTodo() {
    todos.push(createTodo(taskInput.value));
    console.log(todos);
}

function start() {
    //adds todo to storage when add Task button is clicked
    addButton.addEventListener("click", () => {
        addTodo();
    });
}

export { createTodo, addTodo, start, todos, addButton, taskInput };
