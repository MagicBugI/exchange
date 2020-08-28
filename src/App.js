import React, { useState, useEffect, Fragment } from 'react';
import Header from './components/header';
import './App.css';
import Title from './components/title';
import Chart from './components/Chart'

function App() {
  const [data, setData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(1);
  const [currentLabel, setCurrentLabel] = useState('CAD');
  const [calculateLabel, setCalculateLabel] = useState('CAD');
  const [history, setHistory] = useState([]);

  // fetch data after rendered page
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;


    fetch(`https://api.exchangeratesapi.io/latest?base=${currentLabel}`, { signal: signal })
      .then(data => data.json())
      .then(koef => setData(koef.rates));

    return function cleanup() {
      abortController.abort();
    }
  }, [currentLabel]);


  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const time = getDate();
    fetch(`https://api.exchangeratesapi.io/history?base=${currentLabel}&start_at=${time[1]}&end_at=${time[0]}&symbols=${calculateLabel}`,
      { signal: signal })
      .then(data => data.json())
      .then(koef => {
        const data = []
        for (let item in koef.rates) {
          data.push({ item, val: koef.rates[item][calculateLabel] })
        }
        console.log(data.sort((a, b) => a.item > b.item));
        setHistory(data.sort((a, b) => a.item > b.item))
      });

    return function cleanup() {
      abortController.abort();
    }
  }, [calculateLabel, currentLabel]);

  const getDate = () => {
    const time = new Date();
    const secondTime = new Date();
    secondTime.setUTCDate(secondTime.getUTCDate() - 20);
    const transformDate = (elem) => {
      const month = ('0' + elem.getUTCMonth()).slice(-2);
      const day = ('0' + elem.getUTCDate()).slice(-2);
      const year = elem.getUTCFullYear().toString();
      return `${year}-${month}-${day}`;
    }
    return [transformDate(time), transformDate(secondTime)];
  }
  const currentLabelChange = async (e) => {
    setCurrentLabel(e.target.value);
  }
  const calculateLabelChange = (e) => {
    setCalculateLabel(e.target.value)

  }
  const currentPriceHandler = (e) => {
    setCurrentPrice(e.target.value);
  }

  const makeCalculate = () => {
    const result = currentPrice * data[calculateLabel];
    return result;
  }
  makeCalculate();
  return (
    <Fragment>
      <div className='jumbotron'>
        <Title></Title>
        <Header
          currentValue={currentPrice}
          calculateValue={makeCalculate}
          rates={data}
          currentLabelChange={currentLabelChange}
          calculateLabelChange={calculateLabelChange}
          currentPriceHandler={currentPriceHandler}
        ></Header>
      </div>
      <div className='container pt-5'>
        <Chart charts={history} target={calculateLabel}></Chart>
      </div>
    </Fragment>
  );
}

export default App;
