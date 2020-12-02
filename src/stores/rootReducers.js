import { combineReducers } from 'redux';

// reducers
import app from 'reducers/app.reducer';
import board from 'reducers/board.reducer';

const reducers = combineReducers({
  app,
  board
});

export default reducers;
