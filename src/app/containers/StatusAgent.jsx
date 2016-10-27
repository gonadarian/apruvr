import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const StatusAgent = ({ slug, workflow }) =>
    workflow !== null && slug in workflow &&
        <div className="badge">
            <span className="glyphicon glyphicon-user" />
            {' '}
            {workflow[slug].agent.name}
        </div>;

StatusAgent.propTypes = {
    slug:       PropTypes.string.isRequired,
    workflow:   PropTypes.object,
};

export default connect(
    (state, props) => ({
        slug:       props.slug,
        workflow:   state.workflow,
    })
)(StatusAgent);
