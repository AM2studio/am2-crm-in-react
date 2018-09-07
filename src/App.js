import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routers/AppRouter';

import './styles/style.css';

/* browser router at the top ? */
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        );
    }
}

export default App;
