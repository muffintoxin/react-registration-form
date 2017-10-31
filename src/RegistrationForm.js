import React, { Component } from 'react';
import Modal from './modal';
import './RegistrationForm.css';

class RegistrationForm extends Component {
  constructor(props){
    super(props); 
   this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
      valid: {
        firstName: true,
        lastName: true,
        username: true,
        password: true,
        email: true,
      },
      touched: {
        firstName: false,
        lastName: false,
        username: false,
        password: false,
        email: false
      },
      modalisOpen: false
    };

    this.rexExpMap = {
      firstName: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      lastName: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      username: /^[a-z\d._]+$/,
      password: /^.{8,}$/,
      email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    }
  
    this.handleChange = this.handleChange.bind(this);
    this.checkData = this.checkData.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.checkOnSubmit = this.checkOnSubmit.bind(this);
  }

  handleChange = (e, name) => {
    this.setState({[e.target.name]: e.target.value}, () => {
      this.checkData(this.rexExpMap[name], this.state[name], this.state.valid[name], name)
    });
  }
  checkData(regExp, stateName, stateValid, name){
    this.setState({
      touched: { ...this.state.touched, [name]: true }
    });
   if(regExp.test(stateName)) {
      this.setState({
        valid: { ...this.state.valid, [name]: true }
      });
    } else {
      this.setState({
        valid: { ...this.state.valid, [name]: false }
      });
    }
  }
  validate(firstName, lastName, username, password, email) {  
    return {
      firstName: firstName.length === 0,
      lastName: lastName.length === 0,
      username: username.length === 0,
      password: password.length === 0,
      email: email.length === 0
    };
  }
  requiredStyle(name) {
    const show = (this.state[name] === "" || !this.state.valid[name]) && this.state.touched[name];
    return {display: show ? 'block' : 'none'}
  }
  errorMessages(name) {
    const requiredStr = 'This field is required.';
    const invalidStr = 'Enter valid '+ name +'.';
    return !this.state.valid[name] && this.state[name] !== "" ? invalidStr : requiredStr
  }
  checkOnSubmit() {
    const {firstName, lastName, username, password, email } = this.state;    
    const formFilled = !(firstName === '' || lastName === '' || username === '' || password === '' || email === '');
    const formInvalid = Object.keys(this.state.valid).some(x => !this.state.valid[x]);
    const formHasErrors = !formFilled || formInvalid;

    if (!formHasErrors) {
      this.toggleModal();
    }
    this.setState({
      touched: {
        firstName: true,
        lastName: true,
        username: true,
        password: true,
        email: true,
      },
    });
  }
  toggleModal(){
    this.setState(prevState => ({
      modalisOpen: !prevState.modalisOpen
    }));
  }
  
  render() {
    const errors = this.validate(this.state.firstName, this.state.lastName, this.state.username, this.state.password, this.state.email);
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    }
    const helpMessage = (name) =>{
      return {display: shouldMarkError(name) ? 'none' : 'block'}
    }
    
    return (
      <div className="container">
        <div className="register-form" >
          <div className="title">Create Your Free Account</div>
          <div className="form">
            <div>
              <label>
                First Name
                <input
                  type="text"
                  value={this.state.firstName}
                  name="firstName" id="firstName"
                  className={shouldMarkError("firstName") ? "error" : ""}
                  onChange={(e) => this.handleChange(e, "firstName")} />
              </label>
              <span className="required-field" style={this.requiredStyle('firstName')}>{this.errorMessages('firstName')}</span>
            </div>

            <div>
              <label>
                Last Name
                <input
                  type="text" 
                  value={this.state.lastName} 
                  name="lastName" id="lastName"
                  className={shouldMarkError("lastName") ? "error" : ""}
                  onChange={(e) => this.handleChange(e, "lastName")} />
              </label>
              <span className="required-field" style={this.requiredStyle('lastName')}>{this.errorMessages('lastName')}</span>
            </div>

            <div>
              <label>
                Username
                <input
                  type="text"
                  value={this.state.username}
                  name="username"
                  className={shouldMarkError("username") ? "error" : ""}
                  onChange={(e) => this.handleChange(e, "username")} />
              </label>
              <span className="required-field" style={this.requiredStyle('username')}>{this.errorMessages('username')}</span>
            </div>

            <div>
              <label>
                Password
                <input
                  type="password"
                  value={this.state.password}
                  name="password"
                  className={shouldMarkError("password") ? "error" : ""}
                  onChange={(e) => this.handleChange(e, "password")} />
              </label>
              <span className="note" style={helpMessage('password')}>At least 8 characters</span>
              <span className="required-field" style={this.requiredStyle('password')}>{this.errorMessages('password')}</span>
            </div>

            <div>
              <label>
                Email
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  className={shouldMarkError("email") ? "error" : ""}
                  onChange={(e) => this.handleChange(e, "email")} />
              </label>
              <span className="note" style={helpMessage('email')}>An activatoin link will be sent to this email</span>
              <span className="required-field" style={this.requiredStyle('email')}>{this.errorMessages('email')}</span>
            </div>

            <div className="sb-text">By clicking Submit, I agree  that I have read and accepted the&nbsp;
              <a href='TermsandConditions'>Terms and Conditions.</a>
            </div>            
            <button className="sb-btn" type="button" onClick={this.checkOnSubmit}>SUBMIT</button>            
          </div>
        </div>
        {this.state.modalisOpen? 
          <Modal
            text='Your Data'
            {...this.state}
            closeModal={this.toggleModal}
          />
          : null
        }
      </div>
    );
  } 
  
}


export default RegistrationForm;