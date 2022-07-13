import Project from "./Project";



const App = (() => {
    const p1 = Project("okay I pull up")
    const p2 = Project("noob ass mf")
    const projects = [p1, p2];

    const getProjects = () => projects;
    const addProject = (projectName) => {
        // Checks if project to be added has the same name as a pre existing one
        if (projects.filter(item => item.name === projectName).length === 0) {
            const project = Project(projectName);
            projects.push(project);
        }
    };

    const deleteProject = (deleteProjectName) => {
        projects.filter(project => project.name !== deleteProjectName);
    };

    return { addProject, deleteProject, getProjects };
})();

export default App