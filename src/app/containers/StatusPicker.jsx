/* @flow */
import React, { type Element } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isNil } from 'lodash';
import { setWorkflowStatus } from '../actions';
import { Picker } from '../components';
import type { StatusType } from '../consts';
import type { State, Dispatch, UserType, WorkflowMapType } from '../flows';

type OwnProps = {|
    slug: string,
    statuses: StatusType[],
|};

type StateProps = {|
    workflow: ?WorkflowMapType,
    user: ?UserType,
|};

type Props = {|
    ...OwnProps,
    ...StateProps,
    onChoose: (slug: string, status: ?string) => void,
|};

const StatusPicker = ({ slug, statuses, workflow, user, onChoose }: Props): Element<*> =>
    <Picker
        states={[...statuses, null]}
        current={ workflow && workflow[slug]
            ? workflow[slug].status
            : null
        }
        pickable={!isNil(user)}
        onChoose={(status: ?string): void => onChoose(slug, status)} />;

export default connect(
    (state: State): StateProps => ({
        workflow: state.workflow,
        user:     state.user,
    }),
    (dispatch: Dispatch) => bindActionCreators({
        onChoose: setWorkflowStatus,
    }, dispatch)
)(StatusPicker);
