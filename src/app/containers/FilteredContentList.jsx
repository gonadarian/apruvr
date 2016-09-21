import React from 'react';
import { connect } from 'react-redux';

import ContentListComponent from '../components/ContentListComponent';
import Apruvr from '../helpers/apruvr';
import filterNodes from '../helpers/filter';

import size from 'lodash/size';

const FilteredContentList = ({ content, nodes, ...props }) =>
    <div className="col-md-8">
        <h2>
            {content.name}&nbsp;
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
        nodes:      filterNodes(
            state.nodes,
            state.topic,
            state.tree,
            state.content
        ),
    })
)(FilteredContentList);
