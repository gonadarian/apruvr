/* @flow */
import React, { Component, type ComponentType } from 'react';
import firebase from '@firebase/app';
import '@firebase/database';

type PropsType = {
    onFire: (snapshot: any) => void,
};

const firedux = (calcPath: (any) => string) => (WrappedComponent: ComponentType<PropsType>) =>
    class HOC extends Component<PropsType> {
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
