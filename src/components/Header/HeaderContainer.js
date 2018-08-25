import React, { Component } from 'react';
import Header from './Header';

class HeaderContainer extends Component {
    constructor() {
        super();
        this.state = {
            opcije: ['prvi', 'drugi', 'treci']
        };
    }

    render() {
        const { opcije } = this.state;
        return (
            <div>
                {opcije.map(opcija => (
                    <Header key={opcija} naslov={opcija} />
                ))}
            </div>
        );
    }
}

export default HeaderContainer;
