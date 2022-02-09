import { projectIdCount, projects, save } from "./project-manager";
import { switchProjects } from "./dom-manager";

const newProjectPlusLI = document.getElementById("finalLI");
const newProjectPlus = document.getElementById("newProject");
const projectList = document.getElementById("projectList");
const headerContainer = document.getElementById("projectHeader");

function newProject(name, id) {
    const newListItem = document.createElement("li");

    const newText = document.createElement("h4");
    newText.classList.add("project");
    newText.setAttribute("data-projectid", `${id}`);
    newText.innerHTML = name;

    newText.addEventListener("click", () => {
        switchProjects(newText.getAttribute("data-projectid"));
    });

    newListItem.appendChild(newText);
    projectList.insertBefore(newListItem, newProjectPlusLI);

    save();
}

function parseProjects() {
    projects.forEach((project) => {
        newProject(project.name, project.id);
    });
}

function parseHeader() {
    const header = document.createElement("h1");
    header.innerHTML = projects[0].name;
    headerContainer.innerHTML = "";
    headerContainer.appendChild(header);
}

export {
    newProjectPlusLI,
    newProjectPlus,
    headerContainer,
    newProject,
    parseProjects,
    parseHeader,
};
