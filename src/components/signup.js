import React from 'react';
import '../css/style.css';
import axios from 'axios';
import {
  Route,
  Redirect,
  withRouter, // ** important so that history is availabe
 } from 'react-router-dom';
class signup extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {},
            messageFromServer: '',
            loading: true
        }

        this.handleChange = this.handleChange.bind(this);
        this.submituserLoginForm = this.submituserLoginForm.bind(this);
        this.validateForm = this.validateForm.bind(this);

    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });

    }

    //https://stackoverflow.com/questions/50617966/axios-post-form-with-reactjs

    submituserLoginForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            loading: false;
            console.log("username  " + this.state.fields.email + "password  " + this.state.fields.password);
            axios.post('http://localhost:8080/users/login', this.state.fields).then((response) => {
                console.log(response.status);
                this.setState({ messageFromServer: response.data })
                    ;
                this.props.history.push('/');
             
            });


        }

    }
    loadOrShowMessage() {
        if (this.state.loading) {
            return <p>Loading ...</p>
        } else {
            return <p>
                {this.state.messageFromServer}
            </p>
        }
    }

    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "*Please enter your username.";
        }

        if (typeof fields["username"] !== "undefined") {
            if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["username"] = "*Please enter alphabet characters only.";
            }
        }

     
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }


        this.setState({
            errors: errors
        });
        return formIsValid;


    }



    render() {
        return (
            <div id="main-registration-container">
                <div id="register">
                    <h3>SignUp</h3>
                    <form method="post" name="userLoginForm" onSubmit={this.submituserLoginForm} >
                        <label>Name</label>
                        <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.username}</div>

                        <label>Password</label>
                        <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.password}</div>
                        <input type="submit" className="button" value="Login" />
                    </form>
                    <h3>{this.state.messageFromServer}</h3>
                    {this.loadOrShowMessage}
                </div>
            </div>

        );
    }


}
export default signup;
