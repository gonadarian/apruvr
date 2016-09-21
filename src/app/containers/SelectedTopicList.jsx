import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterTopic } from '../actions';

import TopicListComponent from '../components/TopicListComponent';

const SelectedTopicList = (props) =>
    <div className="col-md-4">
        <h2>Topics</h2>
        <TopicListComponent
            {...props} />
    </div>;

export default connect(
    (state) => ({
        root:       state.tree.root,
        selected:   state.topic,
    }),
    (dispatch) => bindActionCreators({
        onChoose:   filterTopic,
    }, dispatch)
)(SelectedTopicList);
