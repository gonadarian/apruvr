/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

const firedux = (calcPath) => (WrappedComponent) =>
    class FireduxHOC extends Component {
        static propTypes = {
            onFire: PropTypes.func.isRequired,
        }

        componentDidMount () {
            const path = calcPath(this.props);
            this.ref = firebase.database().ref(path);
            this.ref.on('value', this.props.onFire);
        }

        componentWillUnmount () {
            this.ref.off();
        }

        render () {
            return <WrappedComponent {...this.props} />;
        }
    };

export default firedux;
