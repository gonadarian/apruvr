import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import Optional from '../components/Optional';

const LoadingSpinner = ({ loading }) =>
    <Optional visible={loading} className="col-md-12">
        <h2>Loading</h2>
        <Spinner spinnerName="three-bounce" />
    </Optional>;

LoadingSpinner.propTypes = {
    loading:    React.PropTypes.bool.isRequired,
};

export default connect(
    (state) => ({
        loading: state.loading,
    })
)(LoadingSpinner);
