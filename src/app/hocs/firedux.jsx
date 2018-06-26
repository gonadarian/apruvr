/* @flow */
import React, { Component, type ComponentType } from 'react';
import { importFirebaseDatabase } from '../imports';

type Props = {|
    onFiredux: (snapshot: any) => void,
|};

const firedux = <T: Props>(WrappedComponent: ComponentType<*>, calcPath: (props: T) => string) =>
    class Firedux extends Component<T> {
        componentDidMount () {
            importFirebaseDatabase((firebase) => {
                const path = calcPath(this.props);
                this.ref = firebase.database().ref(path);
                this.ref.on('value', this.props.onFiredux);
            });
        }

        componentWillUnmount () {
            this.ref.off();
        }

        ref: any;

        render () {
            return <WrappedComponent />;
        }
    };

export default firedux;
