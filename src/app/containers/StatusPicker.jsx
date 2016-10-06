import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firebaseSetStatus } from '../actions';
import ApruvrTypes from '../helpers/apruvr';
import StatePicker from '../components/StatePicker';

const StatusPicker = (
    { slug, statuses, language, workflow, onChoose, ...other },
    context,
) =>
    <StatePicker
        states={statuses}
        current={workflow ? workflow[slug] : null}
        onChoose={(state) => onChoose(
            context.firebase.database(),
            language.code,
            slug,
            state,
        )} />;

StatusPicker.contextTypes = {
    firebase:   PropTypes.object,
};

StatusPicker.propTypes = {
    slug:       PropTypes.string.isRequired,
    statuses:   PropTypes.arrayOf(PropTypes.string).isRequired,
    language:   ApruvrTypes.item.isRequired,
    workflow:   PropTypes.object,
    onChoose:   PropTypes.func.isRequired,
};

export default connect(
    (state, ownProps) => ({
        slug:       ownProps.slug,
        statuses:   ownProps.statuses,
        language:   state.language,
        workflow:   state.workflow,
    }),
    (dispatch) => bindActionCreators({
        onChoose: firebaseSetStatus,
    }, dispatch)
)(StatusPicker);
