import React, {useState, useEffect} from 'react';
import styles from './GroceryBudBuilder.module.scss';
import GroceryInput from '../components/GroceryInput/GroceryInput';
import GroceryList from '../components/GroceryList/GroceryList';
import Alert from '../components/Alert/Alert';
import { nanoid } from 'nanoid';

const getItemListFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem('itemList'));
  if (data === null) {
    return [];
  }
  return data;
}

export default function GroceryBudBuilder() {
  const [itemList , setItemList] = useState(getItemListFromLocalStorage());
  const [onEditing, setOnEditing] = useState(false);
  const [inputItem, setInputItem] = useState({ id: nanoid(), name: ""});
  const [alert, setAlert] = useState({ show: false, msg: "", type: ""});

  useEffect(() => {
    localStorage.setItem('itemList', JSON.stringify(itemList));
  }, [itemList]);

  useEffect(() => {
    const timeId = setTimeout(() => {
        setAlert({ show: false, msg: "", type: ""});
    }, 3000);

    return () => {
      clearTimeout(timeId);
    }
  }, [alert.show]);

  

  const handleGrocerySubmit = (event, newItemName) => {
    event.preventDefault();
    if (newItemName.length === 0) {
      setAlert({ show: true, msg: "Please enter grocery name!", type: "danger"});
      return;
    }
    const newItemList = [...itemList];

    if (onEditing) {
      const editIndex = newItemList.findIndex(item => item.id === inputItem.id);
      newItemList[editIndex].name = newItemName;
      setAlert({show: true, msg: "Item edited", type: "success"});
    } else {
      const newItem = {
        id: nanoid(),
        name: newItemName
      }
      newItemList.push(newItem);
      setAlert({show: true, msg: "Item added", type: "success"});
    }
    
    setItemList(newItemList);
    setInputItem({ id: nanoid(), name: ""});
    setOnEditing(false);
  }

  const handleInputChange = (event) => {
    setInputItem({
      id: inputItem.id,
      name: event.target.value
    });
  }

  const handleItemDelete = (id) => {
    const deletedIndex = itemList.findIndex(item => item.id === id);
    const newItemList = [...itemList];
    newItemList.splice(deletedIndex, 1);
    setItemList(newItemList);
    setAlert({show: true, msg: "Item removed", type: "danger"});
  }

  const handleItemEditing = (id) => {
    setOnEditing(true);
    const editIndex = itemList.findIndex(item => item.id === id);
    setInputItem(itemList[editIndex]);
  }

  const handleClearAll = () => {
    setItemList([]);
    setAlert({ show: true, msg: "Empty list", type: "danger"})
  }

  return (
    <div className={styles.GroceryBudBuilder}>
      <h1>Grocery Bud</h1>
      <GroceryInput 
        onGrocerySubmit={handleGrocerySubmit}
        onGroceryEdit={onEditing}
        onGroceryChange={handleInputChange}
        groceryName={inputItem.name}
      />
      <Alert show={alert.show} msg={alert.msg} type={alert.type} />
      <GroceryList groceryList={itemList} itemDeleted={handleItemDelete} itemEdited={handleItemEditing} />
      <button
        className={styles.Clear}
        disabled={itemList.length === 0 || onEditing}
        onClick={handleClearAll}
      >
        Clear All
      </button>
    </div>
  )
}