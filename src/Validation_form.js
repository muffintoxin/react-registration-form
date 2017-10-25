import React, { Component } from 'react';
import './val_form.css';

class Validation_form extends Component {
  constructor(){
    super(); 
   this.state = {
      firstName: '',
      lastName: '',
      username: '',
      pw: '',
      email: '',
      firstNameIslValid: false,
      lastNameIslValid: false,
      usernameIslValid: false,
      emaiIslValid: false,
      passwordIsValid: false,
      showInfo: false
    }; 

    this.nameRegExp = /^[a-zA-Z]+$/;
    this.usernameRegExp =/^[a-z\d\.\_]+$/;
    this.pwRegExp = /^.{9,}$/;
    this.emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    
    this.handleChange = this.handleChange.bind(this);
    this.checkData = this.checkData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.errorMessages = this.errorMessages.bind(this);
  }
  handleChange(e, name) {
    this.setState({[name]: e.target.value});
  }
  checkData(regExp, stateName, stateValid){
    /* if(stateName === '') {
      this.setState({stateValid: false});
      this.setState({showInfo: true});    
    } */
    if(regExp.test(stateName)) {
      this.setState({stateValid: true});
      this.setState({showInfo: false});
    } else {
      this.setState({stateValid: false});
      this.setState({showInfo: true});
    }
  }
  requiredStyle() {
    return {display: this.state.showInfo ? 'block' : 'none'}
  }
  errorMessages(name, stateValid) {
    const requiredStr = 'This field is required.';
    const invalidStr = 'Enter valid '+ name +'.';
    return !this.state[stateValid] ? invalidStr : ''
  }
  handleSubmit() {    
    const { firstName, email } = this.state;
    alert(`Signed up with firstName: ${firstName} email: ${email}`);
  }
  render() {
    return (
      <div className="container">
        <div className="register-form" >
          <div className="title">Create Your Free Account</div>
          <form onSubmit={this.handleSubmit}>

            <label>First Name</label>
            <input type="text" value={this.state.firstName} name="firstName" 
              onChange={(e) => this.handleChange(e, 'firstName')}
              onBlur={() => this.checkData(this.nameRegExp, this.state.firstName, this.state.firstNameIslValid)}
            />
            <span className="required-field" style={this.requiredStyle()}>{this.errorMessages('firstName', 'firstNameIslValid')}</span>

            <label>Last Name</label>
            <input type="text" value={this.state.lastName} name="lastName" 
              onChange={(e) => this.handleChange(e, 'lastName')}
              onBlur={() => this.checkData(this.nameRegExp, this.state.lastName, this.state.lastNameIslValid)} 
            />
            <span className="required-field" style={this.requiredStyle()}>{this.errorMessages('lastName', 'lastNameIslValid')}</span>

            <label>Username</label>
            <input type="text" value={this.state.username} name="username" 
              onChange={(e) => this.handleChange(e, 'username')}
              onBlur={() => this.checkData(this.usernameRegExp, this.state.username, this.state.usernameIslValid)} 
            />
            <span className="required-field" style={this.requiredStyle()}>{this.errorMessages('username', 'usernameIslValid')}</span>

            <label>Password</label>
            <input type="password" value={this.state.pw} name="pw" 
              onChange={(e) => this.handleChange(e, 'pw')}
              onBlur={() => this.checkData(this.pwRegExp, this.state.pw, this.state.passwordIsValid)} 
            />
            <span className="note">At least 8 characters</span>
            <span className="required-field" style={this.requiredStyle()}>{this.errorMessages('pw', 'passwordIslValid')}</span>

            <label>Email</label>
            <input type="text" name="email" value={this.state.email} 
              onChange={(e) => this.handleChange(e, 'email')}
              onBlur={() => this.checkData(this.emailRegExp, this.state.email, this.state.emaiIslValid)} 
            />
            <span className="required-field" style={this.requiredStyle()}>{this.errorMessages('email', 'emailIslValid')}</span>

            <span className="note">An activatoin link will be sent to this email</span>
            <div className="sb-text">By clicking Submit, I agree  that I have read and accepted the&nbsp;
              <a href='#'>Terms and Conditions.</a>
            </div>
            
            <button className="sb-btn">SUBMIT</button>
          </form>
        </div>
      </div>
    );
  }
  
}

export default Validation_form;
