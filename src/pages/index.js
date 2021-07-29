import React from 'react';
import { Link } from 'gatsby'


import Layout from '../components/layout';
import SEO from '../components/seo';
import LogosAdidas from '../assets/svg/index/logos-adidas.svg'
import Nina from '../assets/images/banner-kids.png';
import EsteMes from '../assets/svg/index/este-mes.svg';
import PorCompras from '../assets/svg/index/por-compras.svg';
import Legales from '../assets/svg/index/legales.svg';



const IndexPage = ({ location }) => {


  return <Layout>
    <SEO title="Inicio" />
    <div className="container container__index">
      <img src={Nina} alt="Banner Adidas" />
      <div className="este-mes"><EsteMes /></div>
      <PorCompras />
      <Link className="btn btn--primary" to="/form">JUGAR</Link>
      <Legales />
    </div>
  </Layout>
};

export default IndexPage;