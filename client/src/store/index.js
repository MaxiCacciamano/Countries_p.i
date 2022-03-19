import {createStore, applyMiddleware, compose} from 'redux' ;
// import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const store = createStore(
    rootReducer, 
    composeEnhancer(applyMiddleware(thunk))
)

export default store;