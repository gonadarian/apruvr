import React, { PropTypes } from 'react';

const Button = ({ name, isActive = false, onClick }) =>
    <div
        className={'btn ' + (isActive ? 'btn-primary' : 'btn-default')}
        onClick={onClick}>
            {name}
    </div>;

Button.propTypes = {
    name:       PropTypes.string.isRequired,
    isActive:   PropTypes.bool,
    onClick:    PropTypes.func.isRequired,
};

export default Button;
