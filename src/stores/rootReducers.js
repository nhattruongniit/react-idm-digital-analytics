import { combineReducers } from 'redux';

// reducers
import app from 'reducers/app.reducer';

const reducers = combineReducers({
  app,
});

export default reducers;
