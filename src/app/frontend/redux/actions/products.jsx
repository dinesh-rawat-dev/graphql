import {ADD_NEW_PRODUCT, GET_PRODUCTS} from '../types.jsx';

export function addProduct(data) {
    return {
        type: ADD_NEW_PRODUCT,
        data
    }
}

export function getProducts() {
    return {
        type: GET_PRODUCTS
    }
}