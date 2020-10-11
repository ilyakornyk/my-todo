import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Application from './app';
import UserProvider from "./context/userProvider";

const App = () => (
    <UserProvider >
        <Application />
    </UserProvider>

)

ReactDOM.render(< App />, document.getElementById('root'));
