import * as actionTypes from '../Actions';

const initialState = {
    items: [],
    loading: true
};

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        //CREATE
        case actionTypes.CREATE_TODO_STARTED:
            return {
                ...state,
                loading: true
            };
        case actionTypes.CREATE_TODO_COMPLETE:
            return {
                ...state,
                loading: false
            };
        case actionTypes.CREATE_TODO_FAIL:
            return {
                ...state,
                loading: false
            };

        //READ

        case actionTypes.READ_TODO_STARTED:
            return {
                ...state,
                loading: true
            };
        case actionTypes.READ_TODO_COMPLETE:
            return {
                ...state,
                loading: false,
                items: action.value
            };
        case actionTypes.READ_TODO_FAIL:
            console.log("Network error");
            return {
                ...state,
                loading: false
            };

        //UPDATE

        //DELETE
        case actionTypes.DELETE_TODO_STARTED:
            return {
                ...state,
                loading: true
            };
        case actionTypes.DELETE_TODO_COMPLETE:
            //needs testing
            const updatedArray = state.items.filter(item => item.key !== item.action.deletedElId);

            return {
                ...state,
                loading: false,
                items: updatedArray
            };
        case actionTypes.DELETE_TODO_FAIL:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
};

export default itemReducer;