import React, { PropTypes } from 'react';
import map from 'lodash/map';
import isNil from 'lodash/isNil';
import ApruvrTypes from '../types';
import Button from './Button';

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
    buttons:    ApruvrTypes.items.isRequired,
    current:    ApruvrTypes.item,
    onChoose:   PropTypes.func.isRequired,
};

export default ButtonGroup;
