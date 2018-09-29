/**
 * Creates new product in the store
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {createApolloFetch} from 'apollo-fetch';
import {ADD_NEW_PRODUCT, GET_PRODUCTS} from '../redux/types.jsx';
import {Link} from 'react-router-dom';
const fetch = createApolloFetch({uri: '/query'});
import './style.css';

class CreateProduct extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            category: '',
            supplierName: '',
            description: '',
            productPicUrl: '',
            name: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit($event) {
        $event.preventDefault();
        const query = `
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
          }`;

        const variables = this.state;
        fetch({ query, variables }).then(product => this.props.addProduct(product.addProduct))
            .catch(e => console.log(e));

        this.props.history.push('/admin');
    }

    handleChange($event) {
        this.setState({[$event.target.id]: $event.target.value});
    }

    render() {
        const {products} = this.props;
        return (
            <div>
                <h1>Add new product: </h1>
                <Link className="newProductCreate" to={`/admin`}>Go back to admin section</Link>
                <form onSubmit={this.handleSubmit}>
                    <label>Id: </label>
                    <input type="text" placeholder="Product Id" value={this.state.id} id="id"
                           onChange={this.handleChange} required/>
                    <br/>

                    <label>Name: </label>
                    <input type="text" placeholder="name" value={this.state.name} id="name"
                           onChange={this.handleChange} required/>
                    <br/>

                    <label>Category: </label>
                    <input type="text" placeholder="Category" value={this.state.category} id="category"
                           onChange={this.handleChange} required/>
                    <br/>

                    <label>SupplierName: </label>
                    <input type="text" placeholder="SupplierName" value={this.state.supplierName}
                           id="supplierName" onChange={this.handleChange}/>
                    <br/>

                    <label>Description: </label>
                    <input type="text" placeholder="description" value={this.state.description} id="description"
                           onChange={this.handleChange}/>
                    <br/>

                    <label>ProductPicUrl: </label>
                    <input type="text" placeholder="description" value={this.state.productPicUrl}
                           id="productPicUrl" onChange={this.handleChange}/>
                    <br/>

                    <input type="submit" value="Create"/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: data => dispatch({
            type: ADD_NEW_PRODUCT,
            data
        })
    }
};

const Create = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateProduct);
export default Create;