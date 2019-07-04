import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../images/ajax-loader.gif';


var querystring = require('querystring');
class Proceed extends React.Component {
  constructor() {
    super();
    this.state = {
        cstmr_id: '',
        status: '',
        update_id:'',
        messageFromServer: '',
        modalIsOpen: false,
        loading:false
    }
    this.proceed = this.proceed.bind(this);
    this.onClick = this.onClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
}
componentDidMount() {
    this.setState({
        cstmr_id: this.props.expense.cstmr_id,
        status: this.props.expense.status,
        update_id: this.props.expense.update_id,

    });
  }
componentWillReceiveProps(nextProps){
    this.setState({
        cstmr_id: nextProps.expense.cstmr_id,
        status: nextProps.expense.status,
    
    })
  }
openModal() {
    this.setState({
      modalIsOpen: true
    });
  }
closeModal() {
    this.setState({
      modalIsOpen: false,
      messageFromServer: ''
    });
  }

onClick(e) {
    this.proceed(this);
  }
    proceed(e) {
     
    var customerDetails = {
        cstmr_id: this.props.expense.cstmr_id,
        status: this.props.expense.status,
        update_id: this.props.expense.update_id,
    }
        console.log("expense" + customerDetails.cstmr_id);

        axios.post('http://localhost:8080/seosem/proceedSeosem/', customerDetails).then(function(response) {
        e.setState({
        messageFromServer: response.data,
        loading: false

      });  
});


    }
render() {
   // if(this.state.messageFromServer == ''){
      return (
        <div>
              <Button bsStyle="success" bsSize="small" onClick={this.openModal}>Proceed</Button>

          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add Expense"
            className="Modal">
                  <br />
                 

                

                  <fieldset>
                      <label for="customer id">Click Proceed to manually proceed for customer Id  {this.state.cstmr_id} with update Id {this.state.update_id} with status {this.state.status} </label>

                      {this.state.loading
                          ? <div>Loading...</div>
                          : this.state.messageFromServer
                      }
                      

                  
                                        
                    
          </fieldset>
        <div className='button-center'>
              <br/>
                      <Button bsStyle="success" bsSize="mini" onClick={this.onClick}>
                          Proceed
                          </Button>

                      <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}>Cancel</Button>

            </div>
          </Modal>
        </div>
      )


      }
  
}
export default Proceed;
