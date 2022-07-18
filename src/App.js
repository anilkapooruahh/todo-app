import Project from "./Project";

import Item from "./Item"




const App = (() => {
    const p1 = Project("Default")

    const i1 = Item("Make your first project", "17-07-2022", "Make your own project by clicking the Add Project button")
    const i2 = Item("Make your first task", "17-07-2022", "Add your own tasks to a project")

    p1.addItem(i1)
    p1.addItem(i2)
    

    let projects = [p1];

    const getProjects = () => projects;
    const addProject = (projectName) => {
        // Checks if project to be added has the same name as a pre existing one
        if (projects.filter(item => item.getProjectName() === projectName).length === 0) {
            const project = Project(projectName);
            projects.push(project);
          
        }
    };

    const deleteProject = (deleteProjectName) => {
       projects = projects.filter(project => project.name !== deleteProjectName);
    };

    const stringify = () => {
       return projects.map(project => project.stringify())
    }

    return { addProject, deleteProject, getProjects, stringify };
})();

export default App