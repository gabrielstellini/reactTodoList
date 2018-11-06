import React, {PureComponent} from "react";
import TodoItem from "./todoItem/todoItem";
import AddItem from "./addItem/addItem";
import firebase from '../../firebase.js';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/Actions';

class TodoList extends PureComponent {

    itemsRef = firebase.database().ref('items');

    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    getData = () => {
        this.itemsRef.on('value' , (snapshot) => {
            let data = snapshot.val();
            this.props.onUpdate(data);
        });
    };

    componentDidMount() {
        this.getData();
    }

    deleteItemHandler = (event, id) => {
        this.itemsRef.child(id).remove()
            .then(this.getData);
    };

    addItemHandler = (event, text) => {
        let body = {"value": text};
        this.itemsRef.push(body, () => this.getData())
    };

    render() {
        let items = this.props.items;

        let todoItems = Object.keys(items)
            .map((todoItemKey) => {
                let todoItem = items[todoItemKey];
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

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdate: (items) => dispatch({type: actionTypes.UPDATE, value: items})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);