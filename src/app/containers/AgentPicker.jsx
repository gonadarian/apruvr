/* @flow */
import React from 'react';
import type { Element } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduce } from 'lodash';
import type { UserType, UserMapType, WorkflowType, WorkflowMapType } from '../flows';
import { setWorkflowAgent } from '../actions';
import { Picker } from '../components';

type NameMapType = {[uid: string]: string};

const getNameMap = (users: UserMapType): NameMapType =>
    reduce(
        users,
        (memo: NameMapType, user: UserType, uid: string): NameMapType => {
            memo[uid] = user.displayName;
            return memo;
        },
        {}
    );

const getUIDs = (workflows: WorkflowMapType): string[] =>
    reduce(
        workflows,
        (memo: string[], { uid }: WorkflowType): string[] => {
            if (uid && !memo.includes(uid)) {
                memo.push(uid);
            }
            return memo;
        },
        []
    );

interface OwnPropsType {
    slug: string,
}

interface StatePropsType extends OwnPropsType {
    workflow: WorkflowMapType,
    users: UserMapType,
    roles: string[],
}

interface PropsType extends StatePropsType {
    onChoose: (uid: ?string) => void,
}

const AgentPicker = ({ slug, workflow, users, roles, onChoose }: PropsType): Element<*> | false =>
    workflow !== null && slug in workflow &&
        <Picker
            states={[...getUIDs(workflow), null]}
            current={workflow[slug].uid}
            pickable={roles === 'advocate'}
            nameMap={getNameMap(users)}
            onChoose={(uid: ?string): void => onChoose(slug, uid)} />;

export default connect(
    (state: Store, props: OwnPropsType): StatePropsType => ({
        slug:       props.slug,
        workflow:   state.workflow,
        users:      state.users,
        roles:      state.roles,
    }),
    (dispatch: Dispatch): void => bindActionCreators({
        onChoose: setWorkflowAgent,
    }, dispatch)
)(AgentPicker);
