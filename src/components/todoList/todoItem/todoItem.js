import React from "react";
import classes from './todoItem.css';

const TodoItem = (props) => {
    return (
        <div className={classes.Item}>
            <h4 className={'text-center'}>{props.text}</h4>
            <button className={classes.Button} onClick = {(event) => props.deleteItemHandler(event,props.itemId)}>Remove</button>
        </div>
    );
};

export default TodoItem;