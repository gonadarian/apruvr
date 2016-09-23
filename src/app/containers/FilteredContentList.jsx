import React from 'react';
import { connect } from 'react-redux';

import Apruvr from '../helpers/apruvr';
import ContentListComponent from '../components/ContentListComponent';
import { getFilteredNodes } from '../selectors';

import size from 'lodash/size';

const FilteredContentList = ({ content, nodes, ...props }) =>
    <div className="col-md-9 col-sm-12 col-xs-12">
        <h2>
            {content.name}
            {' '}
            <span className="badge">
                {size(nodes)}
            </span>
        </h2>
        <ContentListComponent
            {...props}
            nodes={nodes}
            type={content.code}
            title={content.name} />
    </div>;

FilteredContentList.propTypes = {
    content:    Apruvr.PropTypes.item.isRequired,
    nodes:      React.PropTypes.objectOf(React.PropTypes.object).isRequired,
};

export default connect(
    (state) => ({
        content:    state.content,
        language:   state.language,
        visibility: state.visibility,
        nodes:      getFilteredNodes(state),
    })
)(FilteredContentList);
