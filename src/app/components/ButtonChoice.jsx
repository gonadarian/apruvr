import React from 'react';
import map from 'lodash/map';
import pick from 'lodash/pick';
import Button from './Button';

type PropsType = {
    choices: {[id: string]: boolean},
    used: boolean[],
    names: {[id: string]: string},
    onChoose: () => void
};

const ButtonChoice = ({ choices, used, names, onChoose }: PropsType): ReactElement =>
    <div className="btn-group">
        {map(
            pick(choices, used),
            (choice: boolean, key: string): ReactElement =>
                <Button
                    key={key}
                    name={names[key]}
                    isActive={choice}
                    onClick={(): void => onChoose(key)} />
        )}
    </div>;

export default ButtonChoice;
