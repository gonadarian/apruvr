/* @flow */
import React, { type Element } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduce, includes } from 'lodash';
import { setWorkflowAgent } from '../actions';
import { Picker } from '../components';
import type {
    State, Dispatch,
    UserType, UserMapType, WorkflowType, WorkflowMapType,
} from '../flows';

type NameMap = {[uid: string]: string};

const getNameMap = (users: UserMapType): NameMap =>
    reduce(
        users,
        (memo: NameMap, user: UserType, uid: string): NameMap => {
            memo[uid] = user.displayName;
            return memo;
        },
        {}
    );

const getUIDs = (workflows: WorkflowMapType): string[] =>
    reduce(
        workflows,
        (memo: string[], { uid }: WorkflowType): string[] => {
            if (uid && !includes(memo, uid)) {
                memo.push(uid);
            }
            return memo;
        },
        []
    );

type OwnProps = {|
    slug: string,
|};

type StateProps = {|
    workflow: ?WorkflowMapType,
    users: ?UserMapType,
    roles: ?string,
|};

type PropsType = {
    ...OwnProps,
    ...StateProps,
    onChoose: (slug: string, uid: ?string) => void,
};

const AgentPicker = ({ slug, workflow, users, roles, onChoose }: PropsType): ?Element<*> =>
    workflow && slug in workflow
        ? <Picker
            states={[...getUIDs(workflow), null]}
            current={workflow[slug].uid}
            pickable={roles === 'advocate'}
            nameMap={users
                ? getNameMap(users)
                : null
            }
            onChoose={(uid: ?string): void => onChoose(slug, uid)} />
        : null;

export default connect(
    (state: State): StateProps => ({
        workflow: state.workflow,
        users:    state.users,
        roles:    state.roles,
    }),
    (dispatch: Dispatch) => bindActionCreators({
        onChoose: setWorkflowAgent,
    }, dispatch)
)(AgentPicker);
