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

// CLI helpers - keep CLI behavior but throw for testable functions
function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <num1> <num2>');
  console.log('Operations: add, subtract, multiply, divide');
  console.log('Examples:');
  console.log('  node src/calculator.js add 2 3');
  console.log('  node src/calculator.js divide 10 2');
}

function parseNumber(value, name) {
  const n = Number(value);
  if (!isFinite(n)) {
    throw new Error(`${name} is not a valid number: ${value}`);
  }
  return n;
}

function main(argv) {
  if (argv.length < 3) {
    printUsage();
    console.error('Error: Missing arguments');
    process.exit(1);
  }

  const op = argv[0].toLowerCase();
  let a, b;
  try {
    a = parseNumber(argv[1], 'First operand');
    b = parseNumber(argv[2], 'Second operand');
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
module.exports = { add, subtract, multiply, divide };

if (require.main === module) {
  // process.argv: [node, script, ...]
  const args = process.argv.slice(2);
  main(args);
}
