import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

const LoadingSpinner = ({ loading }) =>
    loading &&
        <div className="col-xs-12">
            <h2>Loading</h2>
            <Spinner spinnerName="three-bounce" />
        </div>;

LoadingSpinner.propTypes = {
    loading:    PropTypes.bool.isRequired,
};

export default connect(
    (state) => ({
        loading: state.loading,
    })
)(LoadingSpinner);
