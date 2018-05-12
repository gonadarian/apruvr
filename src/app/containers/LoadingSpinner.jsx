/* @flow */
import React from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

interface PropsType {
    loading: boolean,
}

const LoadingSpinner = ({ loading }: PropsType): Element<*> | false =>
    loading &&
        <div className="col-xs-12">
            <h2>Loading</h2>
            <Spinner name="three-bounce" />
        </div>;

export default connect(
    (state: Store): PropsType => ({
        loading: state.loading,
    })
)(LoadingSpinner);
