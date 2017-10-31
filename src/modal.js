import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <div className='modal'>
        <div className='modal-content'>
          <div className="modal-title">{this.props.text}</div>
          <div>
            <div className="modal-label">
              <div>First Name: </div>
              <div className="modal-input-value">{this.props.firstName}</div>
            </div>
            <div className="modal-label">
              <div>Last Name: </div>
              <div className="modal-input-value">{this.props.lastName}</div>
            </div>
            <div className="modal-label">
              <div>Username: </div>
              <div className="modal-input-value">{this.props.username}</div>
            </div>
            <div className="modal-label">
              <div>Passwort: </div>
              <div className="modal-input-value">{this.props.password}</div>
            </div>
            <div className="modal-label">
              <div>Email: </div>
              <div className="modal-input-value">{this.props.email}</div>
            </div>
          </div>
          <button className="modal-btn" onClick={this.props.closeModal}>Close</button>
        </div>
      </div>
    );
  }
};
 
export default Modal;
  