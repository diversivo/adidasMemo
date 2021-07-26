import React, { useState, useEffect, useRef } from 'react';
import { browserVersion, isIE, isSafari } from 'react-device-detect';

import { navigate } from 'gatsby';

import { rutEsValido } from '../components/utils';

import Layout from '../components/layout';
import SEO from '../components/seo';

import Logo from '../assets/svg/AdidasLogo.svg';

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
    if (!rutEsValido(rut)) {
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
    formValidation();
    if (Object.keys(errors).length === 0) {
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
            navigate('/trivia', {
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
    textAlign: 'center'
  };

  const stores = [
    "Tienda 1",
    "Tienda 2",
    "Tienda 3",
    "Tienda 4",
    "Tienda 5",
    "Tienda 6",
  ];

  return <Layout>
    <SEO title="Inicio" />
    <div className="container"
      style={{ textAlign: 'center', alignContent: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}
    >
      {true ?
        // JDP Put your code HERE
        <form>
          <h3 style={{ textTransform: 'uppercase', color: 'white', backgroundColor: 'black', width: '100%', height: '30px', lineHeight: '30px' }}>Participa por premios jugando en los</h3>
          <h2>CASILLEROS</h2>
          <h1>ADIDAS</h1>
          <label>Ingresa los siguientes datos para jugar</label>
          <input placeholder="NOMBRE Y APELLIDO" type="text" maxLength="50" style={{ ...inputStyle, borderColor: errors && errors.fullName ? 'red' : 'black' }} onChange={(e) => { setFullName(e.target.value) }} />
          {errors && errors.fullName ? <span className="error-span">{errors.fullName}</span> : null}
          <input placeholder="CORREO" type="text" maxLength="25" style={{ ...inputStyle, borderColor: errors && errors.email ? 'red' : 'black' }} onChange={(e) => { setEmail(e.target.value) }} />
          {errors && errors.email ? <span className="error-span">{errors.email}</span> : null}
          <input placeholder="TELEFONO" type="text" maxLength="25" style={{ ...inputStyle, borderColor: errors && errors.phone ? 'red' : 'black' }} onChange={(e) => { setPhone(e.target.value) }} />
          {errors && errors.phone ? <span className="error-span">{errors.phone}</span> : null}
          <input placeholder="RUT" type="text" maxLength="25" style={{ ...inputStyle, borderColor: errors && errors.rut ? 'red' : 'black' }} onChange={(e) => { setRut(e.target.value) }} />
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
          <input className="btn btn--primary" type="button" value="INGRESAR" onClick={() => !loading ? submitCodeToAPI(code) : null} />
        </form>
        : <Logo />}
    </div>
  </Layout>
};

export default IndexPage;