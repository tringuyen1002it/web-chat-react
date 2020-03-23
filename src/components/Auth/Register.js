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
    errors: [],
    loading: false,
    userRef: firebase.database().ref('users')
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
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true })
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          console.log("displayErrors -> createdUser", createdUser)
          createdUser.user.updateProfile({
            displayName: this.state.username,
          })
            .then(() => {
              this.setState({ loading: false })
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log('save users')
              })
            })
            .catch(err => {
              console.log(err);
              this.setState({ errors: this.state.errors.concat(err), loading: false })
            });
        })
        .catch(err => {
          console.log(err);
          this.setState({ errors: this.state.errors.concat(err), loading: false })
        });
    }
  };

  saveUser = createdUser => {
    return this.state.userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    })
  }

  render() {
    const { username, email, password, passwordConfirmation, errors } = this.state;
    console.log("render -> errors", errors)

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
                className={errors.some(error => error.message.includes("email")) ? "error" : ""}
              // className={"error"}
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

              <Button disabled={this.state.loading} className={this.state.loading ? 'loading' : ""} color="orange" fluid size="large">
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
