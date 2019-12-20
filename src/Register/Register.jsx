import React from 'react';
import * as yup from 'yup';
import './Register.css';
import withForm from '../shared/hoc/withForm';
import userService from '../services/user-service';
import { withRouter } from 'react-router-dom';



class Register extends React.Component {
  emailOnChangeHandler = this.props.controlChangeHandlerFactory('email');
  usernameOnChangeHandler = this.props.controlChangeHandlerFactory('username');
  passwordOnChangeHandler = this.props.controlChangeHandlerFactory('password');
  rePasswordOnChangeHandler = this.props.controlChangeHandlerFactory('rePassword');

  submitHandler = async (event) => {
    try {
      event.preventDefault();
      const errors = this.props.getFormErrorState();
      if (!!errors) { return; }
      const data = this.props.getFormState();
      const user = await userService.register(data)
      console.log(user)
      this.props.history.push('/login')
    } catch (error) {
      console.log(error);
    }
  };

  getFirstControlError = name => {
    const errorState = this.props.getFormErrorState();
    return errorState && errorState[name] && errorState[name][0];
  };

  render() {
    const emailError = this.getFirstControlError('email');
    const usernameError = this.getFirstControlError('username');
    const passwordError = this.getFirstControlError('password');
    const rePasswordError = this.getFirstControlError('rePassword');

    return <div className="form-container">
    <form>
      <label>Email</label>
      <input className="register-input" type="text" onChange={this.emailOnChangeHandler}  placeholder="Your email.."/>
      {emailError && <div className="error">{emailError}</div>}

      <label>Username</label>
      <input className="register-input" type="text" onChange={this.usernameOnChangeHandler} placeholder="Your name.."/>
      {usernameError && <div className="error">{usernameError}</div>}
  
      <label>Password</label>
      <input className="register-input" type="password" onChange={this.passwordOnChangeHandler} placeholder="Your last name.."/>
      {passwordError && <div className="error">{passwordError}</div>}

      <label >Re-Password</label>
      <input className="register-input" type="password" onChange={this.rePasswordOnChangeHandler} placeholder="Your last name.."/>
      {rePasswordError && <div className="error">{rePasswordError}</div>}
      
      <input className="btn-input" type="submit" onClick={this.submitHandler} value="Register"/>
    </form>
  </div>
  }
}

const initialFormState = {
  email: '',
  username: '',
  password: '',
  rePassword: '',
  level: 0,
  expiriance: 0,
  role:''
};

const schema = yup.object({
  email: yup.string().email("Email should be valid")
  .required("Email is required"),

  username: yup.string('Username shoud be a string')
    .required('Username is required')
    .min(4, 'Username should be more than 4 chars'),

  password: yup.string('Password must be a string')
    .required('Password is required')
    .min(6, 'Password must be more than 6 chars'),

  rePassword: yup.string('Password must be a string')
    // .oneOf([yup.ref('password'), null], 'Passwords don\'t match')
    .required('Password is required')
    .min(6, 'Password must be more than 6 chars')
});


export default withRouter(withForm(Register, initialFormState, schema))