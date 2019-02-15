import React from 'react';
import HeaderContainer from '../components/Header/HeaderContainer';
import Sidebar from '../components/Sidebar/Sidebar';
import ImageLoading from '../components/General/Loading';

const Loading = () => (
    <React.Fragment>
        <Sidebar />
        <div id="wrapper">
            <HeaderContainer />
            <main id="content" className="main">
                <section className="section">
                    <div className="container is-fluid">
                        <ImageLoading />
                    </div>
                </section>
            </main>
        </div>
    </React.Fragment>
);

export default Loading;
