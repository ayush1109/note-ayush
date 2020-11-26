import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Notes} from './Notes';
import { Auth } from './auth';

export const ConfigureStore = () => {
    const Store = createStore(
        combineReducers({
            notes: Notes,
            auth: Auth
        })             //Redux Store
      
        ,
        applyMiddleware(thunk, logger)
    );
    
    return Store;
}