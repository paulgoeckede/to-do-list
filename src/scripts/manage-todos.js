import Todo from "./todo-class";

const addButton = document.getElementById("addButton"); //Add to List Button
const taskInput = document.getElementById("task"); //Text input of todo

const todos = [];
let idCount = 0;

function createTodo(descr) {
    return new Todo(descr);
}

function addTodo() {
    const newTodo = createTodo(taskInput.value);
    newTodo.id = idCount++;
    todos.push(newTodo);
    console.log(todos);
    return newTodo;
}

function removeTodo(id) {
    const todoIndex = todos.findIndex((item) => item.id == id);
    todos.splice(todoIndex, 1);
    console.log(todos);
}

export { addTodo, removeTodo };
