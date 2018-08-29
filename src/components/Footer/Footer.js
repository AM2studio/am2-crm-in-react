import React from 'react';

const Header = props => {
    const { copyright } = props;
    return (
        <footer id="footer" className="footer">
            <div className="container clearfix">
                <p className="copyright">{copyright}</p>
            </div>
        </footer>
    );
};

export default Header;
