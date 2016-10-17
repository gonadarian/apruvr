import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import Optional from '../components/Optional';

const LoadingSpinner = ({ loading }) =>
    <Optional visible={loading} className="col-xs-12">
        <h2>Loading</h2>
        <Spinner spinnerName="three-bounce" />
    </Optional>;

LoadingSpinner.propTypes = {
    loading:    PropTypes.bool.isRequired,
};

export default connect(
    (state) => ({
        loading: state.loading,
    })
)(LoadingSpinner);
