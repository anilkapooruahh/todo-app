const Item = (name, due, desc = "") => {
    let itemName = name;
    let itemdueDate = due;
    let itemDesc = desc;

    getItemName = () => itemName;
    getItemDate = () => itemdueDate;
    getItemDesc = () => itemDesc;

    setItemName = (name) => {
        itemName = name;
    };

    setItemDate = (date) => {
        itemdueDate = date;
    };

    setItemDesc = (desc) => {
        itemDesc = desc;
    };

    return { getItemDate, getItemName, getItemDesc, setItemDate, setItemName, setItemDesc };
};


export default Item