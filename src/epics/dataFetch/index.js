import {ofType} from 'redux-observable';
import {switchMap, catchError, map} from 'rxjs/operators';
import {from, of} from 'rxjs';

import {FETCH_DATA, fetchDataFulfilled, fetchDataFailed} from '../../actions/dataFetch';

const fetchData = () => fetch('./response.json').then(res => res.json());

export default action$ => action$.pipe(
    ofType(FETCH_DATA),
    switchMap(() => from(fetchData()).pipe(
        map(fetchDataFulfilled),
        catchError(error => of(fetchDataFailed(error))),
    ))
);
