/* @flow */
import React from 'react';
import type { Element } from 'react';
import map from 'lodash/map';
import isNil from 'lodash/isNil';
import type ItemType from '../flows';
import Button from './Button';

type PropsType = {
    buttons: ItemType[],
    current: ItemType,
    onChoose: (button: ItemType) => void,
};

const ButtonGroup = ({ buttons, current, onChoose }: PropsType): Element<*> =>
    <div className="btn-group">
        {map(
            buttons,
            (button: ItemType): Element<*> =>
                <Button
                    key={button.code}
                    name={button.name + (isNil(button.note) ? '' : ' (' + button.note + ')')}
                    isActive={current !== null && current.code === button.code}
                    onClick={(): void => onChoose(button.code)} />
        )}
    </div>;

export default ButtonGroup;
