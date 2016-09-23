import React from 'react';

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
    visible:    React.PropTypes.bool.isRequired,
    element:    React.PropTypes.string,
    children:   React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
};

export default Optional;
