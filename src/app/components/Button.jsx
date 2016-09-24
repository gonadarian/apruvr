import React from 'react';

const Button = ({ name, isActive = false, onClick }) =>
    <div
        className={'btn ' + (isActive ? 'btn-primary' : 'btn-default')}
        onClick={onClick}>
            {name}
    </div>;

Button.propTypes = {
    name:       React.PropTypes.string.isRequired,
    isActive:   React.PropTypes.bool,
    onClick:    React.PropTypes.func.isRequired,
};

export default Button;
