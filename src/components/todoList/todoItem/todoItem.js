import React, {PureComponent} from "react";
import classes from './todoItem.css';

class TodoItem extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            formValues: {
                id: props.itemId,
                value: props.text
            }
        };
    }

    handleChange = (event) => {
        this.setState({
                formValues: {
                    ...this.state.formValues,
                    value: event.target.value
                }
            }
        );

        console.log(this.state.formValues.id)
    };

    render() {
        return (
            <div className={classes.Item}>
                <input value={this.state.formValues.value} onChange={this.handleChange} className={classes.Input}/>
                <button className={classes.Button}
                        onClick={(event) =>
                            this.props.updateItemHandler(event, this.props.itemId, this.state.formValues.value)}>Update
                </button>
                <button className={classes.Button}
                        onClick={(event) => this.props.deleteItemHandler(event, this.props.itemId)}>Remove
                </button>

            </div>
        );
    };
}

export default TodoItem;