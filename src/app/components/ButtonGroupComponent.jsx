import React from 'react';

import ButtonComponent from './ButtonComponent.jsx';
import Apruvr from '../helpers/Apruvr.jsx';

import map from 'lodash/map';
import isNil from 'lodash/isNil';

const ButtonGroupComponent = ({ buttons, current, onChoose }) =>
    <div className="btn-group">
        {map(buttons, (button) =>
            <ButtonComponent
                key={button.code}
                name={button.name + (isNil(button.note) ? '' : ' (' + button.note + ')')}
                isActive={current !== null && current.code === button.code}
                onClick={() => onChoose(button)} />
        )}
    </div>;

ButtonGroupComponent.propTypes = {
    buttons:    Apruvr.PropTypes.items.isRequired,
    current:    Apruvr.PropTypes.item,
    onChoose:   React.PropTypes.func.isRequired,
};

export default ButtonGroupComponent;
