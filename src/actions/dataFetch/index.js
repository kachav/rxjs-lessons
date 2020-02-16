import { createAction } from 'redux-actions';

export const FETCH_DATA = 'data/FETCH';
export const FETCH_DATA_FULFILLED = 'data/FETCH_FULFILLED';
export const FETCH_DATA_FAILED = 'data/FETCH_FAILED';

export const fetchData = createAction(FETCH_DATA);
export const fetchDataFulfilled = createAction(FETCH_DATA_FULFILLED);
export const fetchDataFailed = createAction(FETCH_DATA_FAILED);
