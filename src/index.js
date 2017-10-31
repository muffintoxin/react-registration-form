import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RegistrationForm from './RegistrationForm';
import registerServiceWorker from './registerServiceWorker';

 ReactDOM.render(<RegistrationForm />, document.getElementById('root'));
registerServiceWorker() 