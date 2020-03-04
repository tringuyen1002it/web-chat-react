import React from "react";
import firebase from "../../firebase";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import _ from 'lodash'

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: []
  };

  /* 
  note: setState value in form
  */
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /* 
  note: valid form
  */
  isFormValid = () => {
    let errors = []
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: 'fill in all field' }
      this.setState({ errors: errors.concat(error) })
      return false
    }
    else if (!this.isPasswordValid(this.state)) {
      error = { message: 'password is invalid' }
      this.setState({ errors: errors.concat(error) })
      return false
    }
    else {
      return true
    }
  }

  /* 
  note: check empty in form
  */

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return !username.length || !email.length || !passwordConfirmation.length || !password.length
  }

  /* 
  note: check password is valid
  */

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false
    }
    if (password !== passwordConfirmation) {
      return false
    }
    return true
  }

  /* 
  note: display errors
  */

  displayErrors = () => { return (_.map(this.state.errors, (error, i) => <p key={i}> {error.message} </p>)) }
  /* 
  note: submit form
  */
  handleSubmit = event => {
    if (this.isFormValid()) {
      event.preventDefault();
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          console.log(createdUser);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register for DevChat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                value={username}
                type="text"
              />

              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={email}
                type="email"
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                type="password"
              />

              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                value={passwordConfirmation}
                type="password"
              />

              <Button color="orange" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
          {this.state.errors.length > 0 &&
            <Message error>
              {this.displayErrors()}
            </Message>
          }
          <Message>
            Already a user? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
