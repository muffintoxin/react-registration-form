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
      firstNameIslValid: true,
      lastNameIslValid: true,
      usernameIslValid: true,
      emaiIslValid: true,
      passwordIsValid: true,
      touched: {
        firstName: false,
        lastName: false,
        username: false,
        pw: false,
        email: false
      },
      showInfo: false
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
    this.validateData = this.validateData.bind(this);
  }
  validateData(values) {
    const errors = {}
    if (!this.state.touched.firstName) {
      errors.firstName = 'Required'
    } else if (this.nameRegExp.test(this.state.firstName)) {
      errors.firstName = 'Enter valid First Name'
    }
    return errors
  }





  handleChange(e, name) {
    this.setState({[name]: e.target.value});
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
  validate(firstName, lastName, username, pw, email) {  
    return {
      firstName: firstName.length === 0,
      lastName: lastName.length === 0,
      username: firstName.length === 0,
      pw: lastName.length === 0,
      email: firstName.length === 0
    };
  }
  requiredStyle(name, stateValid) {
    const show = (this.state.showInfo && this.state[name] == "") || !this.state[stateValid];
    return {display: show ? 'block' : 'none'}
  }
  errorMessages(name, stateValid) {
    const requiredStr = 'This field is required.';
    const invalidStr = 'Enter valid '+ name +'.';
    return !this.state[stateValid] ? invalidStr : true
  }
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }
  handleSubmit() {      
    const { firstName, lastName, username, pw, email,  } = this.state;
    const isEnabled =
    firstName.length > 0 &&
    lastName.length > 0 &&
    username.length > 0 &&
    pw.length > 0 &&
    email.length > 0;
    
    /* if (this.state.firstName == null || this.state.firstName == "", 
        this.state.lastName == null || this.state.lastName == "", 
        this.state.username == null || this.state.username == "", 
        this.state.email == null || this.state.email == "", 
        this.state.pw == null || this.state.pw == "")
    { 
        
    }*/
    alert(`Signed up with firstName: ${firstName} email: ${email}`);
  }
  render() {

    const errors = this.validate(this.state.firstName, this.state.lastName, this.state.username, this.state.pw, this.state.email);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];      
      return hasError ? shouldShow : false;
    };
    
    return (
      <div className="container">
        <div className="register-form" >
          <div className="title">Create Your Free Account</div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>First Name</label>
              <input type="text" value={this.state.firstName} name="firstName"
                className={shouldMarkError("firstName") ? "error" : ""}
                onChange={(e) => this.handleChange(e, 'firstName')}
                onBlur={() => this.checkData(this.nameRegExp, this.state.firstName, this.state.firstNameIslValid, "firstName")}
              />
              <span className="required-field" style={this.requiredStyle()}>{this.errorMessages('firstName', 'firstNameIslValid')}</span>
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" value={this.state.lastName} name="lastName"
              className={shouldMarkError("lastName") ? "error" : ""}
                onChange={(e) => this.handleChange(e, 'lastName')}
                onBlur={() => this.checkData(this.nameRegExp, this.state.lastName, this.state.lastNameIslValid, "lastName")}
                // onBlur={this.handleBlur('lastName')}
              />
              <span className="required-field" style={this.requiredStyle()}>{this.errorMessages('lastName', 'lastNameIslValid')}</span>
            </div>
            <div>
              <label>Username</label>
              <input type="text" value={this.state.username} name="username" 
                className={shouldMarkError("username") ? "error" : ""}
                onChange={(e) => this.handleChange(e, 'username')}
                onBlur={() => this.checkData(this.usernameRegExp, this.state.username, this.state.usernameIslValid, "username")}
              />
              <span className="required-field" style={this.requiredStyle()}>{this.errorMessages('username', 'usernameIslValid')}</span>
            </div>
            <div>
              <label>Password</label>
              <input type="password" value={this.state.pw} name="pw"
                className={shouldMarkError("pw") ? "error" : ""}
                onChange={(e) => this.handleChange(e, 'pw')}
                onBlur={() => this.checkData(this.pwRegExp, this.state.pw, this.state.passwordIsValid, "pw")}
              />
              <span className="note">At least 8 characters</span>
              <span className="required-field" style={this.requiredStyle()}>{this.errorMessages('pw', 'passwordIslValid')}</span>
            </div>
            <div>
            <label>Email</label>
              <input type="text" name="email" value={this.state.email}
                className={shouldMarkError("email") ? "error" : ""}
                onChange={(e) => this.handleChange(e, 'email')}
                onBlur={() => this.checkData(this.emailRegExp, this.state.email, this.state.emaiIslValid, "email")} 
              />
              <span className="required-field" style={this.requiredStyle()}>{this.errorMessages('email', 'emailIslValid')}</span>
              <span className="note">An activatoin link will be sent to this email</span>
            </div>
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
