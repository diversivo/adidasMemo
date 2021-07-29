import React from 'react';
import { Link } from 'gatsby'


import Layout from '../components/layout';
import SEO from '../components/seo';



const IndexPage = ({ location }) => {


  return <Layout>
    <SEO title="Inicio" />  
    <div>Disclaimer</div>
    <Link to="/form">JUGAR</Link>
  </Layout>
};

export default IndexPage;