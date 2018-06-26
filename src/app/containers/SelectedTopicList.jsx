/* @flow */
import React, { type Element } from 'react';
import { withRouter, type RouterHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { chooseTopic } from '../actions';
import { getTopicTree } from '../selectors';
import { TopicTree, type TopicTreeProps } from '../components';
import type { State, Dispatch } from '../flows';

type OwnProps = {|
    history: RouterHistory,
|};

const SelectedTopicList = (props: TopicTreeProps): Element<*> =>
    <div className="col-xs-12 col-md-3">
        <h3>Topics</h3>
        <TopicTree
            {...props} />
    </div>;

export default withRouter(connect(
    (state: State) => ({
        tree:     getTopicTree(state),
        selected: state.topic,
    }),
    (dispatch: Dispatch, ownProps: OwnProps) => bindActionCreators({
        onChoose: chooseTopic(ownProps.history),
    }, dispatch)
)(SelectedTopicList));
