/* @flow */
import React, { Component, type ComponentType } from 'react';
import PropTypes from 'prop-types';
import firebase from '@firebase/app';
import '@firebase/database';

type PropsType = {
    onFire: (snapshot: any) => void,
};

const firedux = <T: PropsType>(calcPath: (any) => string) => (WrappedComponent: ComponentType<T>) =>
    class HOC extends Component<T> {
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

        ref: any;

        render () {
            return <WrappedComponent {...this.props} />;
        }
    };

export default firedux;
