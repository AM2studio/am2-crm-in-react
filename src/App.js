import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import AppRouter from './routers/AppRouter';

import './styles/style.css';

/* browser router at the top ? */
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Sidebar />
                    <div id="wrapper">
                        <HeaderContainer />
                        <main id="content" className="main">
                            <div className="container">
                                <div className="section">
                                    <AppRouter />
                                </div>
                            </div>
                        </main>
                        <Footer />
                    </div>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
