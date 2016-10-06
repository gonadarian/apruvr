import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import size from 'lodash/size';
import ApruvrTypes from '../types';
import { getFilteredNodes } from '../selectors';
import { firebaseFetchOnce } from '../actions';
import fireduxed from '../hocs/fireduxed';
import ContentList from '../components/ContentList';

const FilteredContentList = ({ content, nodes, ...props }) =>
    <div className="col-md-9 col-sm-12 col-xs-12">
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
        visibility: state.visibility,
        nodes:      getFilteredNodes(state),
    }),
    (dispatch) => bindActionCreators({
        onFire: firebaseFetchOnce,
    }, dispatch)
)(fireduxed(
    ({ language }) => language.code
)(FilteredContentList));
