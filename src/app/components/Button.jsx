/* @flow */
import React, { type Element } from 'react';

type PropsType = {
    name: string,
    isActive?: boolean,
    onClick: () => void,
};

const Button = ({ name, isActive = false, onClick }: PropsType): Element<*> =>
    <div
        className={isActive
            ? 'btn btn-primary'
            : 'btn btn-default'}
        onClick={onClick}>
        {name}
    </div>;

export default Button;
