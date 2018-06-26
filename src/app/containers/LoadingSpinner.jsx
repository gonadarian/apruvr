/* @flow */
import React, { type Element } from 'react';
import { connect } from 'react-redux';
import type { State } from '../flows';

type Props = {|
    loading: boolean,
|};

const LoadingSpinner = ({ loading }: Props): Element<*> | false =>
    loading &&
        <div className="col-xs-12">
            <h3>Loading</h3>
            <i className="fas fa-spinner fa-spin fa-4x" />
        </div>;

export default connect(
    (state: State): Props => ({
        loading: state.loading,
    })
)(LoadingSpinner);
