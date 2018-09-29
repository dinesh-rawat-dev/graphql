/**
 * Unit test cases for custer interface
 */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import {render, configure} from 'enzyme';
import {Home} from './components/customer.jsx';
import {productCollection} from '../data/products.json'; // Fake data
import {MemoryRouter} from 'react-router-dom'; // MemoryRouter: Link is used in the template
import expect from 'unexpected';

configure({adapter: new Adapter()});

describe('Customer Component', () => {
    const props = {
        products: {
            data: []
        }
    };
    let wrapper;
    afterEach(() => wrapper = null);

    it("requires that the products be provided.", () => {
        const wrapper = render(
            <MemoryRouter>
                <Home {...props}/>
            </MemoryRouter>);

        expect(wrapper.find('.productCard').length, 'to be', 0);
        expect(wrapper.find('.noProductFound').length, 'to be', 1);
    });

    it("requires that the page should render 4 products.", () => {
        props.products.data = productCollection;
        const wrapper = render(
            <MemoryRouter>
                <Home {...props}/>
            </MemoryRouter>);

        expect(wrapper.find('.productCard').length, 'to be', 4);
    });
});