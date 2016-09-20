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

function mapStateToProps(state) {
    return {
        buttons:    LANGUAGES,
        current:    state.language,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChoose: chooseLanguage,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageButtons);
