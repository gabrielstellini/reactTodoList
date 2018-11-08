import React, {PureComponent} from "react";
import TodoItem from "./todoItem/todoItem";
import AddItem from "./addItem/addItem";
import firebase from '../../firebase.js';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/Actions';
import classes from './todoList.css';

class TodoList extends PureComponent {
    itemsRef = firebase.database().ref('items');

    getData = () => {
        this.props.onReadStarted();

        this.itemsRef.once('value' , (snapshot) => {
            let data = snapshot.val();
            this.props.onReadCompleted(data);
        }).catch(() => this.props.onReadFailed());
    };

    componentDidMount() {
        this.getData();
    }

    deleteItemHandler = (event, id) => {
        this.props.onDeleteStarted();

        this.itemsRef.child(id).remove()
            .then(this.props.onDeleteCompleted)
            .catch(this.props.onDeleteFailed)
            .then(this.getData);
    };

    updateItemHandler = (event, id, newText) => {
        this.props.onUpdateStarted();

        let body = {'value':  newText};

        this.itemsRef.child(id).update(body, () => {
            this.props.onUpdateCompleted();
            this.getData();
        })
            .catch(this.props.onUpdateFailed);
    };

    addItemHandler = (event, text) => {
        let body = {"value": text};

        this.props.onCreateStarted();

        this.itemsRef.push(body, () => this.props.onCreateCompleted)
            .then(this.getData)
            .catch(this.props.onCreateFailed)
    };

    render() {
        let items = this.props.items;

        if(!this.props.loading) {

            let todoItems = Object.keys(items)
                .map((todoItemKey) => {
                        let todoItem = items[todoItemKey];
                        return (
                            <TodoItem
                                key={todoItemKey}
                                itemId={todoItemKey}
                                text={todoItem.value}
                                deleteItemHandler={this.deleteItemHandler}
                                updateItemHandler={this.updateItemHandler}/>
                        )
                    }
                );

            return (
                <div>
                    {todoItems}
                    <AddItem addItemHandler={this.addItemHandler}/>
                </div>
            )
        } else {
            return(
                <img src={require("../../assets/loading.gif")} alt={"Loading..."} className={classes.center}/>
            )
        }
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