import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isNil from 'lodash/isNil';
import { setWorkflowStatus } from '../actions';
import { Picker } from '../components';

const StatusPicker = ({ slug, statuses, workflow, user, onChoose }) =>
    <Picker
        states={[...statuses, null]}
        current={workflow && workflow[slug] ? workflow[slug].status : null}
        pickable={!isNil(user)}
        onChoose={(status) => onChoose(slug, status)} />;

StatusPicker.propTypes = {
    slug:       PropTypes.string.isRequired,
    statuses:   PropTypes.arrayOf(PropTypes.string).isRequired,
    workflow:   PropTypes.object,
    user:       PropTypes.object,
    onChoose:   PropTypes.func.isRequired,
};

export default connect(
    (state, ownProps) => ({
        slug:       ownProps.slug,
        statuses:   ownProps.statuses,
        workflow:   state.workflow,
        user:       state.user,
    }),
    (dispatch) => bindActionCreators({
        onChoose: setWorkflowStatus,
    }, dispatch)
)(StatusPicker);
