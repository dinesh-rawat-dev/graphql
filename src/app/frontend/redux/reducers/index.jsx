import {combineReducers, createStore} from 'redux';
import {products} from './products.jsx';
const reducers = combineReducers({products});
const store = createStore(reducers);
export default store;