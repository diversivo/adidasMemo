import React, { useState, useEffect, useRef } from 'react';
import { browserVersion, isIE, isSafari } from 'react-device-detect';

import { navigate } from 'gatsby';

import { rutEsValido } from '../components/utils';

import Layout from '../components/layout';
import SEO from '../components/seo';

import Logo from '../assets/svg/AdidasLogo.svg';
import CasilleroAdidas from '../assets/svg/inline/casilleros-adidas.svg';


const IndexPage = ({ location }) => {

  const [codeError, setCodeError] = useState('');
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [warn, setWarn] = useState('');

  const firstRender = useRef(true);

  // Input state variables definition
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rut, setRut] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [store, setStore] = useState('');

  const [errors, setErrors] = useState({});


  const formValidation = () => {
    const newErrors = {};
    if (fullName === "") {
      newErrors.fullName = 'Campo requerido.';
    }
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(email)) {
      newErrors.email = 'Ingrese un correo válido.';
    }
    if (email === "") {
      newErrors.email = 'Campo requerido.';
    }
    const regPhone = /^(\+56)*(\d{9})$/;
    if (!regPhone.test(phone)) {
      newErrors.phone = 'Ingrese un teléfono válido';
    }
    if (phone === "") {
      newErrors.phone = 'Campo requerido.';
    }
    if (!rutEsValido(rut.toLocaleLowerCase())) {
      newErrors.rut = 'Rut inválido.';
    }
    if (rut === "") {
      newErrors.rut = 'Campo requerido.';
    }
    const regNumber = /^(\d)+$/;
    if (!regNumber.test(invoiceNumber)) {
      newErrors.invoiceNumber = 'Campo requerido.';
    }

    if (!regNumber.test(invoiceAmount)) {
      newErrors.invoiceAmount = 'Campo requerido.';
    }

    if (store === "") {
      newErrors.store = 'Campo requerido.';
    }

    setErrors(newErrors);
    return newErrors;
  }


  useEffect(() => {
    // we want to skip validation on first render
    if (firstRender.current) {
      firstRender.current = false
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
      return
    }
  }, [])

  const submitCodeToAPI = (code) => {
    if (Object.keys(formValidation()).length === 0) {
      setLoading(true);
      const url = 'https://eepz8tfl3a.execute-api.us-east-1.amazonaws.com/adidas-check-code';
      const data = { code: invoiceNumber };

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
            navigate('/game', {
              state: {
                time: Date.now(),
                invoiceNumber,
                invoiceAmount,
                fullName,
                email,
                phone,
                store,
                rut,
              }
            })
          } else {
            setCodeError('El número de boleta ingresado presenta un error o ya fue utilizado.')
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error:', error);
        });
    }
  };

  const inputStyle = {
    textTransform: 'uppercase',
    textAlign: 'left'
  };

  const stores = [
    "Internet",
    "Whatsapp",
    "Mall Sport",
    "Kids Parque Arauco",
    "Kids Arauco Maipu",
    "Kids Plaza Vespucio",
    "Originals Plaza Vespucio",
    "Originals Alto Las Condes",
    "Originals Costanera",
    "Originals Plaza Egaña",
    "Originals Plaza Oeste",
    "Originals  Florida Center",
    "Originals Alameda",
    "Originals Parque Arauco",
    "Originals Arauco Maipu",
    "Originals Mall Plaza Sur",
    "Originals Plaza Trebol Concepción",
    "Originals Plaza La Serena",
    "Outlet Irarrázaval",
    "Outlet Portal la Reina ",
    "Outlet Buenaventura",
    "Outlet San Pedro ",
    "Outlet Easton Center",
    "Outlet La Fábrica  ",
    "Outlet Vivo Maipú",
    "Outlet Vivo Florida ",
    "Outles Estacíon Central",
    "Outlet Arauco Coquimbo",
    "Outlet Viña del Mar",
    "Outlet Curauma ",
    "Outlet Temuco",
    "Performance Plaza Vespucio",
    "Performance Alto Las Condes",
    "Performance Costanera",
    "Performance Plaza Egaña",
    "Performance Plaza Oeste",
    "Performance Florida Center",
    "Performance Alameda",
    "Performance Parque Arauco",
    "Performance Arauco Maipú",
    "Performance Mall Plaza Sur ",
    "Performance Plaza Norte",
    "Performance Tobalaba",
    "Performance Mall Plaza Iquique",
    "Performance Plaza Antofagasta",
    "Performance Mall Plaza Copiapó",
    "Performance Plaza La Serena",
    "Performance Open Rancagua",
    "Performance Marina Arauco",
    "Performance Mall Maule Talca",
    "Performance Plaza Trébol Concepción",
    "Performance Concepcion Bio Bio",
    "Performance Plaza Los Ángeles",
    "Performance Mall Plaza los Rios Valdivia",
    "Performance Portal Temuco",
    "Performance Mall Paseo Puerto Montt ",
  ];

  return <Layout>
    <SEO title="Inicio" />
    <div className="container index__container">
      <h3 style={{ textTransform: 'uppercase', color: 'white', backgroundColor: 'black', width: '100%', height: '30px', lineHeight: '30px' }}>Participa por premios jugando en</h3>
      <CasilleroAdidas style={{ width: '70%', margin:'0 auto', paddingTop: '8px'}}/>
      {true ?
        // JDP Put your code HERE
        <form>
          
          <label style={{color:'white', fontSize:'1.4em'}}>Ingresa los siguientes datos para jugar</label>
          <input placeholder="NOMBRE Y APELLIDO" type="text" maxLength="50" style={{ ...inputStyle, borderColor: errors && errors.fullName ? 'red' : 'black' }} onChange={(e) => { setFullName(e.target.value) }} />
          {errors && errors.fullName ? <span className="error-span">{errors.fullName}</span> : null}
          <input placeholder="CORREO" type="text" maxLength="25" style={{ ...inputStyle, borderColor: errors && errors.email ? 'red' : 'black' }} onChange={(e) => { setEmail(e.target.value) }} />
          {errors && errors.email ? <span className="error-span">{errors.email}</span> : null}
          <input placeholder="TELEFONO" type="text" maxLength="25" style={{ ...inputStyle, borderColor: errors && errors.phone ? 'red' : 'black' }} onChange={(e) => { setPhone(e.target.value) }} />
          {errors && errors.phone ? <span className="error-span">{errors.phone}</span> : null}
          <input placeholder="INGRESA TU RUT SIN PUNTO Y CON GUIÓN" type="text" maxLength="25" style={{ ...inputStyle, borderColor: errors && errors.rut ? 'red' : 'black' }} onChange={(e) => { setRut(e.target.value) }} />
          {errors && errors.rut ? <span className="error-span">{errors.rut}</span> : null}
          <input placeholder="NÚMERO DE BOLETA DE COMPRA" type="text" maxLength="25" style={{ ...inputStyle, borderColor: errors && errors.invoiceNumber ? 'red' : 'black' }} onChange={(e) => { setInvoiceNumber(e.target.value) }} />
          {errors && errors.invoiceNumber ? <span className="error-span">{errors.invoiceNumber}</span> : null}
          {codeError ? <span className="error-span">{codeError}</span> : null}
          <input placeholder="MONTO DE LA BOLETA" type="text" maxLength="25" style={{ ...inputStyle, borderColor: errors && errors.invoiceAmount ? 'red' : 'black' }} onChange={(e) => { setInvoiceAmount(e.target.value) }} />
          {errors && errors.invoiceAmount ? <span className="error-span">{errors.invoiceAmount}</span> : null}
          <select
            placeholder="NOMBRE DE LA TIENDA" type="text" maxLength="6"
            style={{ ...inputStyle, borderColor: errors && errors.store ? 'red' : 'black' }}
            onChange={(e) => { setStore(e.target.value) }}
          >
            <option disabled selected>NOMBRE DE LA TIENDA</option>
            {stores.map((name) => <option value={name} key={name}>{`${name}`}</option>)}
          </select>
          {errors && errors.store ? <span className="error-span">{errors.store}</span> : null}
          <input className="btn btn--primary" type="button" value="JUGAR" onClick={() => !loading ? submitCodeToAPI(code) : null} />
        </form>
        : <Logo />}
    </div>
  </Layout>
};

export default IndexPage;