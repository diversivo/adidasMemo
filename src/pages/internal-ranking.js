
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { clrIlTxt } from '../components/utils';
import Logo from '../assets/svg/AdidasLogo.svg';
import bgImage from '../assets/images/bg-contact.jpg';


const InternalRank = ({ location }) => {

  const [rank, setRank] = useState([]);
  const [genCodes, setGenCodes] = useState(0);

  useEffect(() => {
    submitCodeToAPI();
    return () => { }
  }, [])

  const submitCodeToAPI = (code) => {
    const url = 'https://eepz8tfl3a.execute-api.us-east-1.amazonaws.com/adidas-internal-rank';
    const data = { code };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        console.log('Success:', result);
        result.json().then((data)=>{
          console.log('data', data);
          setRank(data.rank);
          setGenCodes(data.codeCount);
        }).catch(e=>console.log('Error', e));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };



  return (<Layout>
    <SEO title="Tivia" />
    <div className="container">
      <div className="txt-center mt-2">
        <Logo className="max-w-56 h-56" />
      </div>
    <div className="rank" style={{height:'400px'}}>
      {
        rank.map((value, index) => {
          return <div className="rank-item" key={`rank-item-${index}`} >
            <div style={{ ...clrIlTxt('red', 15), textAlign: 'center' }}>{index + 1}</div>
            <div style={{...clrIlTxt('blu', 60), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{`${value.firstname} ${value.lastname}`}</div>
            <div className="txt-right" style={{...clrIlTxt('blk', 25),textAlign: 'right', paddingRight: '16px' }}>{value.score}</div>
          </div>;
        })
      }
    </div>
    {
      rank.length > 0?
        <div className="player-score" style={{ lineHeight: '40px', height: '80px', width: '100%', fontSize: '16px', position:'fixed', bottom:'0', left:'0' }}>
          <div style={{ ...clrIlTxt('wht', 50), backgroundColor: '#005EA1', padding: '0 10px' }}>
            <div style={clrIlTxt('wht', 70)}>Participantes</div>
            <div style={clrIlTxt('wht', 30, true)}>{rank.length}</div>
          </div>
          <div style={{ ...clrIlTxt('wht', 50), backgroundColor: '#D7685B', padding: '0 10px' }}>
            <div style={clrIlTxt('wht', 70)}>Códigos Generados</div>
            <div style={clrIlTxt('wht', 30, true)}>{genCodes}</div>
          </div>
        </div> : null
    }
    </div>

  </Layout >);
}


export default InternalRank;