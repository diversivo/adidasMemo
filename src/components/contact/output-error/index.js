import React from 'react';
import Error from '../../../assets/svg/error.svg';

const OutputError = () => (
  <div className="response-box">
    <img src={Error} alt="error"></img>
    <h3 className="padding-bottom">Error de envío</h3>
    <p className="padding-bottom">No fue posible enviar tus datos.</p>
    <a className="button">Intentar nuevamente</a>
  </div>
);

export default OutputError;