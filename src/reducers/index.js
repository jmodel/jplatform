import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { dos } from './dos.js';

const rootReducer = combineReducers({
  dos,
  routing: routerReducer
});

export default rootReducer;