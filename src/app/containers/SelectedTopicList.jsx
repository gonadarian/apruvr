/* @flow */
import React, { type Element } from 'react';
import { withRouter, type RouterHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { chooseTopic } from '../actions';
import { getTopicTree } from '../selectors';
import { TopicTree, type TopicTreeType } from '../components';
import type { State, Dispatch } from '../flows';

interface OwnPropsType {
    history: RouterHistory,
}

const SelectedTopicList = (props: TopicTreeType): Element<*> =>
    <div className="col-xs-12 col-md-3">
        <h2>Topics</h2>
        <TopicTree
            {...props} />
    </div>;

export default withRouter(connect(
    (state: State) => ({
        tree:     getTopicTree(state),
        selected: state.topic,
    }),
    (dispatch: Dispatch, ownProps: OwnPropsType) => bindActionCreators({
        onChoose: chooseTopic(ownProps.history),
    }, dispatch)
)(SelectedTopicList));
