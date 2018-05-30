/* @flow */
import React, { type Element } from 'react';

type PropsType = {
    onPageExpand: (fullExpand: boolean) => void,
};

const PageExpander = ({ onPageExpand }: PropsType): Element<'tr'> =>
    <tr>
        <td colSpan="6">
            <a className="btn btn-primary"
                onClick={(): void => onPageExpand(false)}>
                {'Show more '}
                <i className="far fa-arrow-alt-circle-down" />
            </a>
            {' '}
            <a className="btn btn-primary"
                onClick={(): void => onPageExpand(true)}>
                {'Show all '}
                <i className="fas fa-arrow-alt-circle-down" />
            </a>
        </td>
    </tr>;

export default PageExpander;
