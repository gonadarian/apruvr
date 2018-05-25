/* @flow */
import React, { type Element } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { size } from 'lodash';
import { getVisibleNodes } from '../selectors';
import { fetchWorkflow, fetchHistory } from '../actions';
import { firedux } from '../hocs';
import { ContentList } from '../components';
import type { LanguageType, ContentKindType } from '../consts';
import type {
    State, Dispatch,
    WorkflowMapType, NodeMapType, HistoryType,
} from '../flows';

interface StatePropsType {
    content: ContentKindType,
    language: ?LanguageType,
    nodes: ?NodeMapType,
    history: ?HistoryType;
}

interface PropsType extends StatePropsType {
    onFire: (snapshot: WorkflowMapType) => void,
    onHistory: (slug: string) => void,
}

const FilteredContentList = ({ content, nodes, ...props }: PropsType): Element<*> =>
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
        history:  state.history,
    }),
    (dispatch: Dispatch) => bindActionCreators({
        onFire:    fetchWorkflow,
        onHistory: fetchHistory,
    }, dispatch)
)(firedux(
    ({ language }) => `status/${language.code}`
)(FilteredContentList));
