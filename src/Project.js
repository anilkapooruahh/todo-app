
const Project = (name) => {
    let projectName = name;
    const projectItems = [];

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
        projectItems.filter(item => item.name !== deleteItemName);
    };

    return { getProjectName, setProjectName, getProjectItems, addItem, deleteItem };
};

export default Project
