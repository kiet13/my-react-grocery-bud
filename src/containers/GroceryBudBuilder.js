import React, {useState} from 'react';
import styles from './GroceryBudBuilder.module.scss';
import GroceryInput from '../components/GroceryInput/GroceryInput';

export default function GroceryBudBuilder() {
  const [itemList , setItemList] = useState([]);

  const handleGrocerySubmit = (newItem) => {
    const newItemList = [...itemList];
    newItemList.push(newItem);
    setItemList(newItemList);
  }

  console.log(itemList);
  return (
    <div className={styles.GroceryBudBuilder}>
      <h1>Grocery Bud</h1>
      <GroceryInput onGrocerySubmit={handleGrocerySubmit} />
    </div>
  )
}