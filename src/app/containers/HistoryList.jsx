/* @flow */
import React, { Fragment, type Element } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import moment from 'moment';
import type { State, UserMapType, HistoryType } from '../flows';

interface PropsType {
    history: ?HistoryType;
    users: ?UserMapType,
}

const HistoryList = ({ users, history }: PropsType): Element<*> =>
    <Fragment>
        {history && history.timeline
            ? map(history.timeline, (record) =>
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
            ).reverse()
            : <tr key={'empty'}>
                <td>
                    <small className="text-muted">
                        No entries in history found...
                    </small>
                </td>
            </tr>}
    </Fragment>;

export default connect(
    (state: State): PropsType => ({
        history: state.history,
        users:   state.users,
    }),
)(HistoryList);
