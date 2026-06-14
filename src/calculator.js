#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * Supported operations:
 * - add:       addition (a + b)
 * - subtract:  subtraction (a - b)
 * - multiply:  multiplication (a * b)
 * - divide:    division (a / b)
 *
 * Usage examples:
 *   node src/calculator.js add 2 3        # 5
 *   node src/calculator.js subtract 5 2   # 3
 *   node src/calculator.js multiply 4 6   # 24
 *   node src/calculator.js divide 10 2    # 5
 */

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <num1> <num2>');
  console.log('Operations: add, subtract, multiply, divide');
  console.log('Examples:');
  console.log('  node src/calculator.js add 2 3');
  console.log('  node src/calculator.js divide 10 2');
}

function errorExit(message) {
  console.error('Error:', message);
  process.exit(1);
}

function parseNumber(value, name) {
  const n = Number(value);
  if (!isFinite(n)) {
    errorExit(`${name} is not a valid number: ${value}`);
  }
  return n;
}

function main(argv) {
  if (argv.length < 3) {
    printUsage();
    errorExit('Missing arguments');
  }

  const op = argv[0].toLowerCase();
  const a = parseNumber(argv[1], 'First operand');
  const b = parseNumber(argv[2], 'Second operand');

  let result;
  switch (op) {
    case 'add':
      // addition
      result = a + b;
      break;
    case 'subtract':
      // subtraction
      result = a - b;
      break;
    case 'multiply':
      // multiplication
      result = a * b;
      break;
    case 'divide':
      // division (handle division by zero)
      if (b === 0) {
        errorExit('Division by zero is not allowed');
      }
      result = a / b;
      break;
    default:
      printUsage();
      errorExit(`Unsupported operation: ${op}`);
  }

  // Print numeric result (avoid scientific notation for simple cases)
  if (Number.isInteger(result)) {
    console.log(result);
  } else {
    console.log(result);
  }
}

if (require.main === module) {
  // process.argv: [node, script, ...]
  const args = process.argv.slice(2);
  main(args);
}
