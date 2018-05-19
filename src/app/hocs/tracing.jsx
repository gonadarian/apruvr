/* @flow */
import React, { type ComponentType, Component } from 'react';

const MARKER = '>>>>>>>>>>';

const tracing = (name: string) => (WrappedComponent: ComponentType<{}>) =>
    class TracingHOC extends Component<{}, {}> {
        constructor (props: {}) {
            super(props);
            this.state = {};
            // eslint-disable-next-line no-console
            console.log(`${MARKER} [${name}.constructor]`, props);
        }

        static getDerivedStateFromProps (nextProps: {}, prevState: {}) {
            // eslint-disable-next-line no-console
            console.log(`${MARKER} [${name}#getDerivedStateFromProps]`, nextProps, prevState);
            return prevState;
        }

        componentDidMount () {
            // eslint-disable-next-line no-console
            console.log(`${MARKER} [${name}.componentDidMount]`, this.props);
        }

        shouldComponentUpdate (nextProps: {}, nextState: {}) {
            // eslint-disable-next-line no-console
            console.log(`${MARKER} [${name}.shouldComponentUpdate]`, nextProps, nextState);
            return true;
        }

        getSnapshotBeforeUpdate () {
            // eslint-disable-next-line no-console
            console.log(`${MARKER} [${name}.getSnapshotBeforeUpdate]`);
            return null;
        }

        componentDidUpdate (prevProps: {}, prevState: {}, snapshot: {}) {
            // eslint-disable-next-line no-console
            console.log(`${MARKER} [${name}.componentDidUpdate]`, prevProps, prevState, snapshot);
        }

        render () {
            return <WrappedComponent {...this.props} />;
        }
    };

export default tracing;
