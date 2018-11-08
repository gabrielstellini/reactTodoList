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
            this.props.onReadCompleted(data);
        }).catch(() => this.props.onReadFailed());
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
        onCreateStarted: () => dispatch({type: actionTypes.CREATE_TODO_STARTED}),
        onCreateCompleted: () => dispatch({type: actionTypes.CREATE_TODO_COMPLETE}),
        onCreateFailed: () => dispatch({type: actionTypes.CREATE_TODO_FAIL}),

        onReadStarted: () => dispatch({type: actionTypes.READ_TODO_STARTED}),
        onReadCompleted: (items) => dispatch({type: actionTypes.READ_TODO_COMPLETE, value: items}),
        onReadFailed: () => dispatch({type: actionTypes.READ_TODO_FAIL}),

        onUpdateStarted: () => dispatch({type: actionTypes.UPDATE_TODO_STARTED}),
        onUpdateCompleted: () => dispatch({type: actionTypes.UPDATE_TODO_COMPLETE}),
        onUpdateFailed: () => dispatch({type: actionTypes.UPDATE_TODO_FAIL}),

        onDeleteStarted: () => dispatch({type: actionTypes.DELETE_TODO_STARTED}),
        onDeleteCompleted: (items) => dispatch({type: actionTypes.DELETE_TODO_COMPLETE, value: items}),
        onDeleteFailed: () => dispatch({type: actionTypes.DELETE_TODO_FAIL}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);