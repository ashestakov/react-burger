import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import {compose, legacy_createStore as createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./services/reducers/root-reducer";
import {Provider} from "react-redux";

type GlobalWindow = Window & {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

function getCompose() {
    if (window as GlobalWindow) {
        const windowWithCompose = (window! as GlobalWindow);
        if (windowWithCompose.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
            return windowWithCompose.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        }
        return compose;
    }
    return compose;
}

const composeEnhancers = getCompose();

const enhancer = composeEnhancers(applyMiddleware(thunk));

const root = ReactDOM.createRoot(
    document.getElementById('root')!
);

const store = createStore(rootReducer, enhancer);

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
