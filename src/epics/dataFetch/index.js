import {ofType} from 'redux-observable';
import {switchMap, catchError, map, retry, retryWhen, delay, take} from 'rxjs/operators';
import {from, of} from 'rxjs';

import {FETCH_DATA, fetchDataFulfilled, fetchDataFailed} from '../../actions/dataFetch';

const fetchData = () => fetch('./response2.json').then(res => res.json());

const makeApi = (apiMethod) => (...args) => of(args).pipe(
    switchMap(args => from(apiMethod(args))),
);

const fetchApi = makeApi(fetchData);

export default action$ => action$.pipe(
    ofType(FETCH_DATA),
    switchMap(() => fetchApi().pipe(
        retryWhen(errors$ => errors$.pipe(
            delay(500),
            take(5),
        )),
        map(fetchDataFulfilled),
        catchError(error => of(fetchDataFailed(error))),
    ))
);
