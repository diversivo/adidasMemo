import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

import Logo from '../assets/svg/AdidasLogo.svg';


const IndexPage = ({ location }) => {

  return <Layout>
    <SEO title="Inicio" />
    <div className="container index__container" style={{backgroundImage:'none', backgroundColor:'white', width:'100vw', height:'100vh', position:'absolute'}}>
       <a href="https://eepz8tfl3a.execute-api.us-east-1.amazonaws.com/export-adidas-memo-ranking"><Logo /></a>
    </div>
  </Layout>
};

export default IndexPage;