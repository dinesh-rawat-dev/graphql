/**
 * GraphQL schema
 * Contains:
 *  query type
 *  mutable actions
 *  - addProduct
 *  - updateProduct
 *  - deleteProduct
 *  Product schema
 */
import {buildSchema} from "graphql";

// Build GraphQL schema
const schema = buildSchema(`
    type Query {
        product(id: String!): Product
        products(
            name: String,
            category: String,
            status: Boolean,
            id: String): [Product]
    },
    type Mutation {
        addProduct(
            id: String!
            category: String!
            supplierName: String
            description: String
            productPicUrl: String
            name: String!
            status: Boolean
        ): Product
        updateProduct(
            id: String!
            category: String!
            supplierName: String
            description: String
            productPicUrl: String
            name: String!
            status: Boolean
        ): Product
        deleteProduct(
            id: String!
        ): Product
    },
    type Product {
        id: String
        category: String
        supplierName: String
        description: String
        productPicUrl: String
        name: String
        status: Boolean
    }
`);

export default schema;