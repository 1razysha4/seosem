

import React, { Component } from 'react';

import { Button, Form, FormGroup, Label, Input, FormText  } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';


class SeosemDetails extends React.Component {


   constructor(props) {
       super(props);
       this.state = {
           customerDetails: [],
           loading : false
       };


  }


    componentDidMount() {
   

        const url = 'http://localhost:8080/seosem/getCustomerDetail/'+this.props.match.params.id;
        axios.get(url)
            .then(response => {
                console.log(response.data);
                this.setState({
                    customerDetails: response.data,
                    loading: false
                });
            })
            .catch(error => {
                console.log(error);
            });


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
                                    <th>status</th>
                                    <th>NEG_KW_LIST_ID</th>
                              </tr>
                            </thead>
                            <tbody>

                                {this.state.customerDetails.map(c =>
                                    <tr>
                                        <td>{c.cstmr_id}</td>
                                        <td>{c.status}</td>
                                        <td>{c.neg_kw_list_id}</td>
                                           {c.status != 'DISABLED' ? <Link to={`/details/${c.cstmr_id}`} class="btn btn-success">Proceed</Link> : null}
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

export default SeosemDetails;