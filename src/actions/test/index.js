import { createAction } from 'redux-actions';

export const SET_TEST_VALUE = 'testValue/SET';

export const setTestValue = createAction(SET_TEST_VALUE);
