import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LANGUAGES } from '../consts';
import { chooseLanguage } from '../actions';
import { ButtonGroup } from '../components';

const LanguageButtons = (props) =>
    <div className="col-xs-10">
        <h2>Languages</h2>
        <ButtonGroup
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
