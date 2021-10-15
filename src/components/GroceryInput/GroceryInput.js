import React, {useState} from 'react'
import styles from './GroceryInput.module.scss';

export default function GroceryInput(props) {
  const [groceryName, setGroceryName] = useState("");

  const handleInputSubmit = (event) => {
    event.preventDefault();
    props.onGrocerySubmit(groceryName);
    setGroceryName("");
  }
  const handleInputChange = (event) => {
    // TODO: validate input value
    setGroceryName(event.target.value);
  }

  return (
    <form className={[styles.GroceryInput, "mt-2"].join(' ')} onSubmit={handleInputSubmit}>
      <input 
        type="text"
        name="txtGroceryItem"
        id="txtGroceryItem"
        placeholder="e.g: eggs"
        value={groceryName}
        onChange={handleInputChange}
      />
      <input type="submit" value="Submit" />
    </form>
  )
}
