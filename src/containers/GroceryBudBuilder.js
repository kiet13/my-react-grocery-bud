import React, {useState} from 'react';
import styles from './GroceryBudBuilder.module.scss';
import GroceryInput from '../components/GroceryInput/GroceryInput';
import GroceryList from '../components/GroceryList/GroceryList';
import { nanoid } from 'nanoid';

export default function GroceryBudBuilder() {
  const [itemList , setItemList] = useState([]);
  const [onEditing, setOnEditing] = useState(false);
  const [inputItem, setInputItem] = useState({ id: nanoid(), name: ""});

  const handleGrocerySubmit = (event, newItemName) => {
    event.preventDefault();

    const newItemList = [...itemList];

    if (onEditing) {
      const editIndex = newItemList.findIndex(item => item.id === inputItem.id);
      newItemList[editIndex].name = newItemName;
    } else {
      const newItem = {
        id: nanoid(),
        name: newItemName
      }
      newItemList.push(newItem);
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
  }

  const handleItemEditing = (id) => {
    setOnEditing(true);
    const editIndex = itemList.findIndex(item => item.id === id);
    setInputItem(itemList[editIndex]);
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
      <GroceryList groceryList={itemList} itemDeleted={handleItemDelete} itemEdited={handleItemEditing} />
    </div>
  )
}