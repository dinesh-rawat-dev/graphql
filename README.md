# Code Test : GraphQL
[![Ecommerce website](https://static.makeuseof.com/wp-content/uploads/2015/12/youtube-player-670x335.jpg)](https://www.youtube.com/watch?v=Uyc5xlJ0uF4)


## Introduction

>The website needs to have:

- An Administrator interface that should allow changes that would be reflected within the customer interface. The changes (mutations) are sent to a GraphQL endpoint.
- Customer interface to query a GraphQL endpoint.

## Installation

> npm i


#### Start in dev. mode

>
Server: `npm start` // Transpiles the code and start express server on port `3000`

Client: `npm run dev` // Run the client app on port: `4200`


#### Start in prod. mode

> npm run build



## Code Samples

So the code structure is pretty straight forward. Its a custom structure that I have created for being used here

>
```
graphql
│   README.md
│   .babelrc                       // Babel presets and plugins
│   package.json
│   webpack.client.js              // Required only for front end application
│   webpack.server.js              // Required only for server-side express
│
└───src // Contains the source code
│   │   client.jsx            // Main react file: routes, injecting etc.
│   │   index.html         // HTML Template file
│   │   server.js     // Starts the node server, enabled CORS and graphql middlewares
│   │
│   └───app // React + Express
│   └────── frontend           // Components for customer and administrator
│   └──────────── components   // Contains: admin,customer components and styling
│   └──────────── redux  // State management: Actions, reducers, types and store
│   └────── server // Product controller and GraphQL schema and fake data
│
```

### Customer Interface

On start of the application you will be redirected to the customer interface which runs on `port: 4200` in local environment. Which queries the graphql endpoint and displays products in the page.

 `URL: http://localhost:4200/`


### See the image:

![Customer Interface](https://preview.ibb.co/fQ5Re9/customer_Interface.png)

### Administrator Interface

Admin interface allows the user to add new product and update any existing product in the store. For the purpose of simplicity, I have provided a link on the customer interface saying, "To be admin: simply change URL to Admin," which will redirect the user to

`URL: http://localhost:4200/admin`

### See the image(s):

![Admin Interface](https://preview.ibb.co/dimcmp/admin_Interface_Home.png)

![Create Interface](https://preview.ibb.co/mSFdRp/admin_Interface_Home.png)

![Update Interface](https://preview.ibb.co/ezGwCU/admin_Interface_Home.png)

NOTE: The product images are totally irrelevant.


## GraphQL Queries

#### Get all products:

```json
query getProducts($name: String) {
      products(name: $name) {
          id,
          name,
          category,
          supplierName,
          description,
          productPicUrl,
          status
      }
}
```
  

#### Get productByProductId:

```javascript
query getProduct($id: String!) {
        product(id: $id) {
                id,
                name,
                category,
                supplierName,
                description,
                productPicUrl,
                status
        }
}
```
 Variables:

```json
{
   "id": "HT-1002"
}
````javascript

 #### Add new product
```json
mutation addNewProduct ($id: String!
       $category: String!
       $supplierName: String
       $description: String
       $productPicUrl: String
       $name: String!
       $status: Boolean) {
       addProduct (id: $id, category: $category, supplierName: $supplierName, description: $description,
       productPicUrl: $productPicUrl, name: $name, status: $status) {
           id,
           category,
           supplierName,
           description,
           productPicUrl,
           name,
           status
       }
 }
````

 Variables:

 ```json
 {
     "id": "H-51043",
     "name": "Lenovo B480",
     "category": "Laptops"
   }
````

 #### Update any product

 ```javascript
 mutation updateProduct ($id: String!
       $category: String!       
       $supplierName: String       
       $description: String       
       $productPicUrl: String       
       $name: String!       
       $status: Boolean) {       
   updateProduct (id: $id, category: $category, supplierName: $supplierName, description: $description,
       productPicUrl: $productPicUrl, name: $name, status: $status) {
           id,
           category,           
           supplierName,           
           description,           
           productPicUrl,           
           name,           
           status           
       }       
 }
````

Variables:

```json
{
   "id": "H-51043",   
   "name": "Lenovo B480 -my laptopt",   
   "category": "Laptops"   
 }
```
 #### Delete any product
```javascript
 query deleteProduct($id: String!) {
        products(id: $id) {       
            id            
        }        
  }
  ````

Variables:
```json
{
  "id": "H-51043"    
}
```

## Technologies

- Express
- Webpack
- Webpack-dev-server

Plugins used:

-- copy-web-pack-plugin

-- html-webpack-plugin

-- extract-text-webpack-plugin

- React

- Redux (Which doesn't looks relevant in this particular scenario)

- graphql

- express_graphql
