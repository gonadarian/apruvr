import React from 'react';

import ButtonComponent from './ButtonComponent';
import Apruvr from '../helpers/apruvr';

import map from 'lodash/map';
import pick from 'lodash/pick';

const ButtonChoiceComponent = ({ choices, used, names, onChoose }) =>
    <div className="btn-group">
        {map(pick(choices, used), (choice, key) =>
            <ButtonComponent
                key={key}
                name={names[key]}
                isActive={choice}
                onClick={() => onChoose(key)} />
        )}
    </div>;

ButtonChoiceComponent.propTypes = {
    choices:    Apruvr.PropTypes.choices.isRequired,
    used:       React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    names:      React.PropTypes.objectOf(React.PropTypes.string).isRequired,
    onChoose:   React.PropTypes.func.isRequired,
};

export default ButtonChoiceComponent;
