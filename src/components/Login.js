import React from 'react';
import '../css/style.css';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            messageFromServer: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });

    }

    //https://stackoverflow.com/questions/50617966/axios-post-form-with-reactjs
    //proper login  https://stackoverflow.com/questions/44649665/redirect-user-to-intended-url-after-login-reactjs

   submituserRegistrationForm(e) {
       e.preventDefault();
        if (this.validateForm()) {
            console.log("fff  " + this.state.fields.email);
            axios.post('http://localhost:8080/users/registration', this.state.fields).then((response) => {
             
                this.setState({ messageFromServer: response.data })

            });
       }
     
       this.props.history.push('/signup');
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

        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "*Please enter your email-ID.";
        }

        if (typeof fields["email"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["email"])) {
                formIsValid = false;
                errors["email"] = "*Please enter valid email-ID.";
            }
        }

     /*   if (!fields["mobileno"]) {
            formIsValid = false;
            errors["mobileno"] = "*Please enter your mobile no.";
        }*/

       
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

    /*    if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors["password"] = "*Please enter secure and strong password.";
            }
        }
        */

        this.setState({
            errors: errors
        });
        return formIsValid;


    }



    render() {
        return (
            <div id="main-registration-container">
                <div id="register">
                    <h3>Registration page</h3>
                    <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >
                        <label>Name</label>
                        <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.username}</div>
                        <label>Email ID:</label>
                        <input type="text" name="email" value={this.state.fields.email} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.email}</div>
                      
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.password}</div>
                        <input type="submit" className="button" value="Register" />
                    </form>
                </div>
            </div>

        );
    }


}
export default Login;
