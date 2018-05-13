/* @flow */
import React, { type Element } from 'react';
import { map } from 'lodash';
import type { ItemType } from '../flows';
import Button from './Button';

type PropsType = {
    buttons: ItemType[],
    current: ItemType,
    onChoose: (code: string) => void,
};

const ButtonGroup = ({ buttons, current, onChoose }: PropsType): Element<*> =>
    <div className="btn-group">
        {map(
            buttons,
            ({ code, name, note }: ItemType): Element<*> =>
                <Button
                    key={code}
                    name={name + (note
                        ? ` (${note})`
                        : '')}
                    isActive={current !== null && current.code === code}
                    onClick={(): void => onChoose(code)} />
        )}
    </div>;

export default ButtonGroup;
