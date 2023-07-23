import React, { useState, useEffect } from 'react';
import './App.css';
import { NumericFormat } from 'react-number-format';

const App = () => {
  // States to manage calculator values
  const [preState, setPrestate] = useState('');
  const [curState, setCurState] = useState('');
  const [input, setInput] = useState('0');
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  // Functionality to handle number inputs
  const inputNum = (e) => {
    // Prevent multiple decimal points
    if (curState.includes('.') && e.target.innerText === '.') return;

    // Clear previous result after a calculation is shown
    if (total) {
      setPrestate('');
    }

    // Append or set the current state based on previous state
    curState
      ? setCurState((pre) => pre + e.target.innerText)
      : setCurState(e.target.innerText);
    setTotal(false);
  };

  // Update the input display whenever the current state changes
  useEffect(() => {
    setInput(curState);
  }, [curState]);

  // Initialize the input display on component mount
  useEffect(() => {
    setInput('0');
  }, []);

  // Function to handle operator selection
  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (curState === '') return;
    if (preState !== '') {
      equals();
    } else {
      setPrestate(curState);
      setCurState('');
    }
  };

  // Function to perform calculation when '=' is clicked
  const equals = (e) => {
    if (e?.target.innerText === '=') {
      setTotal(true);
    }

    let cal;
    switch (operator) {
      case '/':
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;
      case '+':
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case 'X':
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      case '-':
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      default:
        return;
    }
    setInput('');
    setPrestate(cal);
    setCurState('');
  };

  // Function to toggle positive/negative sign
  const minusPlus = () => {
    if (curState.charAt(0) === '-') {
      setCurState(curState.substring(1));
    } else {
      setCurState('-' + curState);
    }
  };

  // Function to calculate percentage
  const percent = () => {
    preState
      ? setCurState(String(parseFloat(curState) / 100 * preState))
      : setCurState(String(parseFloat(curState) / 100));
  };

  // Function to reset the calculator
  const reset = () => {
    setPrestate('');
    setCurState('');
    setInput('0');
  };

  return (
    <div className='container'>
      <div className='wrapper'>
        {/* Display for the calculator */}
        <div className='screen'>
          {input !== '' || input === '0' ? (
            <NumericFormat
              value={input}
              displayType={'text'}
              thousandSeparator={true}
            />
          ) : (
            <NumericFormat
              value={preState}
              displayType={'text'}
              thousandSeparator={true}
            />
          )}
        </div>

        {/* Calculator buttons */}
        <div className='btn light-gray' onClick={reset}>AC</div>
        <div className='btn light-gray' onClick={percent}>%</div>
        <div className='btn light-gray' onClick={minusPlus}>+/-</div>

        <div className='btn orange' onClick={operatorType}>/</div>
        <div className='btn' onClick={inputNum}>7</div>
        <div className='btn' onClick={inputNum}>8</div>
        <div className='btn' onClick={inputNum}>9</div>

        <div className='btn orange' onClick={operatorType}>X</div>
        <div className='btn' onClick={inputNum}>4</div>
        <div className='btn' onClick={inputNum}>5</div>
        <div className='btn' onClick={inputNum}>6</div>
        <div className='btn orange' onClick={operatorType}>+</div>

        <div className='btn' onClick={inputNum}>1</div>
        <div className='btn' onClick={inputNum}>2</div>
        <div className='btn' onClick={inputNum}>3</div>
        <div className='btn orange' onClick={operatorType}>-</div>

        <div className='btn zero' onClick={inputNum}>0</div>
        <div className='btn' onClick={inputNum}>.</div>
        <div className='btn' onClick={equals}>=</div>
      </div>
    </div>
  );
};

export default App;
