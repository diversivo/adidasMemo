import React from 'react';
import PropTypes from 'prop-types';

const Value = ({ name, number, description }) => (
  <div className="value__slide">
    <h2 className="value__name">{name}</h2>
    <p className="value__number">{number}</p>
    <h5 className="value__description">{description}</h5>
  </div>
);

Value.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  description: PropTypes.string,
};

Value.defaultProps = {
  name: 'Nombre',
  number: '01',
  description: 'texto descriptivo',
};

export default Value;
