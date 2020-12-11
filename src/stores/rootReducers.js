import { combineReducers } from 'redux';

// reducers
import app from 'reducers/app.reducer';
import board from 'reducers/board.reducer';
import navbar from 'reducers/navabar.reducer';

const reducers = combineReducers({
  app,
  board,
  navbar
});

export default reducers;
