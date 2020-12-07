import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSignup = this.handleSignup.bind(this);
  }
  handleSignup(event) {
    this.props.signupUser({ username: this.username.value, password: this.password.value });
    event.preventDefault();
    this.props.history.push('/notes');
        setInterval(() => {
            window.location.reload();

        }, 1000);

  }
  render() {
    return (
      <Form onSubmit={this.handleSignup}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input type="text" id="username" name="username"
            innerRef={(input) => this.username = input} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password"
            innerRef={(input) => this.password = input} />
        </FormGroup>
        <Button type="submit" value="submit" color="primary">Signup</Button>
      </Form>
    );
  }
}


export default withRouter(Signup);