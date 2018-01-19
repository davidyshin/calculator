const evaluateOp = (num1, num2, op) => {
  switch (op) {
    case '+':
      return parseInt(num1) + parseInt(num2);
      break;
    case '-':
      return parseInt(num1) - parseInt(num2);
      break;
    case '*':
      return parseInt(num1) * parseInt(num2);
      break;
    case '/':
      return parseInt(num1) / parseInt(num2);
      break;
  }
};

export default evaluateOp
