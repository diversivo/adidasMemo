import React, { useState, useEffect, useRef } from 'react';
import { navigate } from 'gatsby';

const ContactForm = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);

  const firstRender = useRef(true);

  const submitToAPI = () => {
    const url = 'https://tmk103pg3g.execute-api.us-east-1.amazonaws.com/samsungb2bPowerMeeting';
    const data = {
      name,
      phone,
      email,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        console.log('Success:', result);
        console.log(`/streaming?token=${btoa(`@${email.split('@')[1].toLowerCase()}`).replace(/[^a-zA-Z0-9]/g, '')}`);
        navigate(`/streaming?token=${btoa(`@${email.split('@')[1].toLowerCase()}`).replace(/[^a-zA-Z0-9]/g, '')}`)
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    setLoadingButton(true);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false; // it's no longer the first render
      return; // skip the code below
    }

    if (name.length) {
      const nameFormat = /^[A-zÀ-ú][A-zÀ-ú\s]*$/
      setNameError(nameFormat.test(name) ? '' : 'Su nombre solo puede contener letras y espacios.');
    }

    if (email.length) {
      const validEmails = [
        'ford.com',
        'samsung.com',
        'partner.samsung.com',
        'p-per.com',
        'movistar.cl',
        'telefonica.com',
        'cva.cl',
        'ssangyong.cl',
        'transbank.cl',
        'koandina.com',
        'diversivo.cl',
        's2ginternational.com',
        'wschile.cl',
        'gtb.com',
        'adidas-group.com',
        'adidas.com',
        'clarochile.cl',
        'metro.cl',
        'dcv.cl',
        'mgmotors.cl',
        'liferay.com',
        'afpcapital.cl',
        'sura.cl',
        'itba.edu.ar',
        'entel.cl',
        'entelcanales.cl',
        'bhp.com',
        'parachute.cl',
        'grupofides.cl',
      ]
      const mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const validEmail = mailformat.test(email) && validEmails.includes(email.split('@')[1])
      setEmailError(validEmail ? '' : 'El correo ingresado debe ser un correo corporativo válido.');
    }

    const phoneFormat = /^\d{9}$/;
    setPhoneError(phone.length && phoneFormat.test(phone) || !phone.length ? '' : 'Su teléfono solo debe contener 9 dígitos.');

  }, [name, email, phone]);

  const validForm = name.length &&
    email.length &&
    !nameError.length &&
    !emailError.length &&
    !phoneError.length &&
    !loadingButton


  const formClass = `button ${validForm ? '' : 'button--disabled'}`;
  console.log('FormValid', validForm);


  return (
    <form className="index__form form" id="contact-form" method="post">
      <label htmlFor="name-input">
        <input
          name="name"
          id="name-input"
          type="text"
          placeholder="Nombre Completo"
          value={name}
          className={nameError.length ? 'error' : ''}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="form__helper">{nameError}</p>
      </label>
      <label htmlFor="email-input">
        <input
          name="email"
          id="email-input"
          type="text"
          placeholder="Correo corporativo"
          value={email}
          className={emailError.length ? 'error' : ''}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="form__helper">{emailError}</p>
      </label>
      <label htmlFor="phone-input">
        <input
          name="phone"
          id="phone-input"
          type="text"
          placeholder="Teléfono"
          value={phone}
          className={phoneError.length ? 'error' : ''}
          onChange={(e) => setPhone(e.target.value)}
        />
        <p className="form__helper">{phoneError}</p>
      </label>
      <button
        type="button"
        disabled={!validForm}
        className={formClass}
        onClick={(e) => {
          if (validForm) {
            submitToAPI(e)
          } else {
            console.log('Not sended')
          }
        }}
      >
        {loadingButton ? 'Enviando...' : 'Ingresar'}
      </button>
    </form>
  );
};

export default ContactForm;
