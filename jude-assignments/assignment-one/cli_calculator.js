// a simple CLI calculator
// Syntax means: write the Node.js command, then the first number,
// then the math sign, then the second number.
// Example: node cli_calculator.js 10 + 5

const args = process.argv.slice(2);

if (args.length !== 3) {
  console.log('Usage: node cli_calculator.js <number> <operator> <number>');
  console.log('Example: node cli_calculator.js 10 + 5');
  process.exit(1);
}

const num1 = Number(args[0]);
const operator = args[1];
const num2 = Number(args[2]);

if (isNaN(num1) || isNaN(num2)) {
  console.log('Please enter valid numbers only.');
  process.exit(1);
}

let result;

if (operator === '+') {
  result = num1 + num2;
} else if (operator === '-') {
  result = num1 - num2;
} else if (operator === '*') {
  result = num1 * num2;
} else if (operator === '/') {
  if (num2 === 0) {
    console.log('Cannot divide by zero.');
    process.exit(1);
  }
  result = num1 / num2;
} else {
  console.log('Invalid operator. Use +, -, *, or /.');
  process.exit(1);
}

console.log('Result: ' + result);
