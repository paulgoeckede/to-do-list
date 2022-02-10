import { projects, save } from "./project-manager";
import { switchProjects } from "./dom-manager";

const newProjectPlusLI = document.getElementById("finalLI"); //this is the text input field list item where you can add new projects
const newProjectPlus = document.getElementById("newProject"); //this is the actual text input field
const projectList = document.getElementById("projectList"); //the list of projects in the sidebar
const headerContainer = document.getElementById("projectHeader"); //the header where the project name is displayed

function newProject(name, id) {
    //adds the new project to the sidebar list
    const newListItem = document.createElement("li");

    const newText = document.createElement("h4");
    newText.classList.add("project");
    newText.setAttribute("data-projectid", `${id}`);
    newText.innerHTML = name;

    newText.addEventListener("click", () => {
        //logic for switching projects when an item is clicked
        switchProjects(id);
    });

    newListItem.appendChild(newText);
    projectList.insertBefore(newListItem, newProjectPlusLI);

    save();
}

function parseProjects() {
    //parses all existing projects when the page is loaded
    projects.forEach((project) => {
        newProject(project.name, project.id);
    });
}

//parses the first header when the page is loaded
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
