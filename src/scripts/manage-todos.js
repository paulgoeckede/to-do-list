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
    return newTodo;
}

function removeTodo(id) {
    const todoIndex = getIndex(id);
    todos.splice(todoIndex, 1);
}

function changePriority(id, priority) {
    const todoIndex = getIndex(id);
    todos[todoIndex].priority = priority;
}

function changeDue(id, date) {
    const todoIndex = getIndex(id);
    todos[todoIndex].due = date;
}

function changeNote(id, note) {
    const todoIndex = getIndex(id);
    todos[todoIndex].note = note;
}

function addChecklistItem(id, str) {
    const todoIndex = getIndex(id);
    todos[todoIndex].checklist.push(str);
}

function removeCheckListItem(id, str) {
    const todoIndex = getIndex(id);
    const checklistIndex = todos[todoIndex].checklist.findIndex(
        (item) => item === str
    );
    todos[todoIndex].checklist.splice(checklistIndex, 1);
}

function getIndex(id) {
    return todos.findIndex((item) => item.id == id);
}

function save() {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("idcount", JSON.stringify(idCount));
}

function load() {
    idCount = JSON.parse(localStorage.getItem("idcount"));
    const todosArr = JSON.parse(localStorage.getItem("todos"));
    todosArr.forEach((item) => {
        todos.push(item);
    });
}

export {
    addTodo,
    removeTodo,
    changePriority,
    changeDue,
    changeNote,
    addChecklistItem,
    removeCheckListItem,
    save,
    load,
    todos,
};
