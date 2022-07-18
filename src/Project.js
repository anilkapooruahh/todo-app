import { intlFormat } from "date-fns";
import Memory from "./Memory";

const Project = (name) => {
    let projectName = name;
    let projectItems = [];

    const getProjectName = () => projectName;
    const setProjectName = (newName) => {
        projectName = newName;
    };

    const getProjectItems = () => projectItems;

    const addItem = (addedItem) => {
        // Checks if item to be added has the same name as a pre existing one
      //  if (projectItems.filter(item => item.getItemName() === addedItem.getItemName()).length === 0) {
            projectItems.push(addedItem);
     
        //}
    };

    const deleteItem = (deleteItemName) => {
       projectItems =  projectItems.filter(item => item.getItemName() !== deleteItemName);
   
    };


    const stringify = () => {
        console.log(projectItems);
        return {
            name: projectName,
            items: projectItems.map(item => item.stringify())
        }
    }

    return { getProjectName, setProjectName, getProjectItems, addItem, deleteItem, stringify  };
};

export default Project
