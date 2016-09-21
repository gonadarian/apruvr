import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { chooseLanguage } from '../actions/index';
import { LANGUAGES } from '../helpers/consts';

import ButtonGroupComponent from '../components/ButtonGroupComponent';

const LanguageButtons = (props) =>
    <div className="col-md-12">
        <h2>Languages</h2>
        <ButtonGroupComponent
            {...props} />
    </div>;

export default connect(
    (state) => ({
        buttons:    LANGUAGES,
        current:    state.language,
    }),
    (dispatch) => bindActionCreators({
        onChoose:   chooseLanguage,
    }, dispatch)
)(LanguageButtons);
