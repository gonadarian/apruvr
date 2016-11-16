import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reduce from 'lodash/reduce';
import { setWorkflowAgent } from '../actions';
import { StatePicker } from '../components';

const getNameMap = (users) =>
    reduce(
        users,
        (memo, user, uid) => {
            memo[uid] = user.displayName;
            return memo;
        },
        {}
    );

const getUIDs = (workflow) => {
    const uids = reduce(
        workflow,
        (memo, content) => {
            if ('uid' in content && !memo.includes(content.uid)) {
                memo.push(content.uid);
            }
            return memo;
        },
        []
    );
    uids.push(null);
    return uids;
};

const AgentPicker = ({ slug, workflow, users, roles, language, onChoose }) => {
    return workflow !== null && slug in workflow &&
        <StatePicker
            states={getUIDs(workflow)}
            current={workflow[slug].uid}
            pickable={roles === 'advocate'}
            nameMap={getNameMap(users)}
            onChoose={(uid) => onChoose(language, slug, uid)} />;
};

AgentPicker.propTypes = {
    slug:       PropTypes.string.isRequired,
    workflow:   PropTypes.object,
    users:      PropTypes.object,
    roles:      PropTypes.string,
    onChoose:   PropTypes.func.isRequired,
};

export default connect(
    (state, props) => ({
        slug:       props.slug,
        workflow:   state.workflow,
        users:      state.users,
        roles:      state.roles,
        language:   state.language.code,
    }),
    (dispatch) => bindActionCreators({
        onChoose: setWorkflowAgent,
    }, dispatch)
)(AgentPicker);
