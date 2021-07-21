
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Logo from '../assets/svg/AdidasLogo.svg';


import { clrIlTxt, copyTextToClipboard } from '../components/utils';

import { navigate } from 'gatsby';

const Generator = ({ location }) => {

  const [user, setUser] = useState('');
  const [code, setCode] = useState('000000');
  const [bill, setBill] = useState('');
  const [amount, setAmount] = useState('');
  const [channel, setChannel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!location.state || !location.state.user) {
    if (typeof window !== `undefined`) {
      navigate('/solicituddecodigos');
    }
  }

  useEffect(() => {
    if (location.state) {
      setUser(location.state.user);
    }
    return () => { }
  }, [])




  /* Algorithm to lambda function */
  // Start on 1153275
  // Get last Value of Code
  // If odd adition 3
  // If even adition 5
  // Transform the number to HEX
  // Persist alongside all form data
  // Return code


  console.log(location.state);

  const billChangeHandler = (e) => setBill(e.target.value);
  const amountChangeHandler = (e) => setAmount(e.target.value);
  const channelChangeHandler = (e) => setChannel(e.target.value);

  const cleanForm = () => {
    setBill('');
    setAmount('');
    setChannel('');
    setCode('000000');
  }

  const checkParams = () => {
    setError('');
    if (!bill || isNaN(bill)) {
      setError('El número de boleta es incorrecto');
      return false;
    }
    if (!amount || isNaN(amount)) {
      setError('El monto es incorrecto');
      return false;
    }
    if (!channel) {
      setError('Seleccione un canal');
      return false;
    }
    return true;
  }

  const getCodeFromAPI = () => {
    if (checkParams()) {
      setLoading(true);
      const url = 'https://eepz8tfl3a.execute-api.us-east-1.amazonaws.com/adidas-get-new-code';
      const data = {
        username: user,
        bill,
        amount,
        channel
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((result) => {
          setLoading(false);
          console.log('Success:', result);
          result.json()
            .then(data => {
              console.log('Data:', data);
              if (data.result) { setCode(data.result); }
              if (data.error) { setError(data.error); }
            })
            .catch(e => console.error('Error:', e));
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error:', error);
        });
    }
  };

  return (<Layout>
    <div className="container flex-fdc-fc-fs">
      <SEO title="Generator" />
      <div className="txt-center mt-2">
        <Logo className="max-w-56 h-56" />
      </div>
      <form>
        {error ? <p>{error}</p> : null}
        <label>Número de boleta</label>
        <input type="text" value={bill} onChange={billChangeHandler} />
        <label>Monto</label>
        <input type="text" value={amount} onChange={amountChangeHandler} />
        <label>Canal</label>
        <select value={channel} onChange={channelChangeHandler}>
          <option style={{ color: 'ligthgrey' }} value="">-- Selecionar --</option>
          <option value="tienda">Fisico</option>
          <option value="whatsapp">Whatsapp</option>
          <option value="ecommerce">Ecommerce</option>
        </select>
        <div
          style={{
            height: '40px',
            width: '100%',
            lineHeight: '40px',
            margin: '5px auto 5px auto'
          }}
        >
          <input
            style={{ ...clrIlTxt('blk', 50), backgroundColor: 'white', border: 0 }}
            type="button"
            value="REINICIAR"
            onClick={() => {
              if (!loading) { cleanForm() }
            }}
          />
          <input
            style={{ ...clrIlTxt('wht', 50), backgroundColor: '#005EA1', border: 0 }}
            type="button"
            value="PEDIR CÓDIGO"
            onClick={() => {
              if (!loading) { getCodeFromAPI(); }
            }}
          />
        </div>
      </form>

      <div
        className="code-container flex-cc"
        onClick={(e) => {
          if (code !== '000000') {
            copyTextToClipboard(`Su código es ${code}, ingresa y juega en adidastriviamujer.cl`);
          }
        }}
      >
      <div className="generated-code">{code}</div>
      <div style={{ position: 'relative', bottom: 0, right: 0 }}>Copiar</div>
    </div>
    </div>
  </Layout >);
}


export default Generator;