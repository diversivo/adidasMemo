
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { getRandom, shuffleArray } from '../components/utils';

import { navigate } from 'gatsby';

import questions from '../assets/questions.json';

const Game = ({ location }) => {

  const questionStartTime = 90000;
  const timePartition = 5;

  const bottomStepStyle = { display: 'inline-block', marginTop: 0, width: '20%', height: '100%', backgroundColor: '#005EA1' };

  const [startCount, setStartCount] = useState(6000);
  const [loading, setLoading] = useState(false);
  const [questionTime, setQuestionTime] = useState(questionStartTime);
  const [altClicked, setAltClicked] = useState([]); 
  const [results, setResults] = useState([]);
  const [currentQueryIndex, setCurrentQueryIndex] = useState(0);
  const [currentQueryObject, setCurrentQueryObject] = useState({alternatives:[]});

  // Info
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [store, setStore] = useState('');
  const [code, setCode] = useState('');
  const [RUT, setRUT] = useState('');

  useEffect(() => {
    if(true){
      if (location.state && location.state.time) {
        if ((Date.now() - location.state.time) > 1000 * 10) {
          console.log("Time Issue");
          navigate('/');
        } else {
          setInvoiceAmount(location.state.invoiceAmount);
          setInvoiceNumber(location.state.invoiceNumber);
          setFullName(location.state.fullName);
          setStore(location.state.store);
          setEmail(location.state.email);
          setPhone(location.state.phone);
          setCode(location.state.code);
          setRUT(location.state.rut);
        }
      }
    }
    return () => { }
  }, [])

   useEffect(() => {
    const selectedTokens = getRandom(questions[currentQueryIndex].alternatives,6);
    selectedTokens.push(...selectedTokens);
    console.log(selectedTokens);
    const shuffledArray = shuffleArray(selectedTokens);
    setCurrentQueryObject({alternatives: shuffledArray});
    
    return () => { }
  }, [])

  useEffect(() => {
    if (startCount > 1000) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        setStartCount(startCount - elapsedTime);
        // console.log("Start Time", startCount);
      }, timePartition);
      return () => {
        clearInterval(interval);
      }
    } else if (questionTime > 1000) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        if (questionTime < 1000 ) {
          clearInterval(interval);
        } else {
          const elapsedTime = Date.now() - startTime;
          setQuestionTime(questionTime - elapsedTime);
        }
      }, timePartition);
      return () => {
        clearInterval(interval);
      }
    }
  }, [startCount, questionTime]);

  const mins = Math.trunc(questionTime / (1000 * 60));
  const secondModule = Math.floor((questionTime - (mins * 1000 * 60)) / 1000);
  const seconds = secondModule < 10 ? `0${secondModule}` : `${secondModule}`;

  const persistScore = (score) => {
    setLoading(true);
    const url = 'https://eepz8tfl3a.execute-api.us-east-1.amazonaws.com/adidas-persists-participation';
    const data = {
      code: invoiceNumber,
      score,
      fullName,
      email,
      phone,
      rut: RUT,
      store,
      invoiceAmount
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
        console.log('Success:', result);
        result.json()
          .then(data => {
            console.log('Data:', data);
            navigate('/ranking', { state: data });
          })
          .catch(e => console.error('Error:', e));
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error:', error);
      });
  };

  const alternativeClicked = (index) => { 
    console.log("Resultado",results);
    const currentOptionText = currentQueryObject.alternatives[index].text;
    if(altClicked.length === 0) {
      console.log("Marcar alternativa", currentOptionText);
      setAltClicked([index]);
    } else if(altClicked.length === 1 && !results.includes(index) && !results.includes(altClicked[0])) {
      if(currentQueryObject.alternatives[altClicked[0]].text === currentOptionText && altClicked[0] !== index){
        const newResults = [...results, altClicked[0], index];
        if(newResults.length == 12){
          // Persist score
          persistScore(questionTime);
        }
        setResults(newResults);
        setAltClicked([]);
      } else {
        setAltClicked([...altClicked, index]);
        setTimeout(() => {
          setAltClicked([]);
        }, 1000);
      }
    }
  }

  // const answerClicked = (forceTime) => {
  //   const newResults = [...results,
  //   {
  //     ansStatus: forceTime !== undefined ? forceTime : currentQueryObject.alternatives[altClicked].isTrue,
  //     time: questionTime
  //   }
  //   ];
  //   setResults(newResults);
  //   setTimeout(() => {
  //     setQuestionTime(questionStartTime);
  //     if (newResults.length === 5) {
  //       const score = newResults.reduce((acum, value) => value.ansStatus ? acum + value.time : acum, 0);
  //       const correctAnswers = newResults.reduce((acum, value) => value.ansStatus ? acum + 1 : acum, 0);
  //       persistScore(score, correctAnswers);
  //       console.log(results);
  //     } else {
  //       setAltClicked(null);
  //       setCurrentQueryIndex(currentQueryIndex + 1);
  //     }
  //   }, 2000); 
  // }

  if (!location.state || !location.state.time) {
    if (typeof window !== `undefined`) {
      navigate('/');
    }
    return null;
  }


  return (<Layout>
    <SEO title="Tivia" />
    {/* <div style={{
      width: '100%',
      textAlign: 'center',
      padding: '10px',
    }}>
    </div> */}
    <div className="casilleros--container concret__bg">
      <div style={{ color: 'white', textAlign: 'center', backgroundColor: 'black', fontWeight: 'ligth' }}>
        <span>Descubre los pares y podrás<br />ganar increibles premios</span>
      </div>

      {
        startCount < 1000 ?
          <div
            className="question-object"
            style={{
              textAlign: 'center',
              width: '100%',
            }}
          >

            <div className="time-grid">
              <div style={{ gridArea: '1 / 1 / 2 / 2' }}>
                <div className="question" style={{ color: 'black', fontSize: '12px', padding: '5px', textAlign: 'left' }}>Toca los casilleros y</div>
                <div className="question" style={{ color: 'black', fontSize: '20px', padding: '5px', textAlign: 'left' }}>Encuentra los pares</div>
              </div>
              <div
                className="question-time"
                style={{
                  width: '100%',
                  textAlign: 'center',
                  color: '#005EA1',
                  fontSize: '36px',
                  backgroundColor: '#a7a7a7'
                }}
              >
                <div>{`0${mins}:${seconds}`}</div>
              </div>
            </div>
            <div className="memo-grid">
              {
                currentQueryObject.alternatives.map((value, index) => {
                  return <div
                    className={`option-square wrapper ${altClicked.includes(index) || results.includes(index) ? ' open' : ''}`}
                    key={`alt-${index}`}
                    onClick={() => { alternativeClicked(index); }}
                  >
                    <div
                      className={`alternative alt1 bg ${value.class}`}
                      style={{
                       color: 'white', 
                       backgroundColor: '#272626'
                      }}
                   />
                    <div className="door"></div>
                  </div>
                    ;
                })
              }
            </div>
          </div>
          : null
      }
      {
        startCount > 1000 ?
          <div className="start-timer">
            <div style={{
              color: '#005EA1',
              opacity: startCount % 1000 / 1000,
              fontSize: startCount % 1000 / 2,
              textAlign: 'center',
              lineHeight: '80vh',
            }}>
              {Math.trunc(startCount / 1000)}
            </div>
          </div> : null
      }
    </div>
  </Layout >);
}


export default Game;