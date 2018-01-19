import React from 'react';
import ReactDOM from 'react-dom';
import evaluateOp from './operator.js';

class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      value: null,
      displayValue: '0',
      waitingForOperand: false,
      operator: null
    };
    this.operations = {
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '/': (prevValue, nextValue) => prevValue / nextValue,
      '*': (prevValue, nextValue) => prevValue * nextValue,
      '=': (prevValue, nextValue) => nextValue
    };
    this.numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    console.log(e.key);
    let { displayValue } = this.state;
    if (!isNaN(parseInt(e.key))) {
      this.inputDigit(e.key);
    } else if (Object.keys(this.operations).includes(e.key)) {
      this.performOperation(e.key);
    } else if (e.key === 'Enter') {
      this.performOperation('=');
    } else if (e.key === 'Backspace') {
      this.delete();
    } else if (e.key.toLowerCase() === 'c') {
      this.clearDisplay();
    }
  };

  inputDigit = digit => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      });
    } else {
      this.setState({
        displayValue:
          displayValue === '0' ? String(digit) : displayValue + digit
      });
    }
  };

  inputDot = () => {
    let { displayValue } = this.state;
    if (!displayValue.includes('.')) {
      displayValue += '.';
      this.setState({
        displayValue
      });
    }
  };

  toggleSign = () => {
    let { displayValue } = this.state;
    displayValue =
      displayValue.charAt(0) === '-'
        ? displayValue.substr(1)
        : '-' + displayValue;
    this.setState({
      displayValue
    });
  };

  clearDisplay = () => {
    this.setState({
      value: null,
      displayValue: '0',
      operator: null,
      waitingForOperand: false
    });
  };

  inputPercent = () => {
    let { displayValue } = this.state;
    let value = displayValue / 100;
    this.setState({
      displayValue: String(value)
    });
  };

  delete = () => {
    let { displayValue } = this.state;
    let value = displayValue.slice(0, -1);
    if (displayValue.length > 1) {
      this.setState({
        displayValue: String(value)
      });
    } else {
      this.setState({
        displayValue: '0'
      });
    }
  };

  performOperation = nextOperator => {
    const { value, displayValue, operator } = this.state;
    const inputValue = parseFloat(displayValue);

    if (value == null) {
      this.setState({
        value: inputValue
      });
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = this.operations[operator](currentValue, inputValue);

      this.setState({
        value: newValue,
        displayValue: String(newValue)
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    });
  };

  render() {
    const { displayValue } = this.state;
    return (
      <div className="calculator">
        <div className="display">
          <input
            className="display"
            type="text"
            value={this.state.displayValue}
          />
        </div>
        <div className="keys">
          {this.numbers.map(number => (
            <button
              className="calc-key"
              key={number}
              onClick={() => this.inputDigit(number)}
            >
              {number}
            </button>
          ))}
          <button className="calc-key" key="." onClick={this.inputDot}>
            .
          </button>
          <button className="calc-key" key="clear" onClick={this.clearDisplay}>
            ac
          </button>
          <button className="calc-key" key="sign" onClick={this.toggleSign}>
            +-
          </button>
          <button className="calc-key" key="delete" onClick={this.delete}>
            Del
          </button>
          <button
            className="calc-key"
            key="percent"
            onClick={this.inputPercent}
          >
            %
          </button>
          {Object.keys(this.operations).map(operator => (
            <button
              className="calc-key"
              key={operator}
              onClick={() => this.performOperation(operator)}
            >
              {operator}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Calculator;
