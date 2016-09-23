import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { filterTopic } from '../actions';
import { getTopicTree } from '../selectors';

import TopicListComponent from '../components/TopicListComponent';

const SelectedTopicList = (props) =>
    <div className="col-md-3 col-sm-12 col-xs-12">
        <h2>Topics</h2>
        <TopicListComponent
            {...props} />
    </div>;

export default connect(
    (state) => ({
        tree:       getTopicTree(state),
        selected:   state.topic,
    }),
    (dispatch) => bindActionCreators({
        onChoose:   filterTopic,
    }, dispatch)
)(SelectedTopicList);
