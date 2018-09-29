/**
 * Starts the node server at a specified port
 * Bootstraps product controller, Graphql middlewares etc.
 */
import express from 'express';
import express_graphql from "express-graphql";
import schema from './app/server/product.schema';
import {
    getProduct,
    getProducts,
    addProduct,
    deleteProduct,
    updateProduct
} from './app/server/products.controller';

const app = express();
const root = {
    product: getProduct,
    products: getProducts,
    addProduct,
    deleteProduct,
    updateProduct
};

// Enable CORS
app.use('/query', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use('/query', express_graphql({
    schema: schema,
    rootValue: root
}));

app.listen(3000, () => console.log('Server stated on port: 3000'));