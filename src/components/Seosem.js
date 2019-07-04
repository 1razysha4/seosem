import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Proceed from './Proceed';

class Seosem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customerDetails: []
        };

        this.handleClick = this.handleClick.bind(this);
        this.onClick = this.onClick.bind(this)

    }

    componentDidMount() {
        axios.get('http://localhost:8080/seosem/getDatails/')
            .then(res => {
                console.log(res.status);
                this.setState({ customerDetails: res.data });
                console.log(this.state.customerDetails);
            });
    }

    handleClick() {
        alert("i am clicked !!! ");
      
    }
    onClick() {
        const { sumPrice, price } = this.props
        console.log(this.props);
    }



render() {
    return (
        <div class="container">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">
                       LIST
            </h3>
                </div>
                <div class="panel-body">
                    <h4><Link to=""><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></Link></h4>
                    <table class="table table-stripe">
                        <thead>
                            <tr>
                                <th>Customer Id</th>
                                <th>Customer Name</th>
                                <th>MCC Name</th>
                                
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.customerDetails.map(c =>
                                <tr>
                                    <td>{c.cstmr_id}</td>
                                    <td> <Link to={`/details/${c.cstmr_id}`}>{c.cstmr_name}</Link></td>
                                    <td>{(c.mcc_name == "") ? '-' :c.mcc_name}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
 }
}
export default Seosem;