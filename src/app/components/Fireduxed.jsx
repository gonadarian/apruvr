import { PropTypes, Children, Component } from 'react';

export default class Fireduxed extends Component {
    constructor(props, context) {
        super(props, context);
        this.firebase = props.firebase;
    }

    getChildContext() {
        return {
            firebase: this.firebase,
        };
    }

    render() {
        const { children } = this.props;
        return Children.only(children);
    }
}

Fireduxed.propTypes = {
    firebase: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
};

Fireduxed.childContextTypes = {
    firebase: PropTypes.object.isRequired,
};
