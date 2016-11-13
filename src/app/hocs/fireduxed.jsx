import React, { PropTypes, Component } from 'react';
import firebase from 'firebase';

const fireduxed = (calcPath) => (WrappedComponent) =>
    class FireduxedHOC extends Component {
        static propTypes = {
            onFire: PropTypes.func.isRequired,
        }

        componentDidMount() {
            const path = calcPath(this.props);
            this.ref = firebase.database().ref(path);
            this.ref.on(
                'value',
                (snapshot) => this.props.onFire(snapshot)
            );
        }

        componentWillUnmount() {
            this.ref.off();
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };

export default fireduxed;
