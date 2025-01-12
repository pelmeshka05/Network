import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SamuraiJSApp from "./App";

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement!);
root.render(<SamuraiJSApp />);



// API
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
