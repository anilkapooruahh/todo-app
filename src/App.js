import Project from "./Project";

import Item from "./Item";
import { de } from "date-fns/locale";



const App = (() => {
    const p1 = Project("okay I pull up")
    const p2 = Project("noob ass mf")

    const i1 = Item("get groceries", "24-11-2022", "get washing powder and fabric softener from the store")
    const i2 = Item("pay rent", "25-07-2022", "pay rent and then hang your landlord")
    p1.addItem(i1)
    p1.addItem(i2)
    p1.addItem(i1)
    p1.addItem(i1)
    p1.addItem(i1)
    p1.addItem(i1)
    p1.addItem(i1)
    p1.addItem(i1)
    p1.addItem(i1)
    p1.addItem(i1)
    p1.addItem(i1)
    p1.addItem(i1)  
    

    let projects = [p1, p2];

    const getProjects = () => projects;
    const addProject = (projectName) => {
        // Checks if project to be added has the same name as a pre existing one
        if (projects.filter(item => item.getProjectName() === projectName).length === 0) {
            const project = Project(projectName);
            projects.push(project);
        }
    };

    const deleteProject = (deleteProjectName) => {
       projects = projects.filter(project => project.getProjectName() !== deleteProjectName.getProjectName());
    };

    return { addProject, deleteProject, getProjects };
})();

export default App