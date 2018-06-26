/* @flow */
import React, { type Element } from 'react';
import { map, pick } from 'lodash';
import Button from './Button';

type Props = {|
    choices: {[id: string]: boolean},
    used: string[],
    names: {[id: string]: string},
    onChoose: (key: string) => void,
|};

export const ButtonChoice = ({ choices, used, names, onChoose }: Props): Element<*> =>
    <div className="btn-group">
        {map(
            pick(choices, used),
            (choice, key): Element<*> =>
                <Button
                    key={key}
                    name={names[key]}
                    isActive={choice}
                    onClick={(): void => onChoose(key)} />
        )}
    </div>;

export default ButtonChoice;
