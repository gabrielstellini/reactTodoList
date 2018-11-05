import React, {PureComponent} from "react";
import classes from './addItem.css';

class AddItem extends PureComponent {
    constructor(){
        super();
        this.state = {
            newItemText: ''
        }
    }

    handleChange = (event) => {
        this.setState({newItemText: event.target.value});
    };


    render() {
        return (
            <div className={classes.Item}>
                <input onChange={this.handleChange} value={this.state.newItemText} className={'text-center'}/>
                <button className={classes.Button} onClick={(event) => this.props.addItemHandler(event, this.state.newItemText)}>Add
                </button>
            </div>
        );
    }
}

export default AddItem;