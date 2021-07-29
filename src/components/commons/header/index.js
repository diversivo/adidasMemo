// import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Logo from '../../../assets/svg/index/logos-adidas.svg'

const Header = () => (
  <header className="header__container">
    <div className="header__content flex-cc">
      <div className="header__logo">
        <Logo />
      </div>
      <div />
    </div>
  </header>
);

Header.propTypes = {
  menuLinks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Header.defaultProps = {};

export default Header;
