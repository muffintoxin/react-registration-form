 import React, { Component } from 'react';
import './val_form.css';

class Validation_form extends Component {
  constructor(){
    super(); 
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

    this.nameRegExp = /^[a-zA-Z]+$/;
    this.usernameRegExp =/^[a-z\d\.\_]+$/;
    this.pwRegExp = /^.{9,}$/;
    this.emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  
    this.handleChange = this.handleChange.bind(this);
    this.checkData = this.checkData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.requiredStyle = this.requiredStyle.bind(this);
    this.errorMessages = this.errorMessages.bind(this);
    this.validate = this.validate.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }
  checkData(regExp, stateName, stateValid, name){
    this.setState({
      touched: { ...this.state.touched, [name]: true },
    });
   if(regExp.test(stateName)) {
      this.setState({[stateValid]: true});
    } else {
      this.setState({[stateValid]: false});
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
    console.log(this.state[name], this.state.valid[name], this.state.touched[name]);
    return {display: show ? 'block' : 'none'}
  }
  errorMessages(name) {
    const requiredStr = 'This field is required.';
    const invalidStr = 'Enter valid '+ name +'.';
    return !this.state.valid[name] ? invalidStr : requiredStr
  }
  handleSubmit() {
    const {firstName, lastName, username, password, email } = this.state;
    const isEnabled =
    firstName.length > 0 &&
    lastName.length > 0 &&
    username.length > 0 &&
    password.length > 0 &&
    email.length > 0;
   
    alert(`Signed up with firstName: ${firstName} email: ${email}`);
  }

  toggleModal(){
    this.setState({
      modalisOpen: !this.state.modalisOpen
    });   
  }
  render() {
    const errors = this.validate(this.state.firstName, this.state.lastName, this.state.username, this.state.password, this.state.email);
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];      
      return hasError ? shouldShow : false;
    }
    const isRequired = (name) =>{
      return {display: shouldMarkError(name) ? 'block' : 'none'}
    }
    const helpMessage = (name) =>{
      return {display: shouldMarkError(name) ? 'none' : 'block'}
    }
    
    const checkOnSubmit = () => {
      const {firstName, lastName, username, password, email } = this.state; 
      this.toggleModal();
    }; 
    
    return (
      <div className="container">
        <div className="register-form" >
          <div className="title">Create Your Free Account</div>
          <form onSubmit={checkOnSubmit}>

            <div>
              <label>First Name</label>
              <input type="text" value={this.state.firstName} name="firstName" id="firstName"
                className={shouldMarkError("firstName") ? "error" : ""}
                onChange={(e) => this.handleChange(e)}
                onBlur={() => this.checkData(this.nameRegExp, this.state.firstName, this.state.valid.firstName, "firstName")}
              />
              <span className="required-field" style={this.requiredStyle('firstName')}>{this.errorMessages('firstName')}</span>
            </div>

            <div>
              <label>Last Name</label>
              <input type="text" value={this.state.lastName} name="lastName" id="lastName"
              className={shouldMarkError("lastName") ? "error" : ""}
                onChange={(e) => this.handleChange(e)}
                onBlur={() => this.checkData(this.nameRegExp, this.state.lastName, this.state.valid.lastName, "lastName")}
              />
              <span className="required-field" style={this.requiredStyle('lastName')}>{this.errorMessages('lastName')}</span>
            </div>

            <div>
              <label>Username</label>
              <input type="text" value={this.state.username} name="username" 
                className={shouldMarkError("username") ? "error" : ""}
                onChange={(e) => this.handleChange(e)}
                onBlur={() => this.checkData(this.usernameRegExp, this.state.username, this.state.valid.username, "username")}
              />
              <span className="required-field" style={this.requiredStyle('username')}>{this.errorMessages('username')}</span>
            </div>

            <div>
              <label>Password</label>
              <input type="password" value={this.state.password} name="password"
                className={shouldMarkError("password") ? "error" : ""}
                onChange={(e) => this.handleChange(e)}
                onBlur={() => this.checkData(this.pwRegExp, this.state.pw, this.state.valid.password, "password")}
              />
              <span className="note" style={helpMessage('password')}>At least 8 characters</span>
              <span className="required-field" style={this.requiredStyle('password')}>{this.errorMessages('password')}</span>
            </div>

            <div>
            <label>Email</label>
              <input type="text" name="email" value={this.state.email}
                className={shouldMarkError("email") ? "error" : ""}
                onChange={(e) => this.handleChange(e)}
                onBlur={() => this.checkData(this.emailRegExp, this.state.email, this.state.valid.email, "email")}
              />
              <span className="note" style={helpMessage('email')}>An activatoin link will be sent to this email</span>
              <span className="required-field" style={this.requiredStyle('email')}>{this.errorMessages('email')}</span>
            </div>

            <div className="sb-text">By clicking Submit, I agree  that I have read and accepted the&nbsp;
              <a href='TermsandConditions'>Terms and Conditions.</a>
            </div>            
            <button className="sb-btn">SUBMIT</button>            
          </form>
        </div>
        {this.state.modalisOpen ? 
          <Modal
            text='Your Data'
            fn='this.state.firstName'
            ln={this.state.lastName}
            closeModal={this.toggleModal}
          />
          : null
        }
      </div>
    );
  } 
  
}

class Modal extends React.Component {
  render() {
    return (
      <div className='modal'>
        <div className='modal-content'>
          <div className="modal-title">{this.props.text}</div>
          <div>
            <div>
              <span>First Name</span>
              <span>{this.props.fn}</span>
            </div>
            <div>
              <span>Last Name</span>
              <span>{this.props.ln}</span>
            </div>
            <div>
              <span>Username</span>
              <span>{this.props.fn}</span>
            </div>
            <div>
              <span>Passwort</span>
              <span>{this.props.fn}</span>
            </div>
            <div>
              <span>Email</span>
              <span>{this.props.fn}</span>
            </div>
          </div>
          <button onClick={this.props.closeModal}>Close</button>
        </div>
      </div>
    );
  }
};

export default Validation_form;