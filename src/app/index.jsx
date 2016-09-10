import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import LanguagePage from './pages/LanguagePage.jsx';

render((
    <Router history={hashHistory}>
        <Route path="/" component={LanguagePage} />
    </Router>
), document.getElementById('app'));
