import React, { useState, useEffect } from 'react';
import { browserVersion, isIE, isSafari } from 'react-device-detect';

import { navigate } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import Logo from '../assets/svg/AdidasLogo.svg';
import MainBanner from '../assets/images/img-codigo@x2.jpg';

const IndexPage = ({ location }) => {

  const [codeError, setCodeError] = useState('');
  const [warn, setWarn] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(function () {
      let warning = null;
      if (typeof window !== 'undefined') {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
        {
          warning = <div style={{ color: 'black', fontSize: '20px' }}>Este sitio no se encuentra soportado en este navegador por favor utilice uno diferente.</div>;
        }
        if (isSafari && browserVersion < 11) {
          warning = <div style={{ color: 'black', fontSize: '20px' }}>Este sitio no se encuentra soportado en este navegador por favor actualice su navegador o utilice uno diferente.</div>;
        }
      }
      setWarn(warning);
    }, 2000);
  }, [])

  const submitCodeToAPI = (code) => {
    setLoading(true);
    const url = 'https://eepz8tfl3a.execute-api.us-east-1.amazonaws.com/adidas-check-code';
    const data = { code };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        setLoading(false);
        setCodeError('');
        console.log('Success:', result);
        console.log(`/info?code=${code}&time=${Date.now()}`);
        if (typeof window !== `undefined` && result.status !== 500) {
          navigate('/info', {
            state: {
              code,
              time: Date.now()
            }
          })
        } else {
          setCodeError('El código ingresado no es válido, si cree que ocurrio un error contacte nuevamente con un ejectuvo.')
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error:', error);
      });
  };

  return <Layout>
    <SEO title="Inicio" />
    <div className="container"
      style={{ textAlign: 'center', alignContent: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}
    >
      {false ?
        // JDP Put your code HERE
        <form>
          <img src={MainBanner} alt="Main Banner"></img>
          <label>Ingresa el código para empezar</label>
          <input placeholder="INGRESA AQUÍ TU CÓDIGO" type="text" maxLength="6" style={{ textTransform: 'uppercase' }} onChange={(e) => { setCode(e.target.value) }} />
          {codeError ? <span>{codeError}</span> : null}
          <input className="btn btn--primary" type="button" value="INGRESAR" onClick={() => !loading ? submitCodeToAPI(code) : null} />
        </form>
        : <Logo />}
    </div>
  </Layout>
};

export default IndexPage;