/* @flow */
import React, { type Element } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { size } from 'lodash';
import { getVisibleNodes } from '../selectors';
import { fetchWorkflow } from '../actions';
import { firedux } from '../hocs';
import { ContentList } from '../components';
import type { LanguageType, ContentKindType } from '../consts';
import type { State, ActionType, Dispatch, WorkflowMapType, NodeMapType } from '../flows';

interface StatePropsType {
    content: ContentKindType,
    language: ?LanguageType,
    nodes: ?NodeMapType,
}

interface PropsType extends StatePropsType {
    onFire: (snapshot: WorkflowMapType) => ActionType,
}

const FilteredContentList = ({ content, nodes, ...props }: PropsType): Element<*> =>
    <div className="col-xs-12 col-md-9">
        <h2>
            {content.name}
            {' '}
            <span className="badge">
                {nodes
                    ? size(nodes)
                    : 0}
            </span>
        </h2>
        <ContentList
            {...props}
            nodes={nodes}
            type={content.code}
            title={content.name} />
    </div>;

export default connect(
    (state: State): StatePropsType => ({
        content:  state.content,
        language: state.language,
        nodes:    getVisibleNodes(state),
    }),
    (dispatch: Dispatch) => bindActionCreators({
        onFire: fetchWorkflow,
    }, dispatch)
)(firedux(
    ({ language }) => `status/${language.code}`
)(FilteredContentList));
