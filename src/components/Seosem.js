import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Proceed from './Proceed';
import paginate from 'paginate-array';
//https://codepen.io/Dmitriy_Dubravin/pen/YWZjWQ?editors=1010
class Seosem extends React.Component {

    constructor() {
        super();
        this.state = {
            customerDetails: [],
            size: 5,
            page: 1,
            currPage: null,
            search: ''
        };

        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { value } = e.target;
        const { customerDetails, page } = this.state;

        const newSize = +value;
        const newPage = 1;
        const newCurrPage = paginate(customerDetails, newPage, newSize);

        this.setState({
            ...this.state,
            size: newSize,
            page: newPage,
            currPage: newCurrPage
        });
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/seosem/getDatails/`)
            .then(res => {
                console.log(res);
                this.setState({
                    customerDetails: res.data,
                    duplicateCustomerDetails: res.data,
                    totalItems: res.length,
                });
                console.log(this.state.customerDetails);
            })
            .then(customerDetails => {
                const { page, size } = this.state;

                const currPage = paginate(customerDetails, page, size);

                this.setState({
                    ...this.state,
                    customerDetails,
                    currPage
                });
            });
    }



    previousPage() {
        const { currPage, page, size, customerDetails } = this.state;

        if (page > 1) {
            const newPage = page - 1;
            const newCurrPage = paginate(customerDetails, newPage, size);

            this.setState({
                ...this.state,
                page: newPage,
                currPage: newCurrPage
            });
        }
    }

    nextPage() {
        const { currPage, page, size, customerDetails } = this.state;

        if (page < currPage.totalPages) {
            const newPage = page + 1;
            const newCurrPage = paginate(customerDetails, newPage, size);
            this.setState({ ...this.state, page: newPage, currPage: newCurrPage });
        }
    }


    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }



    updateSearch(event) {
        this.setState({ search: event.target.value })
    }

    render() {
        //pagination

        const { page, size, currPage } = this.state;


        //filteration
        let filteredContacts = this.state.customerDetails.filter((item) => {
            return item.cstmr_name.toLowerCase().includes(this.state.search.toLowerCase())
        }
        );

        const renderOnline = filteredContacts.map((cItem, index) => {
            return <tbody key={index}>
                <tr>
                    <td>{cItem.cstmr_id}</td>
                    <td> <Link to={`/details/${cItem.cstmr_id}`}>{cItem.cstmr_name}</Link></td>
                    <td>{(cItem.mcc_name == "") ? '-' : cItem.mcc_name}</td>
                </tr> </tbody>
        });



        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">

                        <h3 class="panel-title">
                            Cusomter Accounts
            </h3>
                    </div>
                    <div class="panel-body">
                        <div>page: {page}</div>
                        <div>size: {size}</div>
                        <div>
                            <label for="size">Size</label>
                            <select name="size" id="size" onChange={this.handleChange}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                            </select>
                        </div>
                        <form>
                            <input type="text" placeholder="Customer Name.." value={this.state.search} onChange={this.updateSearch.bind(this)} />

                            <p>{this.state.query}</p>
                        </form>
                        <table class="table table-stripe">
                            <thead>
                                <tr>
                                    <th>Customer Id</th>
                                    <th>Customer Name</th>
                                    <th>MCC Name</th>

                                </tr>
                            </thead>
                            {renderOnline}
               


                            <button onClick={this.previousPage}>Previous Page
</button>
                            <button onClick={this.nextPage}>Next Page</button>

                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
export default Seosem;
