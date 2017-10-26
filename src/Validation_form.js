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

    this.rexExpMap = {
      firstName: /^[a-zA-Z]+$/,
      lastName: /^[a-zA-Z]+$/,
      username: /^[a-z\d\.\_]+$/,
      password: /^.{8,}$/,
      email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    }
  
    this.handleChange = this.handleChange.bind(this);
    this.checkData = this.checkData.bind(this);
    this.requiredStyle = this.requiredStyle.bind(this);
    this.errorMessages = this.errorMessages.bind(this);
    this.validate = this.validate.bind(this);
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
      touched: { ...this.state.touched, [name]: true },
    });
   if(regExp.test(stateName)) {
      this.setState({
        valid: { ...this.state.valid, [name]: true },
      });
    } else {
      this.setState({
        valid: { ...this.state.valid, [name]: false },
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
    //alert(`Signed up with firstName: ${firstName} email: ${email}`);
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
    const helpMessage = (name) =>{
      return {display: shouldMarkError(name) ? 'none' : 'block'}
    }
    
    return (
      <div className="container">
        <div className="register-form" >
          <div className="title">Create Your Free Account</div>
          <div className="form">
            <div>
              <label>First Name</label>
              <input type="text" value={this.state.firstName} name="firstName" id="firstName"
                className={shouldMarkError("firstName") ? "error" : ""}
                onChange={(e) => this.handleChange(e, "firstName")}
              />
              <span className="required-field" style={this.requiredStyle('firstName')}>{this.errorMessages('firstName')}</span>
            </div>

            <div>
              <label>Last Name</label>
              <input type="text" value={this.state.lastName} name="lastName" id="lastName"
              className={shouldMarkError("lastName") ? "error" : ""}
                onChange={(e) => this.handleChange(e, "lastName")}
              />
              <span className="required-field" style={this.requiredStyle('lastName')}>{this.errorMessages('lastName')}</span>
            </div>

            <div>
              <label>Username</label>
              <input type="text" value={this.state.username} name="username" 
                className={shouldMarkError("username") ? "error" : ""}
                onChange={(e) => this.handleChange(e, "username")}
              />
              <span className="required-field" style={this.requiredStyle('username')}>{this.errorMessages('username')}</span>
            </div>

            <div>
              <label>Password</label>
              <input type="password" value={this.state.password} name="password"
                className={shouldMarkError("password") ? "error" : ""}
                onChange={(e) => this.handleChange(e, "password")}
              />
              <span className="note" style={helpMessage('password')}>At least 8 characters</span>
              <span className="required-field" style={this.requiredStyle('password')}>{this.errorMessages('password')}</span>
            </div>

            <div>
            <label>Email</label>
              <input type="text" name="email" value={this.state.email}
                className={shouldMarkError("email") ? "error" : ""}
                onChange={(e) => this.handleChange(e, "email")}
              />
              <span className="note" style={helpMessage('email')}>An activatoin link will be sent to this email</span>
              <span className="required-field" style={this.requiredStyle('email')}>{this.errorMessages('email')}</span>
            </div>

            <div className="sb-text">By clicking Submit, I agree  that I have read and accepted the&nbsp;
              <a href='TermsandConditions'>Terms and Conditions.</a>
            </div>            
            <button className="sb-btn" type="button" onClick={this.checkOnSubmit}>SUBMIT</button>            
          </div>
        </div>
        {this.state.modalisOpen ? 
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

class Modal extends React.Component {
  render() {
    return (
      <div className='modal'>
        <div className='modal-content'>
          <div className="modal-title">{this.props.text}</div>
          <div>
            <div>
              <div className="modal-label">First Name: </div>
              <div>{this.props.firstName}</div>
              </div>
            <div>
              <div>Last Name: </div>
              <div>{this.props.lastName}</div>
            </div>
            <div>
              <div>Username: </div>
              <div>{this.props.username}</div>
            </div>
            <div>
              <div>Passwort: </div>
              <div>{this.props.password}</div>
            </div>
            <div>
              <div>Email: </div>
              <div>{this.props.email}</div>
            </div>
          </div>
          <button className="modal-btn" onClick={this.props.closeModal}>Close</button>
        </div>
      </div>
    );
  }
};

export default Validation_form;