import React, { Component, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button, Nav, NavItem, Jumbotron, Navbar, NavbarBrand } from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.myFunction = this.myFunction.bind(this);
    }

    handleSubmit(values) {
        this.props.postNote(values.note);
    }

    myFunction() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      }
    handleLogout() {
        this.props.logoutUser();
        this.myFunction();
    }

    render() {
        return (
            <>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarBrand href="/" className="mr-auto">
                            <img src="https://lh3.googleusercontent.com/dcnf7gAouhx8w1qfuw0zoW8DBeJVZKEpn3oXFc0hxBQGXua8Zt_URDEhp5nkXbjV8DI" height="20" width="41"
                                alt="Notes App"></img>
                        </NavbarBrand>
                        <Nav navbar>
                            <NavItem className="list-unstyled">
                                <NavLink className="nav-link" to="/notes">
                                <span className="fa fa-home fa-lg"></span>Home
                                </NavLink>
                            </NavItem>
                            <NavItem className="list-unstyled">
                                <span className="fa fa-info fa-lg"></span>About Us
                            </NavItem>
                            <NavItem className="list-unstyled">
                                <span className="fa fa-login fa-lg"></span><Link to="/login"><Button>Login</Button></Link>
                            </NavItem>
                            <NavItem className="list-unstyled">
                                <span className="fa fa-signup fa-lg"></span><Link to="/signup"><Button>Signup</Button></Link>
                            </NavItem>
                            <NavItem className="list-unstyled">
                                <span className="fa fa-logout fa-lg"></span><Button onClick={this.handleLogout}>Logout</Button>
                            </NavItem>
                        </Nav>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-60>">
                                <h1>Notes App</h1>
                                <p>Now store all important notes for your works.</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <div className="container">
                <Button color="danger">
                    <Link to={`/postNotes`}>
                    <span className="fa fa-pencil fa-sm"></span>Add Note
                    </Link>
                </Button>
                </div>
                <div className="container">
                <div id="snackbar">Logout Successfully...</div>
                </div>
            </>
        );
    }
}

export default Header;