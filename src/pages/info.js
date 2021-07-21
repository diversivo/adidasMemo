import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { navigate } from 'gatsby';

import { validarRUT } from 'validar-rut';
import { clrIlTxt } from '../components/utils';
import Banner from '../assets/images/img-completa.jpg';

const Info = ({ location }) => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [RUT, setRUT] = useState('');

  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [RUTError, setRUTError] = useState('');

  useEffect(() => {
    if (location.state && location.state.time && location.state.code) {
      if ((Date.now() - location.state.time) > 1000 * 10) {
        navigate('/');
      } else {
        setCode(location.state.code);
      }
    }
    return () => { }
  }, [])

  const checkParams = () => {
    let notError = true;
    if (firstname.length < 2) {
      setFirstnameError('El campo no puede estar vacío');
      notError = false;
    } else { setFirstnameError('') }
    if (lastname.length < 2) {
      setLastnameError('El campo no puede estar vacío');
      notError = false;
    } else { setLastnameError('') }
    if (email.length < 2) {
      setEmailError('El campo no puede estar vacío');
      notError = false;
    } else { setEmailError('') }
    if (phone.length < 2 || isNaN(phone) || phone.length > 11) {
      setPhoneError('El campo está vacío o contiene errores');
      notError = false;
    } else { setPhoneError('') }
    if (RUT.length < 5 ) {
      setRUTError('Debe ingresar un rut/pasaporte válido');
      notError = false;
    } else { setRUTError('') }

    if (notError) {
      if (typeof window !== `undefined`) {
        navigate('/trivia', {
          state: {
            code,
            firstname,
            lastname,
            email,
            rut: RUT,
            phone,
            time: Date.now()
          }
        });
      }
    }

  };



  if (!location.state || !location.state.code || !location.state.time) {
    if (typeof window !== `undefined`) {
      navigate('/');
    }
    return null;
  }

  return (<Layout>
    <SEO title="Generator" />
    <div className="container">
      <img className="m-0-auto max-w-400 pt-1" src={Banner} alt="Banner completa tus datos"></img>
      <form className="m-0-auto">
        <div className="grid-2-col">
          <div>
            {/* <label>Nombre</label> */}
            <input placeholder="NOMBRE" type="text" onChange={(e) => { setFirstname(e.target.value.trim()) }} />
            {firstnameError ? <div>{firstnameError}</div> : null}
          </div>
          <div>
            {/* <label>Apellido</label> */}
            <input placeholder="APELLIDO" type="text" onChange={(e) => { setLastname(e.target.value.trim()) }} />
            {lastnameError ? <div>{lastnameError}</div> : null}
          </div>
        </div>

        {/* <label>Correo</label> */}
        <input placeholder="CORREO" type="text" onChange={(e) => { setEmail(e.target.value.trim()) }} />
        {emailError ? <div>{emailError}</div> : null}
        {/* <label>Teléfono</label> */}
        <input  placeholder="TELÉFONO" type="text" onChange={(e) => { setPhone(e.target.value.trim()) }} />
        {phoneError ? <div>{phoneError}</div> : null}
        {/* <label>Rut</label> */}
        <input placeholder="R.U.T. Ej: 172528198"  translate="no" class="notranslate" type="text" onChange={(e) => { setRUT(e.target.value.trim()) }} />
        {RUTError ? <div>{RUTError}</div> : null}
        <div
          style={{
            height: '40px',
            width: '95%',
            lineHeight: '40px',
            margin: '5px auto 5px auto',
            textAlign: 'center'
          }}
        >
          <input
            style={{ ...clrIlTxt('wht', 50), backgroundColor: '#D7685B', border: 0 }}
            type="button"
            value="EMPEZAR"
            className="btn btn--primary m-0-auto"
            onClick={checkParams}
          />
        </div>
      </form>
    </div>
  </Layout >);
}


export default Info;