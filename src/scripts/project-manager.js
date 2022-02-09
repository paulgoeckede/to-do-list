import Project from "./project-class";

const projects = [];
let projectIdCount = 0;

function addProject(name) {
    const newProject = new Project(name, projectIdCount++);
    projects.push(newProject);
    return newProject;
}

function getProjectById(id) {
    const projectIndex = projects.findIndex((project) => project.id == id);
    return projects[projectIndex];
}

function save() {
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("projectIdCount", JSON.stringify(projectIdCount));
}

function load() {
    projectIdCount = JSON.parse(localStorage.getItem("projectIdCount"));
    const projectsArr = JSON.parse(localStorage.getItem("projects"));
    projectsArr.forEach((project) => {
        projects.push(
            new Project(
                project.name,
                project.id,
                project.todos,
                project.idCount
            )
        );
    });
}

export { addProject, getProjectById, save, load, projectIdCount, projects };
