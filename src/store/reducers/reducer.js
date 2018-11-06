import * as actionTypes from '../Actions';

const intialState = {
    items: []
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE:
            return {
                ...state,
                items: action.value
            };
        default:
            return state;
    }
};

export default reducer;