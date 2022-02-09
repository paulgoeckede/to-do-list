import "./styles/general.css";
import "./styles/sidebar.css";
import "./styles/main.css";
import * as Todomanager from "./scripts/manage-todos";
import * as Dommanager from "./scripts/dom-manager";

Dommanager.addButton.addEventListener("click", () => {
    const newTodo = Todomanager.addTodo();
    Dommanager.appendTodo(newTodo);
    Dommanager.taskInput.value = "";
});

Dommanager.taskInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const newTodo = Todomanager.addTodo();
        Dommanager.appendTodo(newTodo);
        Dommanager.taskInput.value = "";
    }
});

Todomanager.load();
Dommanager.parseExistingTodos();
