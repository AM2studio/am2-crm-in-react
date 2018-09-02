import React from 'react';
import Navigation from './Navigation';
import Header from './Header';

export default () => (
    <aside id="sidebar" className="sidebar">
        <Header title="AM2 Admin Theme" subtitle="admin v.2.1." />
        <nav className="main-navigation nano">
            <Navigation />
        </nav>
    </aside>
);
