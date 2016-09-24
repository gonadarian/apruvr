import React from 'react';
import map from 'lodash/map';
import pick from 'lodash/pick';
import Apruvr from '../helpers/apruvr';
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
    choices:    Apruvr.PropTypes.choices.isRequired,
    used:       React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    names:      React.PropTypes.objectOf(React.PropTypes.string).isRequired,
    onChoose:   React.PropTypes.func.isRequired,
};

export default ButtonChoice;
