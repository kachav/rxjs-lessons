import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {fetchData} from './actions/dataFetch';
import logo from './logo.svg';
import './App.css';

const App  = () => {
    const dispatch = useDispatch();
    const onLoadData = useCallback(() => {
        dispatch(fetchData());
    }, [dispatch]);

    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to React</h2>
            </div>
            <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            <button type="button" onClick={onLoadData} className="App-load-data">start load data</button>
        </div>
    )
};

export default App;
