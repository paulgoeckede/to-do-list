import "./styles/general.css";
import "./styles/sidebar.css";
import "./styles/main.css";
import * as Todomanager from "./scripts/manage-todos";
import * as Dommanager from "./scripts/dom-add-todo";

Dommanager.addButton.addEventListener("click", () => {
    const newTodo = Todomanager.addTodo();
    Dommanager.appendTodo(newTodo);
    Dommanager.taskInput.value = "";
});
