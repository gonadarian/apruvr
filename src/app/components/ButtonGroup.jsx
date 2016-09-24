import React from 'react';

import Button from './Button';
import Apruvr from '../helpers/apruvr';

import map from 'lodash/map';
import isNil from 'lodash/isNil';

const ButtonGroup = ({ buttons, current, onChoose }) =>
    <div className="btn-group">
        {map(buttons, (button) =>
            <Button
                key={button.code}
                name={button.name + (isNil(button.note) ? '' : ' (' + button.note + ')')}
                isActive={current !== null && current.code === button.code}
                onClick={() => onChoose(button)} />
        )}
    </div>;

ButtonGroup.propTypes = {
    buttons:    Apruvr.PropTypes.items.isRequired,
    current:    Apruvr.PropTypes.item,
    onChoose:   React.PropTypes.func.isRequired,
};

export default ButtonGroup;
