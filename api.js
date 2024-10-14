'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;
      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' });
      }
  
      const validationResult = solver.validate(puzzle);
      if (validationResult !== true) {
        return res.json({ error: validationResult.error });
      }
  
      if (!/^[A-I][1-9]$/.test(coordinate)) {
        return res.json({ error: 'Invalid coordinate' });
      }
  
      if (!/^[1-9]$/.test(value)) {
        return res.json({ error: 'Invalid value' });
      }
  
      const row = coordinate[0];
      const column = parseInt(coordinate[1]);
  
      // Check if the value at the coordinate is the same as the submitted value
      const index = (row.charCodeAt(0) - 65) * 9 + (column - 1);
      if (puzzle[index] === value) {
        return res.json({ valid: true });
      }
  
      let conflicts = [];
      const rowCheck = solver.checkRowPlacement(puzzle, row, column, value);
      const colCheck = solver.checkColPlacement(puzzle, row, column, value);
      const regionCheck = solver.checkRegionPlacement(puzzle, row, column, value);
  
      if (!rowCheck) {
        conflicts.push('row');
      }
      if (!colCheck) {
        conflicts.push('column');
      }
      if (!regionCheck) {
        conflicts.push('region');
      }
  
      if (conflicts.length === 0) {
        res.json({ valid: true });
      } else {
        res.json({ valid: false, conflict: conflicts });
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;
      if (!puzzle) {
        return res.json({ error: 'Required field missing' });
      }
      
      const validationResult = solver.validate(puzzle);
      if (validationResult !== true) {
        return res.json({ error: validationResult.error });
      }
      
      const solution = solver.solve(puzzle);
      if (solution === false) {
        return res.json({ error: 'Puzzle cannot be solved' });
      }
      
      res.json({ solution });
    });
};
