import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class ModalExample extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(event) {
    this.props.loginUser({ username: this.username.value, password: this.password.value });
    event.preventDefault();
    this.props.history.push('/notes');
        setInterval(() => {
            window.location.reload();

        }, 1000);

  }
  render() {
    return (
      <Form onSubmit={this.handleLogin}>
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
        <Button type="submit" value="submit" color="primary">Login</Button>
      </Form>
    );
  }
}


export default withRouter(ModalExample);