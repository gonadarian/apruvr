/* @flow */
import React, { Fragment, type Element } from 'react';
import { map } from 'lodash';
import type { HistoryType } from '../flows';

interface PropsType {
    history: HistoryType;
}

const HistoryList = ({ history }: PropsType): Element<*> =>
    <Fragment>
        {map(history.timeline, (record) =>
            <tr key={record.time}>
                <td>Status: {record.status} ...</td>
                <td>Time: {record.time} ...</td>
                <td>User: {record.uid} ...</td>
                <td colSpan="3">...</td>
            </tr>
        )}
    </Fragment>;

export default HistoryList;
