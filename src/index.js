import "./styles/general.css";
import "./styles/sidebar.css";
import "./styles/main.css";
import * as Todomanager from "./scripts/manage-todos";
import * as Dommanager from "./scripts/dom-manager";
import * as Sidebar from "./scripts/sidebar";
import * as Projectmanager from "./scripts/project-manager";

Dommanager.addButton.addEventListener("click", () => {
    const newTodo = Projectmanager.projects[
        Dommanager.currentProjectID
    ].addTodo(Dommanager.taskInput.value);
    Dommanager.appendTodo(newTodo);
    Dommanager.taskInput.value = "";
});

Dommanager.taskInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const newTodo = Projectmanager.projects[
            Dommanager.currentProjectID
        ].addTodo(Dommanager.taskInput.value);
        Dommanager.appendTodo(newTodo);
        Dommanager.taskInput.value = "";
    }
});

Sidebar.newProjectPlus.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const newProject = Projectmanager.addProject(
            Sidebar.newProjectPlus.value
        );
        Sidebar.newProject(newProject.name, newProject.id);
        Sidebar.newProjectPlus.value = "";
    }
});

if (!localStorage.getItem("projects")) {
    Projectmanager.addProject("Quick Project");
} else {
    Projectmanager.load();
}

//Create and parse Default Project
Sidebar.parseProjects();
Sidebar.parseHeader();

Dommanager.parseExistingTodos(Projectmanager.projects[0].id);
