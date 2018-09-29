import {ADD_NEW_PRODUCT} from '../types.jsx';
const initialState = {
    data: {}
};
export function products(state = initialState, action) {
    switch (action.type) {
        case ADD_NEW_PRODUCT:
            return {
                data: {
                    ...state.products,
                    ...action.data
                }
            };
        default:
            return state;
    }
}