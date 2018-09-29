/**
 * Products controller
 */

// Fake products collection
import {productCollection} from './data/products.json';

/**
 * Get product by id
 */
export function getProduct({id}) {
    return productCollection
        .find(product => product.id === id);
}

/**
 * Get product by different filters
 */
export function getProducts(args) {
    let results = productCollection;
    const criteria = Object.keys(args);
    if (criteria.length) {
        results = productCollection
            .filter(product => criteria.every(key => product[key] === args[key]));
    }
    return results;
}

/**
 * Get new product to the collection
 */
export function addProduct(product) {
    const lastIndex = productCollection.push(product);
    return productCollection[lastIndex - 1];
}

/**
 * Delete a product from the collection
 */
export function deleteProduct({id}) {
    const index = productCollection
        .findIndex(product => product.id === id);
    return productCollection.splice(index, 1);
}

/**
 * Update a particular product with custom values
 */
export function updateProduct({id, ...rest}) {
    const index = productCollection.findIndex(product => product.id === id);
    productCollection[index] = {id, ...rest};
    return productCollection[index];
}