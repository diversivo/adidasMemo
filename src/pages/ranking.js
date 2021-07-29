
import React, { useEffect, useState } from 'react';
import {Link} from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import { clrIlTxt } from '../components/utils';
import Logo from '../assets/svg/AdidasLogo.svg';
import bgImage from '../assets/images/bg-contact.jpg';
import bannerKids from '../assets/images/banner-kids.png';


const Rank = ({ location }) => {

  const [rank, setRank] = useState([]);
  const [rankNumber, setRankNumber] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    if (location.state && location.state.code) {
      setRank(location.state.rank);
      setPlayerScore(location.state.score);
      setRankNumber(location.state.rankNumber);
      setCorrectAnswers(location.state.correctAnswers);
    }
    return () => { }
  }, [])

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (seconds == 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
  }

  return (<Layout>
    <SEO title="Tivia" />
    <div className="container concret__bg">
    <div
      className="head-text"
      style={{
        width: '100%',
        textAlign: 'center'
      }}
    >
      <div className="grid-2-col align-center">
      <img style={{ width: '90%', margin: '0 auto', maxWidth: '200px', paddingTop: '8px'}}src={bannerKids} alt="Banner Kids" />
      <div style={{ color: '#C7066F', fontSize: '36px', textAlign: 'left' }}>GRACIAS <br />POR JUGAR</div>
      </div>
      
      <div style={{ fontSize: '14px' }}>Ya estas participando por cualquiera de los siguientes premios:</div>
      <div style={{ color: '#005EA1', fontSize: '14px' }}>
        1er premio: 2 outfit completo ($250.000 cada uno) <br />
        2do premio: 1 outfit completo ($250.000 máximo).<br />
        3er premio: 2 pares de zapatillas a elección ($100.000 cada uno).</div>
    </div>
    <div className="rank">
      {
        rank.map((value, index) => {
          const itsMe = playerScore !== null && rankNumber === index + 1;
          return <div className="rank-item" key={`rank-item-${index}`} style={itsMe ? { backgroundColor: '#005EA1' } : {}} >
            <div style={{ ...clrIlTxt(itsMe ? 'wht' : 'red', 15), textAlign: 'center' }}>{index + 1}</div>
            <div style={{...clrIlTxt(itsMe ? 'wht' : 'blu', 60), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{`${value.fullName}`}</div>
            <div className="txt-right" style={{...clrIlTxt(itsMe ? 'wht' : 'blk', 25),textAlign: 'right', paddingRight: '16px' }}>{value.score}</div>
          </div>;
        })
      }
    </div>
    {
      playerScore !== null ?
        <div className="player-score" style={{ lineHeight: '40px', height: '80px', width: '100%', fontSize: '16px' }}>
          <div style={{ ...clrIlTxt('wht', 50), backgroundColor: '#005EA1', padding: '0 10px' }}>
            <div style={clrIlTxt('wht', 70)}>Tu puntaje es</div>
            <div style={clrIlTxt('wht', 30, true)}>{playerScore}</div>
          </div>
          <div style={{ ...clrIlTxt('wht', 50), backgroundColor: '#D7685B', padding: '0 10px' }}>
            <div style={clrIlTxt('wht', 70)}>Tu ranking</div>
            <div style={clrIlTxt('wht', 30, true)}>{rankNumber}</div>
          </div>
          <div style={{ ...clrIlTxt('blk', 100), backgroundColor: '#F8F8F8', padding: '0 10px' }}>
            <div style={clrIlTxt('blk', 70)}>Tiempo</div>
            <div style={clrIlTxt('blu', 30, true)}>{millisToMinutesAndSeconds(90000 - playerScore)}</div>
          </div>
          <div style={{display:'flex', justifyContent:'space-around', flexDirection: 'column', alignItems:'center', backgroundColor: 'white'}}>
            <p>Si tienes otra boleta puedes</p>
            <div style={{display:'flex', justifyContent:'space-around', flexDirection: 'row', alignItems:'center', backgroundColor: 'white'}}>

              <Link className="btn btn--primary" to="/">Volver a jugar</Link>
              <a className="btn btn__outline" href="https://adidas.cl">Ir a adidas</a>
          </div>
          </div>
          {/* <div style={{ ...clrIlTxt('blk', 50), backgroundColor: '#F8F8F8', padding: '0 10px' }}>
            <div style={clrIlTxt('blk', 70)}>Preguntas buenas</div>
            <div style={clrIlTxt('blu', 30, true)}>{correctAnswers}</div>
          </div> */}
        </div> : null
    }
    {/* <div className="flex-cc" style={{ width: '95%', height: '140px', textAlign: 'center', margin: '5px auto 5px auto', backgroundImage: `url(${bgImage})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <p className="pb-1">Si compras más productos adidas <br></br>por nuestro canal de WhatsApp tendrás MÁS OPCIONES DE GANAR</p>
        <a href="https://api.whatsapp.com/send?phone=56939320874"
        className="btn btn--primary">WHATSAPP</a>
    </div> */}
    </div>

  </Layout >);
}


export default Rank;