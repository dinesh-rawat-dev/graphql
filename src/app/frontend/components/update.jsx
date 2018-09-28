/**
 * Update component
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {createApolloFetch} from 'apollo-fetch';
import {ADD_NEW_PRODUCT, GET_PRODUCTS} from '../redux/types.jsx';
import {Link} from 'react-router-dom';
const fetch = createApolloFetch({uri: '/query'});
import './style.css';

class UpdateProduct extends Component {
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

    componentDidMount() {
        const id = this.props.match.params.id;
        fetch({
            query: `query getProduct($id: String!) {
                product(id: $id) {
                    id,
                    name,
                    category,
                    supplierName,
                    description,
                    productPicUrl,
                    status
                }
            }`,
            variables: {id}
        }).then(product => this.setState(product.data.product));
    }

    handleSubmit($event) {
        $event.preventDefault();

        const query = `
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
          }`;

        const variables = this.state;
        fetch({ query, variables }).then(product => this.props.addProduct(product.addProduct))
            .catch(e => console.log(e));
        this.props.history.push('/admin');
    }

    handleChange($event) {
        this.setState({[$event.target.id]: $event.target.value})
    }

    render() {
        return (
            <div>
                <h1>Update product: </h1>
                <Link className="newProductCreate" to={`/admin`}>Go back to admin section</Link>
                <form onSubmit={this.handleSubmit}>
                    <label>Id: </label>
                    <input type="text" placeholder="Product Id" value={this.state.id} id="id"
                           onChange={this.handleChange}/>
                    <br/>

                    <label>Name: </label>
                    <input type="text" placeholder="name" value={this.state.name} id="name"
                           onChange={this.handleChange}/>
                    <br/>

                    <label>Category: </label>
                    <input type="text" placeholder="Category" value={this.state.category} id="category"
                           onChange={this.handleChange}/>
                    <br/>

                    <label>SupplierName: </label>
                    <input type="text" placeholder="SupplierName" value={this.state.supplierName||''}
                           id="supplierName" onChange={this.handleChange}/>
                    <br/>

                    <label>Description: </label>
                    <input type="text" placeholder="description" value={this.state.description||''} id="description"
                           onChange={this.handleChange}/>
                    <br/>

                    <label>ProductPicUrl: </label>
                    <input type="text" placeholder="description" value={this.state.productPicUrl||''}
                           id="productPicUrl" onChange={this.handleChange}/>
                    <br/>

                    <input type="submit" value="Update"/>
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
        addProduct: (data) => dispatch({
            type: ADD_NEW_PRODUCT,
            data
        }),
        getProducts: () => dispatch({
            type: GET_PRODUCTS
        }),
    }
};

const Update = connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateProduct);
export default Update;