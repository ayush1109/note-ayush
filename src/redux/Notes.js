import * as ActionTypes from './ActionTypes';        //Reducer Functions

export const Notes = (state = {
        isLoading: true,
        errMess: null,
        notes: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_NOTES:
            return {...state, isLoading: false, errMess: null, notes: action.payload};

        case ActionTypes.NOTES_LOADING:
            return {...state, isLoading: true, errMess: null, notes: []};

        case ActionTypes.NOTES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, notes: []};

        case ActionTypes.EDIT_NOTE:
            return {...state, isLoading: false, errMess: null, notes: action.payload};

        case ActionTypes.EDIT_FAILED:
            return {...state, isLoading: false, errMess: action.payload, notes: []};

        default:
            return state;
    }
}