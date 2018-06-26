/* @flow */
import React, { Component, type ComponentType } from 'react';
import { importFirebaseDatabase } from '../imports';

type Props = {
    onFiredux: (snapshot: any) => void,
};

const firedux = <T: {}>(
    WrappedComponent: ComponentType<T>, calcPath: (props: T) => string
): ComponentType<T & Props> =>

        class Firedux extends Component<T & Props> {
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
                const { onFiredux, ...others } = this.props;
                return <WrappedComponent {...others} />;
            }
        };

export default firedux;
