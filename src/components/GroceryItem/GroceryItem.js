import React from 'react'
import styles from './GroceryItem.module.scss';
import { FaEdit, FaTrash } from "react-icons/fa";
export default function GroceryItem(props) {
  return (
    <div className={styles.GroceryItem}>
      <span className={styles.GroceryName}>{props.name}</span>
      <div>
        <span className={styles.Edit} onClick={props.edited}>
          <FaEdit />
        </span>
        <span className={styles.Remove} onClick={props.deleted}> 
          <FaTrash />
        </span>
      </div>
    </div>
  )
}
