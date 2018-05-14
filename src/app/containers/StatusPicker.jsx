/* @flow */
import React, { type Element } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isNil } from 'lodash';
import { setWorkflowStatus } from '../actions';
import { Picker } from '../components';
import type { StatusType } from '../consts';
import type { State, Dispatch, UserType, WorkflowMapType } from '../flows';

interface OwnPropsType {
    slug: string,
    statuses: StatusType[],
}

interface StatePropsType extends OwnPropsType {
    workflow: ?WorkflowMapType,
    user: ?UserType,
}

interface PropsType extends StatePropsType {
    onChoose: (slug: string, status: ?string) => void,
}

const StatusPicker = ({ slug, statuses, workflow, user, onChoose }: PropsType): Element<*> =>
    <Picker
        states={[...statuses, null]}
        current={ workflow && workflow[slug]
            ? workflow[slug].status
            : null
        }
        pickable={!isNil(user)}
        onChoose={(status: ?string): void => onChoose(slug, status)} />;

export default connect(
    (state: State, ownProps: OwnPropsType): StatePropsType => ({
        slug:     ownProps.slug,
        statuses: ownProps.statuses,
        workflow: state.workflow,
        user:     state.user,
    }),
    (dispatch: Dispatch): void => bindActionCreators({
        onChoose: setWorkflowStatus,
    }, dispatch)
)(StatusPicker);
