/* @flow */
import React from 'react';
import { iif } from '../utils';

type PropsType = {
    id: string,
    onExpand: (id: ?string) => void,
};

type StateType = {
    isExpanded: boolean,
};

class DetailsButton extends React.Component<PropsType, StateType> {
    state = {
        isExpanded: false,
    }

    expand () {
        const { onExpand, id } = this.props;
        onExpand(iif(this.state.isExpanded, null, id));
        this.setState((prevState) => ({
            isExpanded: !prevState.isExpanded,
        }));
    }

    render () {
        const { isExpanded } = this.state;
        return <span className={`fas fa-angle-double-${iif(isExpanded, 'up', 'down')}`}
            onClick={(): void => this.expand()} />;
    }
}

export default DetailsButton;
