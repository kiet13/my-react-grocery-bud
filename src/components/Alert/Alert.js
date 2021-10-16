import React from 'react'
import styles from './Alert.module.scss'
export default function Alert(props) {
  const classes = [styles.Alert, "mt-1"];
  if (props.type === "danger") {
    classes.push(styles.Danger);
  } else if (props.type === "success") {
    classes.push(styles.Success);
  }

  if (props.show) {
    classes.push(styles.Show);
  }

  return (
    <p className={classes.join(' ')}>
      {props.msg}
    </p>
  )
}
