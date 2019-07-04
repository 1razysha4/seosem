import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from "./components/Home";
import SeosemDetails from "./components/SeosemDetails";
import Seosem from "./components/Seosem";
import Error from "./components/Error";
import Navigation from "./components/Navigation";
import signup from "./components/signup";
import Login from "./components/Login";


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navigation />
                    <Switch>
                        <Route path="/" component={Home} exact />
                         <Route path="/seosem" component={Seosem} />
                        <Route path='/details/:id' component={SeosemDetails} />
                        <Route path="/signup" component={signup} />
                        <Route path="/login" component={Login} />
                        <Route component={Error} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
};

export default App; 
