import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Optional from '../components/Optional';

const Content = ({ visible, children }) =>
    <Optional visible={visible}>
        {children}
    </Optional>;

Content.propTypes = {
    visible:    PropTypes.bool.isRequired,
    children:   PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default connect(
    (state) => ({
        visible: state.nodes !== null,
    })
)(Content);
