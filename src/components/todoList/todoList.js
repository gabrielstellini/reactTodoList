import React, {PureComponent} from "react";
import TodoItem from "./todoItem/todoItem";
import AddItem from "./addItem/addItem";
import firebase from '../../firebase.js';

class TodoList extends PureComponent {

    itemsRef = firebase.database().ref('items');

    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    getData = () => {
        this.itemsRef.on('value' , (snapshot) => {
            let data = snapshot.val();
            this.setState({items: data})
        });
    };

    componentDidMount() {
        this.getData();
    }

    deleteItemHandler = (event, id) => {
        this.itemsRef.child(id).remove();
    };

    addItemHandler = (event, text) => {
        let body = {"value": text};
        this.itemsRef.push(body, () => this.getData())
    };

    render() {
        let state = this.state.items;

        let todoItems = Object.keys(this.state.items)
            .map((todoItemKey) => {
                let todoItem = state[todoItemKey];
                 return (
                     <TodoItem
                        key={todoItemKey}
                        itemId={todoItemKey}
                        text={todoItem.value}
                        deleteItemHandler={this.deleteItemHandler}/>
                 )
            }
        );

        return (
            <div>
                {todoItems}
                <AddItem addItemHandler = { this.addItemHandler }/>
            </div>
        )
    }
}

export default TodoList;