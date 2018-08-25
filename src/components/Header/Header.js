import React from 'react';

const Header = props => {
    const { naslov } = props;
    return <p>Ovo je {naslov} izbor</p>;
};

export default Header;
