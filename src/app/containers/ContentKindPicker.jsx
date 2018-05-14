/* @flow */
import React, { type Element } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map, reduce } from 'lodash';
import { iif } from '../utils';
import { CONTENTS, contentKindLookup } from '../consts';
import ApruvrTypes from '../types';
import { chooseContent } from '../actions';
import { Picker } from '../components';

const getNameMap = () =>
    reduce(
        CONTENTS,
        (memo, { code, name }) => {
            memo[code] = name;
            return memo;
        },
        {}
    );

const ContentKindPicker = ({ content, onChoose }): Element<*> =>
    <div className="col-xs-2">
        <h2>Content</h2>
        <Picker
            pickable
            states={map(CONTENTS, 'code')}
            current={iif(content, content.code, null)}
            nameMap={getNameMap()}
            onChoose={(code) => onChoose(contentKindLookup(code))} />
    </div>;

ContentKindPicker.propTypes = {
    content:  ApruvrTypes.item,
    onChoose: PropTypes.func.isRequired,
};

export default connect(
    (state) => ({
        content: state.content,
    }),
    (dispatch) => bindActionCreators({
        onChoose: chooseContent,
    }, dispatch)
)(ContentKindPicker);
