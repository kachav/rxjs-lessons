import {useState, useEffect} from 'react';
import {Subject, BehaviorSubject} from 'rxjs';
import {skip, takeUntil, last} from 'rxjs/operators';
import useConstant from 'use-constant';

const makeCreateEventHandler = props$ => () => {
    const handlerSubject = new Subject();

    return [
        handlerSubject.asObservable().pipe(takeUntil(props$.pipe(last()))),
        value => {
            handlerSubject.next(value);
        },
    ];
};

const usePropsStream = (propsStreamFactory, props) => {
    // стрим, в который мы будем пушить значения props и который можно замаппить
    const props$ = useConstant(() => new BehaviorSubject(props));
    // стрим, который будет принимать смаппленные значения и отдавать их в state
    const mappedProps$ = useConstant(() => new BehaviorSubject(null));

    let values = [];
    if (props !== null && typeof props === 'object') {
        values = Object.values(props);
    } else {
        values = [props];
    }

    // при смене значений пушим их в стрим
    useEffect(() => {
        props$.next(props);
    }, values);

    // пушим изменения в стрим, отдающий данные
    // useConstant потому что подписка и пуш первого значения должны произойти синхронно
    useConstant(() => {
        propsStreamFactory(props$, makeCreateEventHandler(props$.asObservable())).subscribe(val => {
            mappedProps$.next(val);
        });
    });

    // BehaviorSubject может отдавать свое текущее значение,
    // поэтому если функция маппинга вернет стрим, который сможет отдать первые данные синхронно,
    // они появятся как начальные значения стейта
    const [state, setState] = useState(mappedProps$.getValue());

    // пушим в стейт смапленные значения
    useEffect(() => {
        // первое значение стрима уже в стейте, пропускаем его, что бы избежать лишнего ререндера
        mappedProps$.pipe(skip(1)).subscribe(value => {
            setState(value);
        });

        // при уничтожении компонента завершаем вручную созданные стримы
        return () => {
            props$.complete();
            mappedProps$.complete();
        };
    }, []);

    return state;
};

export default usePropsStream;
