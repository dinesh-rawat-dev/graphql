import {ADD_NEW_PRODUCT, GET_PRODUCTS} from '../types.jsx';

const initialState = {
        data: {
        }
    };

export function products(state=initialState, action) {
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