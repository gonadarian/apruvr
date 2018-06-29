/* @flow */
import React, { type Element } from 'react';
import { iif } from '../utils';

type Props = {|
    name: string,
    isActive?: boolean,
    onClick: () => void,
|};

export const Button = ({ name, isActive = false, onClick }: Props): Element<'div'> =>
    <div
        className={iif(isActive, 'btn btn-primary', 'btn btn-default')}
        onClick={onClick}>
        {name}
    </div>;

export default Button;
