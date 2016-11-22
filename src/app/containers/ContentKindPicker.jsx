import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import { CONTENTS } from '../consts';
import ApruvrTypes from '../types';
import { filterContentKind } from '../actions';
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

const ContentKindPicker = ({ content, onChoose }) =>
    <div className="col-xs-2">
        <h2>Content</h2>
        <Picker
            pickable
            states={[...map(CONTENTS, 'code'), null]}
            current={content ? content.code : null}
            nameMap={getNameMap()}
            onChoose={(code) => onChoose(
                find(CONTENTS, (item) => item.code === code)
            )} />
    </div>;

ContentKindPicker.propTypes = {
    content:    ApruvrTypes.item,
    onChoose:   PropTypes.func.isRequired,
};

export default connect(
    (state) => ({
        content:    state.content,
    }),
    (dispatch) => bindActionCreators({
        onChoose:   filterContentKind,
    }, dispatch)
)(ContentKindPicker);
