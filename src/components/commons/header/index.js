// import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
// import LogoDiversivo from '../../../assets/svg/inline/logodiversivo.inline.svg';
// import HamburguerMenu from '../../../assets/svg/inline/hamburguermenu.svg';


// DQ: Esto está mal
// const triggerMenu = () => {
//   const menuNav = document.getElementById('js-header__nav');
//   menuNav.classList.toggle('js-header__nav--active');
// };

const Header = ({ menuLinks }) => (
  <header className="header__container">
    <div className="header__content">
      <div className="header__logo">
        {/* <Link to="/">
          <LogoDiversivo />
        </Link> */}
      </div>
      <div />
      {/* <HamburguerMenu
        className="header__hamburguer-menu"
        id="js-trigger-menu"
        onClick={triggerMenu}
      /> */}
      {/* <nav className="header__nav">
        <ul id="js-header__nav" className="header__nav__ul">
          {
            menuLinks.map(
              (link) => (
                <li
                  key={link.name}
                  style={{
                    listStyleType: 'none',
                    padding: '.75rem 0rem .75rem 2.50rem',
                    margin: 0,
                  }}
                >
                  <Link
                    className="header__nav__link"
                    to={link.link}
                  >
                    {link.name}
                  </Link>
                </li>
              ),
            )
          }
        </ul>
      </nav> */}
    </div>
  </header>
);

Header.propTypes = {
  menuLinks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Header.defaultProps = {};

export default Header;
