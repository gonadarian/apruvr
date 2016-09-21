import React from 'react';

const ButtonComponent = ({ name, isActive = false, onClick }) =>
    <div
        className={'btn ' + (isActive ? 'btn-primary' : 'btn-default')}
        onClick={onClick}>
            {name}
    </div>;

ButtonComponent.propTypes = {
    name:       React.PropTypes.string.isRequired,
    isActive:   React.PropTypes.bool,
    onClick:    React.PropTypes.func.isRequired,
};

export default ButtonComponent;
