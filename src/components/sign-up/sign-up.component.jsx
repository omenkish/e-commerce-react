import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';
import { selectUserError } from '../../redux/user/user.selectors';

import './sign-up.styles.scss';
 class SignUp extends Component {
  constructor(){
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      displayNameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, displayName, password, confirmPassword } = this.state;
    const { signUpStart } = this.props;

    if(password !== confirmPassword) {
      this.setState({
        confirmPasswordError: 'Passwords do not match!'
      });
      return;
    }
      signUpStart({ email, password, displayName });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  render() {
    const { displayName, email, password, confirmPassword, confirmPasswordError } = this.state;
    const { error } = this.props;
    return(
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span className="name">Sign up with your email and password</span>
        <form 
          className="sign-up-form"
          onSubmit={this.handleSubmit}
        >
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label='Display Name'
            required
          />

          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Email'
            required
          />
          {(error && error.code === 'auth/email-already-in-use') && (<span className="error">{error.message}</span>)}
          <FormInput
            type='password'
            name='password'
            onChange={this.handleChange}
            value={password}
            label='Password'
            required
          />

          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required
          />
          {confirmPasswordError && (<span className="error">{confirmPasswordError}</span>)}

          <CustomButton type='submit' >SIGN UP</CustomButton>
        </form>

      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  error: selectUserError,
});

const mapDispatchToProps = dispatch => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);