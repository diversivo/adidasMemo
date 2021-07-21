import React from 'react';
import PrimaryButton from './primary-button';

const Contact = () => (
  <div className="container bg__dark-color">
    <div className="cContact__content">
      <div className="cContact">
        <h1>¿Listo para hablar?</h1>
        <h3>Nos encantaría conocer tus ideas.</h3>
      </div>
      <div className="cContact">
        <PrimaryButton />
      </div>
    </div>
  </div>
);


export default Contact;
