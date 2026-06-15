#!/usr/bin/env node

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

// New required operations
function mod(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero');
  }
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function sqrt(n) {
  if (n < 0) {
    throw new Error('Cannot take square root of negative number');
  }
  return Math.sqrt(n);
}

// CLI (keeps compatibility with the exercise)
function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <num1> <num2?>');
  console.log('Operations: add, subtract, multiply, divide, mod, pow, sqrt');
}

function parseNumber(value, name) {
  const n = Number(value);
  if (!isFinite(n)) {
    throw new Error(`${name} is not a valid number: ${value}`);
  }
  return n;
}

function main(argv) {
  if (argv.length < 2) {
    printUsage();
    process.exit(1);
  }

  const op = argv[0].toLowerCase();
  let a, b;

  try {
    if (op === 'sqrt') {
      if (argv.length < 2) throw new Error('Missing operand');
      a = parseNumber(argv[1], 'Operand');
    } else {
      if (argv.length < 3) throw new Error('Missing operands');
      a = parseNumber(argv[1], 'First operand');
      b = parseNumber(argv[2], 'Second operand');
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }

  let result;

  try {
    switch (op) {
      case 'add':
        result = add(a, b);
        break;
      case 'subtract':
        result = subtract(a, b);
        break;
      case 'multiply':
        result = multiply(a, b);
        break;
      case 'divide':
        result = divide(a, b);
        break;
      case 'mod':
      case 'modulo':
        result = mod(a, b);
        break;
      case 'pow':
      case 'power':
        result = power(a, b);
        break;
      case 'sqrt':
        result = sqrt(a);
        break;
      default:
        printUsage();
        console.error(`Unsupported operation: ${op}`);
        process.exit(1);
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }

  console.log(result);
}

// Export functions (include both original names and requested aliases)
const modulo = mod;
const squareRoot = sqrt;

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  // keep original short names for backward compatibility
  mod,
  sqrt,
  // expose requested names
  modulo,
  power,
  squareRoot
};

if (require.main === module) {
  const args = process.argv.slice(2);
  main(args);
}

