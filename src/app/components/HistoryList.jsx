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
                    <span className="badge badge-light">
                        {moment(record.time).
                            startOf('day').
                            fromNow()}
                    </span>
                    <small className="text-muted">
                        {moment(record.time).
                            format(' dddd, MMMM Do YYYY, h:mm:ss')}
                    </small>
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
