import React, { Component } from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import FooterContainer from './components/Footer/FooterContainer';
import Sidebar from './components/Sidebar/Sidebar';
import AppRouter from './routers/AppRouter';

import './styles/style.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Sidebar />
                <div id="wrapper">
                    <HeaderContainer />
                    <AppRouter />
                    <FooterContainer />
                </div>
            </div>
        );
    }
}

export default App;
