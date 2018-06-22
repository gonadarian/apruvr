/* @flow */
import React, { Component, type ComponentType } from 'react';
import { importFirebaseDatabase } from '../imports';

type PropsType = {
    onFire: (snapshot: any) => void,
};

const firedux = (calcPath: (any) => string) => (WrappedComponent: ComponentType<PropsType>) =>
    class HOC extends Component<PropsType> {
        componentDidMount () {
            importFirebaseDatabase((firebase) => {
                const path = calcPath(this.props);
                this.ref = firebase.database().ref(path);
                this.ref.on('value', this.props.onFire);
            });
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
