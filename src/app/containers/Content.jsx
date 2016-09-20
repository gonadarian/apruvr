import React from 'react';
import { connect } from 'react-redux';

const Content = ({ visible, children }) => {
    if (!visible) {
        return null;
    }
    return (
        <div>
            {children}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        visible:    state.nodes !== null,
    };
}

Content.propTypes = {
    visible:    React.PropTypes.bool.isRequired,
    children:   React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
};

export default connect(mapStateToProps)(Content);
