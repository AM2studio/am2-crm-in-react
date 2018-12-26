import React from 'react';
import HeaderContainer from '../components/Header/HeaderContainer';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import ImageLoading from '../components/General/Loading';

const Loading = () => (
    <React.Fragment>
        <Sidebar />
        <div id="wrapper">
            <HeaderContainer />
            <main id="content" className="main">
                <div className="container">
                    <div className="section">
                        <ImageLoading />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    </React.Fragment>
);

export default Loading;
