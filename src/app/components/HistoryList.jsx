/* @flow */
import React, { Fragment, type Element } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import moment from 'moment';
import type { State, UserMapType, HistoryType } from '../flows';

interface StatePropsType {
    users: ?UserMapType,
}
interface PropsType extends StatePropsType {
    history: HistoryType;
}

const HistoryList = ({ users, history }: PropsType): Element<*> =>
    <Fragment>
        {map(history.timeline, (record) =>
            <tr key={record.time}>
                <td>
                    {moment(record.time).
                        startOf('day').
                        fromNow()}
                </td>
                <td>
                    <span className="badge badge-primary">
                        {record.uid && users
                            ? users[record.uid].displayName
                            : '...'}
                    </span>
                </td>
                <td>
                    <span className="badge badge-primary">
                        {record.status}
                    </span>
                </td>
                <td colSpan="3" />
            </tr>
        ).reverse()}
    </Fragment>;

export default connect(
    (state: State): StatePropsType => ({
        users: state.users,
    }),
)(HistoryList);
