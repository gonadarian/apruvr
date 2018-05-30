/* @flow */
import React, { type Element } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { size } from 'lodash';
import { getVisibleNodes } from '../selectors';
import { fetchWorkflow, fetchHistory, pageExpand } from '../actions';
import { firedux } from '../hocs';
import { ContentList } from '../components';
import type { LanguageType, ContentKindType } from '../consts';
import type { State, Dispatch, WorkflowMapType, NodeMapType } from '../flows';

interface StatePropsType {
    content: ContentKindType,
    language: ?LanguageType,
    nodes: ?NodeMapType,
    historySlug: ?string;
    pageSize: number,
}

interface PropsType extends StatePropsType {
    onFire: (snapshot: WorkflowMapType) => void,
    onHistory: (slug: string) => void,
    onPageExpand: (fullExpand: boolean) => void,
}

const FilteredContentList = ({ content, nodes, ...other }: PropsType): Element<*> =>
    <div className="col-xs-12 col-md-9">
        <h3>
            {`${content.name} `}
            <span className="badge">
                {nodes
                    ? size(nodes)
                    : 0}
            </span>
        </h3>
        <ContentList
            {...other}
            nodes={nodes}
            type={content.code}
            title={content.name} />
    </div>;

export default connect(
    (state: State): StatePropsType => ({
        content:     state.content,
        language:    state.language,
        nodes:       getVisibleNodes(state),
        pageSize:    state.pageSize,
        historySlug: state.history
            ? state.history.slug
            : null,
    }),
    (dispatch: Dispatch) => bindActionCreators({
        onPageExpand: pageExpand,
        onFire:       fetchWorkflow,
        onHistory:    fetchHistory,
    }, dispatch)
)(firedux(
    ({ language }) => `status/${language.code}`
)(FilteredContentList));
