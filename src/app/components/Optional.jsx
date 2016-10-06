import React, { PropTypes } from 'react';

const Optional = ({ visible, element = 'div', children, ...props }) => {
    if (!visible) {
        return null;
    }
    return (
        <element {...props}>
            {children}
        </element>
    );
};

Optional.propTypes = {
    visible:    PropTypes.bool.isRequired,
    element:    PropTypes.string,
    children:   PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Optional;
