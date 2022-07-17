

const Item = (name, due, desc = "") => {
    let itemName = name;
    let itemdueDate = due;
    let itemDesc = desc;

   const getItemName = () => itemName;
   const getItemDate = () => itemdueDate;
   const getItemDesc = () => itemDesc;

   const setItemName = (name) => {
        itemName = name;
    };

   const setItemDate = (date) => {
        itemdueDate = date;
    };

   const setItemDesc = (desc) => {
        itemDesc = desc;
    };

    const stringify = () => {
        return {
            name: itemName,
            due: itemdueDate,
            desc: itemDesc
        }
    }

    return { getItemDate, getItemName, getItemDesc, setItemDate, setItemName, setItemDesc, stringify };
};


export default Item