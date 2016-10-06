import React, { PropTypes } from 'react';
import map from 'lodash/map';
import pick from 'lodash/pick';
import ApruvrTypes from '../helpers/apruvr';
import Button from './Button';

const ButtonChoice = ({ choices, used, names, onChoose }) =>
    <div className="btn-group">
        {map(pick(choices, used), (choice, key) =>
            <Button
                key={key}
                name={names[key]}
                isActive={choice}
                onClick={() => onChoose(key)} />
        )}
    </div>;

ButtonChoice.propTypes = {
    choices:    ApruvrTypes.choices.isRequired,
    used:       PropTypes.arrayOf(PropTypes.string).isRequired,
    names:      PropTypes.objectOf(PropTypes.string).isRequired,
    onChoose:   PropTypes.func.isRequired,
};

export default ButtonChoice;
