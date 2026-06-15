#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * Supported operations (exported for testing):
 * - add:       addition (a + b)
 * - subtract:  subtraction (a - b)
 * - multiply:  multiplication (a * b)
 * - divide:    division (a / b)
 *
 * The file also provides a small CLI wrapper so the tool can be executed
 * directly (node src/calculator.js <operation> <num1> <num2>).
 */

// Pure functions for arithmetic (easy to test)
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

// New operations requested in the latest feature issue:
// - modulo: remainder of a divided by b
// - power: base raised to exponent
// - squareRoot: square root of n (error on negative inputs)
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero');
  }
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot take square root of negative number');
  }
  return Math.sqrt(n);
}

// CLI helpers - keep CLI behavior but throw for testable functions
function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <num1> <num2?>');
  console.log('Operations: add, subtract, multiply, divide, mod, pow, sqrt');
  console.log('Examples:');
  console.log('  node src/calculator.js add 2 3');
  console.log('  node src/calculator.js divide 10 2');
  console.log('  node src/calculator.js mod 10 3');
  console.log('  node src/calculator.js pow 2 8');
  console.log('  node src/calculator.js sqrt 16');
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
    console.error('Error: Missing arguments');
    process.exit(1);
  }

  const op = argv[0].toLowerCase();
  let a, b;

  try {
    if (op === 'sqrt' || op === 'sqr' || op === 'sqrt') {
      // sqrt expects a single operand
      if (argv.length < 2) {
        throw new Error('Missing operand for sqrt');
      }
      a = parseNumber(argv[1], 'Operand');
    } else {
      // all other operations expect two operands
      if (argv.length < 3) {
        throw new Error('Missing operands');
      }
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
        result = modulo(a, b);
        break;
      case 'pow':
      case 'power':
        result = power(a, b);
        break;
      case 'sqrt':
        result = squareRoot(a);
        break;
      default:
        printUsage();
        console.error(`Error: Unsupported operation: ${op}`);
        process.exit(1);
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }

  console.log(result);
}

// Export functions for unit testing
module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };

if (require.main === module) {
  // process.argv: [node, script, ...]
  const args = process.argv.slice(2);
  main(args);
}
