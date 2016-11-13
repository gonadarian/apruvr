import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const getAgentName = (status, users) => {
    if ('uid' in status && status.uid in users) {
        return users[status.uid].displayName;
    }
    if ('agent' in status) {
        return status.agent.name;
    }
    return '<unknown>';
};

const StatusAgent = ({ slug, workflow, users }) =>
    workflow !== null && slug in workflow &&
        <div className="badge">
            <span className="glyphicon glyphicon-user" />
            {' '}
            {getAgentName(workflow[slug], users)}
        </div>;

StatusAgent.propTypes = {
    slug:       PropTypes.string.isRequired,
    workflow:   PropTypes.object,
    users:      PropTypes.object,
};

export default connect(
    (state, props) => ({
        slug:       props.slug,
        workflow:   state.workflow,
        users:      state.users,
    })
)(StatusAgent);
