/* @flow */
import React from 'react';
import type { Element } from 'react';

type PropsType = {
    name: string,
    isActive?: boolean,
    onClick: () => void,
};

const Button = ({ name, isActive = false, onClick }: PropsType): Element<*> =>
    <div
        className={'btn ' + (isActive ? 'btn-primary' : 'btn-default')}
        onClick={onClick}>
            {name}
    </div>;

export default Button;
