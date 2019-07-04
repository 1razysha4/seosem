import React from "react";
import { NavLink, Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Navigation = () => {
    return (
        <div>
            <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">SEO-SEM Optimization</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                       
                        <LinkContainer to="/seosem">
                            <NavItem>SEOSEM</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/login">
                            <NavItem>Login</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/signup">
                            <NavItem>Signup</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </div>
    );
};

export default Navigation;