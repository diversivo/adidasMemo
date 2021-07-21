
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { navigate } from 'gatsby';

import questions from '../assets/questions.json';
import Logo from '../assets/svg/AdidasLogo.svg';



const Trivia = ({ location }) => {

  const questionStartTime = 90000;
  const timePartition = 5;

  const bottomStepStyle = { display: 'inline-block', marginTop: 0, width: '20%', height: '100%', backgroundColor: '#005EA1' };

  const [startCount, setStartCount] = useState(6000);
  const [loading, setLoading] = useState(false);
  const [questionTime, setQuestionTime] = useState(questionStartTime);
  const [altClicked, setAltClicked] = useState(null);
  const [ansClicked, setAnsClicked] = useState(null);
  const [results, setResults] = useState([]);
  const [currentQueryIndex, setCurrentQueryIndex] = useState(Math.floor(Math.random() * 4) * 5);

  // Info
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [RUT, setRUT] = useState('');

  useEffect(() => {
    if (location.state && location.state.time) {
      if ((Date.now() - location.state.time) > 1000 * 10) {
        navigate('/');
      } else {
        setFirstname(location.state.firstname);
        setLastname(location.state.lastname);
        setEmail(location.state.email);
        setPhone(location.state.phone);
        setCode(location.state.code);
        setRUT(location.state.rut);
      }
    }
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
        if (questionTime < 1000 || ansClicked !== null) {
          clearInterval(interval);
        } else if (questionTime < 1000) {
          answerClicked(0);
          clearInterval(interval);
        } else {
          const elapsedTime = Date.now() - startTime;
          setQuestionTime(questionTime - elapsedTime);
        }
        // console.log("Questiondi Time", questionTime);
      }, timePartition);
      return () => {
        clearInterval(interval);
      }
    }
  }, [startCount, questionTime, ansClicked]);

  const mins = Math.trunc(questionTime / (1000 * 60));
  const secondModule = Math.floor((questionTime - (mins * 1000 * 60)) / 1000);
  const seconds = secondModule < 10 ? `0${secondModule}` : `${secondModule}`;
  const currentQueryObject = questions[currentQueryIndex];

  const persistScore = (score, correctAnswers) => {
    setLoading(true);
    const url = 'https://eepz8tfl3a.execute-api.us-east-1.amazonaws.com/adidas-persists-participation';
    const data = {
      code,
      score,
      correctAnswers,
      setNumber: currentQueryIndex + 1 / 5,
      firstname,
      lastname,
      email,
      phone,
      rut: RUT
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
    setAltClicked(index);
  }

  const answerClicked = (forceTime) => {
    const newResults = [...results,
    {
      ansStatus: forceTime !== undefined ? forceTime : currentQueryObject.alternatives[altClicked].isTrue,
      time: questionTime
    }
    ];
    setAnsClicked(altClicked);
    setResults(newResults);
    setTimeout(() => {
      setQuestionTime(questionStartTime);
      if (newResults.length === 5) {
        const score = newResults.reduce((acum, value) => value.ansStatus ? acum + value.time : acum, 0);
        const correctAnswers = newResults.reduce((acum, value) => value.ansStatus ? acum + 1 : acum, 0);
        persistScore(score, correctAnswers);
        console.log(results);
      } else {
        setAltClicked(null);
        setAnsClicked(null);
        setCurrentQueryIndex(currentQueryIndex + 1);
      }
    }, 2000);
  }

  if (!location.state || !location.state.code || !location.state.time) {
    if (typeof window !== `undefined`) {
      navigate('/');
    }
    return null;
  }


  return (<Layout>
    <SEO title="Tivia" />
    <div style={{
      width: '100%',
      textAlign: 'center',
      padding: '20px',
    }}>
      <Logo className="max-w-56 h-56"/>
    </div>
    {
      startCount < 1000 ?
        <div
          className="question-time"
          style={{
            width: '100%',
            textAlign: 'center',
            color: '#005EA1',
            fontSize: '36px'
          }}
        >
          <div>{`0${mins}:${seconds}`}</div>
        </div> : null
    }
    {
      startCount < 1000 ?
        <div
          className="question-object"
          style={{
            textAlign: 'center',
            width: '100%'
          }}
        >
          <div className="question" style={{ color: '#D7685B', fontSize: '32px', padding: '26px' }}>{currentQueryObject.question}</div>
          {
            currentQueryObject.alternatives.map((value, index) => {
              return <div
                className="alternative alt1"
                key={`alt-${index}`}
                onClick={() => { alternativeClicked(index); }}
                style={{
                  ...altClicked === index ?
                    { color: 'white', backgroundColor: '#005EA1' } :
                    {},
                  ...ansClicked !== null && ansClicked == index ? {
                    backgroundColor: value.isTrue ? '#26A454' : '#D7685B'
                  } : {}
                }}
              >
                {value.text}
              </div>;
            })
          }
          <div
            style={{
              height: '40px',
              width: '130px',
              lineHeight: '40px',
              margin: '10px auto 10px auto',
              backgroundColor: '#D2D2D2',
              color: 'white',
              ...altClicked !== null ? {
                boxShadow: '0px 3px 6px #D7685B',
                backgroundColor: '#D7685B'
              } : {},
            }}
            onClick={() => {
              answerClicked();
            }}
          >
            RESPONDER
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
    <div
      className="bottom-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        height: '10px',
        lineHeight: '10px',
        width: '100%',
        backgroundColor: 'grey'
      }}
    >
      {
        results.map((value, index) =>
          <div key={`result-${index}`} style={{ ...bottomStepStyle, backgroundColor: value.ansStatus ? '#26A454' : '#D7685B' }}></div>
        )
      }
      <div style={{ ...bottomStepStyle }}></div>
    </div>
    <div style={{ opacity: 0, top: 0, left: 0, position: 'fixed', height: '100%', width: '100%', backgroundColor: 'black', display: ansClicked !== null ? 'block' : 'none' }} />
  </Layout >);
}


export default Trivia;