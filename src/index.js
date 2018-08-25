import React from 'react';
import ReactDOM from 'react-dom';

const Index = () => <div>H ello React!</div>;
ReactDOM.render(<Index />, document.getElementById('index'));

if (module.hot) {
    module.hot.accept();
}
