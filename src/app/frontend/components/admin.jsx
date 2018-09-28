/**
 * Manages products
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {createApolloFetch} from 'apollo-fetch';
import {ADD_NEW_PRODUCT, GET_PRODUCTS} from '../redux/types.jsx';
const fetch = createApolloFetch({uri: '/query'});
import './style.css';

class AdminUser extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch({
            query: `query getProducts($name: String) {
                products(name: $name) {
                    id,
                    name,
                    category,
                    supplierName,
                    description,
                    productPicUrl,
                    status
                }
            }`,
        }).then(products => this.props.addProduct(products.data.products));
    }

    render() {
        const products = Object.values(this.props.products.data);
        return (
            <div>
                <Link className="newProductCreate" to={`/`} target="_blank">Open customer portal >>>> </Link>
                <h1>Manage Products: </h1>
                <Link className="newProductCreate" to={`create`}>Add new product </Link>
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ProductPic</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>SupplierName</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.length ? products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.id}</td>
                            <td><img src={product.productPicUrl}/></td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.supplierName}</td>
                            <td>{product.description}</td>
                            <td><Link to={`/update/${product.id}`}>Update </Link></td>
                        </tr>
                    )) : <tr>
                        <td colSpan="7">No products</td>
                    </tr>}
                    </tbody>
                </table>
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
        })
    }
};

const Admin = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminUser);
export default Admin;
