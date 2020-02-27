import React, {useState, useCallback} from 'react';
import {map, debounceTime} from 'rxjs/operators';
import {combineLatest, merge} from 'rxjs';

import logo from './logo.svg';
import './App.css';
import usePropsStream from './hooks/usePropsStream';

const App  = () => {
    const [firstInputValue, setFirstInputValueValue] = useState('');
    const onFirstInputChange = useCallback(({target}) => {
        setFirstInputValueValue(target.value);
    }, []);

    const secondInputProps = usePropsStream((props$, createEventHandler) => {
        const [onChangeValue$, onChange] = createEventHandler();
        const inputValue$ = onChangeValue$.pipe(
            map(({target}) => target.value),
        );
        const propsValue$ = props$.pipe(
            map(({value}) => value),
            debounceTime(1000),
        );

        const value$ = merge(
            inputValue$,
            propsValue$,
        );

        return combineLatest(props$, value$).pipe(
            map(([props, value]) => ({
                ...props,
                onChange,
                value,
            })),
        );
    }, {value: firstInputValue});

    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to React</h2>
            </div>
            <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            <input onChange={onFirstInputChange} value={firstInputValue} />
            <input {...secondInputProps} />
        </div>
    )
};

export default App;
