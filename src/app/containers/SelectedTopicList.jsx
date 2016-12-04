import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { chooseTopic } from '../actions';
import { getTopicTree } from '../selectors';
import { TopicTree } from '../components';

const SelectedTopicList = (props) =>
    <div className="col-xs-12 col-md-3">
        <h2>Topics</h2>
        <TopicTree
            {...props} />
    </div>;

export default connect(
    (state) => ({
        tree:       getTopicTree(state),
        selected:   state.topic,
    }),
    (dispatch) => bindActionCreators({
        onChoose:   chooseTopic,
    }, dispatch)
)(SelectedTopicList);
