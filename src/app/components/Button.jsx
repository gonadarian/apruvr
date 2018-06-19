/* @flow */
import React, { type Element } from 'react';
import { iif } from '../utils';

type PropsType = {
    name: string,
    isActive?: boolean,
    onClick: () => void,
};

export const Button = ({ name, isActive = false, onClick }: PropsType): Element<*> =>
    <div
        className={iif(isActive, 'btn btn-primary', 'btn btn-default')}
        onClick={onClick}>
        {name}
    </div>;

export default Button;
