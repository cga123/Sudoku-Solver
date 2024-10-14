const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('Unit Tests', () => {
  suiteSetup(done => {
    solver = new Solver();
    done();
  });

  test('Logic handles a valid puzzle string of 81 characters', done => {
    let validPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isTrue(solver.validate(validPuzzle));
    done();
  });

  test('Logic handles a puzzle string with invalid characters (not 1-9 or.)', done => {
    let invalidPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37a';
    assert.deepEqual(solver.validate(invalidPuzzle), { error: 'Invalid characters in puzzle' });
    done();
  });

  test('Logic handles a puzzle string that is not 81 characters in length', done => {
    let shortPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';
    assert.deepEqual(solver.validate(shortPuzzle), { error: 'Expected puzzle to be 81 characters long' });
    done();
  });

  test('Logic handles a valid row placement', done => {
    let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isTrue(solver.checkRowPlacement(puzzleString, 'A', '2', '3'));
    done();
  });

  test('Logic handles an invalid row placement', done => {
    let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isFalse(solver.checkRowPlacement(puzzleString, 'A', '2', '1'));
    done();
  });

  test('Logic handles a valid column placement', done => {
    let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isTrue(solver.checkColPlacement(puzzleString, 'A', '2', '3'));
    done();
  });

  test('Logic handles an invalid column placement', done => {
    let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isFalse(solver.checkColPlacement(puzzleString, 'A', '2', '9'));
    done();
  });

  test('Logic handles a valid region (3x3 grid) placement', done => {
    let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isTrue(solver.checkRegionPlacement(puzzleString, 'A', '2', '3'));
    done();
  });

  test('Logic handles an invalid region (3x3 grid) placement', done => {
    let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isFalse(solver.checkRegionPlacement(puzzleString, 'A', '2', '1'));
    done();
  });

  test('Valid puzzle strings pass the solver', done => {
    let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isString(solver.solve(puzzleString));
    done();
  });

  test('Invalid puzzle strings fail the solver', done => {
    let puzzleString = '115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isFalse(solver.solve(puzzleString));
    done();
  });

  test('Solver returns the expected solution for an incomplete puzzle', done => {
    let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    let solution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
    assert.equal(solver.solve(puzzleString), solution);
    done();
  });
});
