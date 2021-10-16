import React from 'react'
import styles from './GroceryInput.module.scss';

export default function GroceryInput(props) {

  return (
    <form className={[styles.GroceryInput, "mt-2"].join(' ')} onSubmit={(event) => props.onGrocerySubmit(event, props.groceryName)}>
      <input 
        type="text"
        name="txtGroceryItem"
        id="txtGroceryItem"
        placeholder="e.g: eggs"
        value={props.groceryName}
        onChange={(e) => props.onGroceryChange(e)}
        ref={props.inputRef}
      />
      <input type="submit" value={props.onGroceryEdit ? "Edit" : "Submit"} />
    </form>
  )
}
