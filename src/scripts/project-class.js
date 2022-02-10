import Todo from "./todo-class";
import { save } from "./project-manager";

export default class Project {
    constructor(name, id, todos = [], idCount = 0) {
        this.name = name;
        this.id = id;
        this.todos = todos;
        this.idCount = idCount;
    }

    createTodo(descr) {
        return new Todo(descr);
    }

    addTodo = (descr) => {
        const newTodo = this.createTodo(descr);
        newTodo.id = this.idCount++;
        this.todos.push(newTodo);
        save();
        return newTodo;
    };

    removeTodo(id) {
        const todoIndex = this.getIndex(id);
        this.todos.splice(todoIndex, 1);
        save();
    }

    changePriority(id, priority) {
        const todoIndex = this.getIndex(id);
        this.todos[todoIndex].priority = priority;
        save();
    }

    changeDue(id, date) {
        const todoIndex = this.getIndex(id);
        this.todos[todoIndex].due = date;
        save();
    }

    changeNote(id, note) {
        const todoIndex = this.getIndex(id);
        this.todos[todoIndex].note = note;
        save();
    }

    addChecklistItem(id, str) {
        const todoIndex = this.getIndex(id);
        this.todos[todoIndex].checklist.push(str);
        save();
    }

    removeCheckListItem(id, str) {
        const todoIndex = this.getIndex(id);
        const checklistIndex = this.todos[todoIndex].checklist.findIndex(
            (item) => item === str
        );
        this.todos[todoIndex].checklist.splice(checklistIndex, 1);
        save();
    }

    getIndex(id) {
        return this.todos.findIndex((item) => item.id == id);
    }
}
