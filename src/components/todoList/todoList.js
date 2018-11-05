import React, {PureComponent} from "react";
import TodoItem from "./todoItem/todoItem";
import AddItem from "./addItem/addItem";

class TodoList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    getData = () => {
        fetch('http://localhost:3000/items')
            .then(data => data.json())
            .then((data) => this.setState({items: data}));
    };

    componentDidMount() {
        this.getData();
    }

    deleteItemHandler = (event, id) => {
        fetch(('http://localhost:3000/items/'+ id), {
            method: 'delete'
        })
        .then(() => this.getData())
    };

    addItemHandler = (event, text) => {
        fetch(('http://localhost:3000/items/'), {
            method: 'post',
            body: JSON.stringify({"value": text}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => this.getData())
    };

    render() {
        let todoItems = this.state.items.map(todoItem =>
            <TodoItem
                key={todoItem.id}
                itemId={todoItem.id}
                text={todoItem.value}
                deleteItemHandler={this.deleteItemHandler}/>
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