import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import size from 'lodash/size';
import ApruvrTypes from '../types';
import { getVisibleNodes } from '../selectors';
import { fetchWorkflow } from '../actions';
import { fireduxed } from '../hocs';
import { ContentList } from '../components';

const FilteredContentList = ({ content, nodes, ...props }) =>
    <div className="col-xs-12 col-md-9">
        <h2>
            {content.name}
            {' '}
            <span className="badge">
                {size(nodes)}
            </span>
        </h2>
        <ContentList
            {...props}
            nodes={nodes}
            type={content.code}
            title={content.name} />
    </div>;

FilteredContentList.propTypes = {
    content:    ApruvrTypes.item.isRequired,
    nodes:      PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(
    (state) => ({
        content:    state.content,
        language:   state.language,
        nodes:      getVisibleNodes(state),
    }),
    (dispatch) => bindActionCreators({
        onFire: fetchWorkflow,
    }, dispatch)
)(fireduxed(
    ({ language }) => `status/${language.code}`
)(FilteredContentList));
