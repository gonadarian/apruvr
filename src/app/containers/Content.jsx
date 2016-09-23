import React from 'react';
import { connect } from 'react-redux';
import Optional from '../components/Optional';

const Content = ({ visible, children }) =>
    <Optional visible={visible}>
        {children}
    </Optional>;

Content.propTypes = {
    visible:    React.PropTypes.bool.isRequired,
    children:   React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
};

export default connect(
    (state) => ({
        visible: state.nodes !== null,
    })
)(Content);
