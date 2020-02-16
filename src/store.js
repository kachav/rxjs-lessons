import {createStore, applyMiddleware, compose} from 'redux';
import {createEpicMiddleware} from 'redux-observable';

import rootReducer from './reducers';
import rootEpic from './epics';

const enhancers = [];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const epicMiddleware = createEpicMiddleware();

const composedEnhancers = compose(
    applyMiddleware(epicMiddleware),
    ...enhancers,
);

const store = createStore(rootReducer, composedEnhancers);

epicMiddleware.run(rootEpic);

export default store;
