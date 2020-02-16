import {handleActions, combineActions} from 'redux-actions';

import {SET_TEST_VALUE} from '../../actions/test';
import {FETCH_DATA_FULFILLED} from '../../actions/dataFetch';

export const test = handleActions({
    [combineActions(SET_TEST_VALUE, FETCH_DATA_FULFILLED)]: (state, {payload}) => payload,
}, null);
