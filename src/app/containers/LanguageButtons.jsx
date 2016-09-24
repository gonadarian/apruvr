import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LANGUAGES } from '../helpers/consts';
import { chooseLanguage } from '../actions/index';
import ButtonGroup from '../components/ButtonGroup';

const LanguageButtons = (props) =>
    <div className="col-md-12">
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
