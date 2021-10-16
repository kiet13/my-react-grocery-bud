import React from 'react'
import styles from './GroceryList.module.scss'
import GroceryItem from '../GroceryItem/GroceryItem'

export default function GroceryList(props) {
  const groceryList = props.groceryList.map(item => 
    <GroceryItem
      key={item.id}
      name={item.name}
      deleted={() => props.itemDeleted(item.id)}
      edited={() => props.itemEdited(item.id)}
    />
  )
  return (
    <div className={styles.GroceryList}>
      {groceryList}
    </div>
  )
}
