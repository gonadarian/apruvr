import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isNil } from 'lodash';
import { firebaseSetStatus } from '../actions';
import ApruvrTypes from '../types';
import { StatePicker } from '../components';

const StatusPicker = ({ slug, statuses, language, workflow, user, onChoose }) =>
    <StatePicker
        states={statuses}
        current={workflow && workflow[slug] ? workflow[slug].status : null}
        pickable={!isNil(user)}
        onChoose={(state) => onChoose(
            language.code,
            slug,
            state,
        )} />;

StatusPicker.propTypes = {
    slug:       PropTypes.string.isRequired,
    statuses:   PropTypes.arrayOf(PropTypes.string).isRequired,
    language:   ApruvrTypes.item.isRequired,
    workflow:   PropTypes.object,
    user:       PropTypes.object,
    onChoose:   PropTypes.func.isRequired,
};

export default connect(
    (state, ownProps) => ({
        slug:       ownProps.slug,
        statuses:   ownProps.statuses,
        language:   state.language,
        workflow:   state.workflow,
        user:       state.user,
    }),
    (dispatch) => bindActionCreators({
        onChoose: firebaseSetStatus,
    }, dispatch)
)(StatusPicker);
