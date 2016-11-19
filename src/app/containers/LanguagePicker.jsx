import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import { LANGUAGES } from '../consts';
import ApruvrTypes from '../types';
import { chooseLanguage } from '../actions';
import { Picker } from '../components';

const getNameMap = () =>
    reduce(
        LANGUAGES,
        (memo, { code, name, note }) => {
            memo[code] = name + (note ? ` (${note})` : '');
            return memo;
        },
        {}
    );

const LanguagePicker = ({ language, onChoose }) =>
    <div className="col-xs-2">
        <h2>Language</h2>
        <Picker
            pickable
            states={[...map(LANGUAGES, 'code'), null]}
            current={language ? language.code : null}
            nameMap={getNameMap()}
            onChoose={(code) => onChoose(
                find(LANGUAGES, (item) => item.code === code)
            )} />
    </div>;

LanguagePicker.propTypes = {
    language:   ApruvrTypes.item,
    onChoose:   PropTypes.func.isRequired,
};

export default connect(
    (state) => ({
        language:   state.language,
    }),
    (dispatch) => bindActionCreators({
        onChoose:   chooseLanguage,
    }, dispatch)
)(LanguagePicker);
