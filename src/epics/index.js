import {combineEpics} from 'redux-observable';

import dataFetchEpic from './dataFetch';

export default combineEpics(dataFetchEpic);
