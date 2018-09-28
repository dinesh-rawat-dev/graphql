/**
 * Customer Interface
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {createApolloFetch} from 'apollo-fetch';
import {ADD_NEW_PRODUCT} from '../redux/types.jsx';
const fetch = createApolloFetch({uri: '/query'});
import './style.css';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
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
            <div className="productContainer">
                <strong><i>To be admin: simply change url to <Link to="/admin"> Admin, </Link> </i></strong><h1>Products: </h1>

                {products.length ? products.map((product, index) => (
                    <div className="productCard" key={index}>
                        <img src={product.productPicUrl} />
                        <div className="description">
                            <h4 className="title"><b>{product.name} | Status {product.status? 'Available': 'N/A'}</b></h4>
                            <p className="text">{product.description}</p>
                        </div>
                    </div>
                )) : <h5>No products</h5>}
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
        }),
    }
};

const Customer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default Customer;