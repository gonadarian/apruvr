/* @flow */
import React, { type Element } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { size } from 'lodash';
import { getVisibleNodes } from '../selectors';
import { fetchHistory, pageExpand } from '../actions';
import { firedux } from '../hocs';
import { ContentList } from '../components';
import type { LanguageType, ContentKindType } from '../consts';
import type { State, Dispatch, NodeMapType } from '../flows';

type StatePropsType = {|
    content: ContentKindType,
    language: ?LanguageType,
    nodes: ?NodeMapType,
    historySlug: ?string;
    pageSize: ?number,
|};

type DispatchPropsType = {|
    onHistory: (slug: ?string) => void,
    onPageExpand: (fullExpand: boolean) => void,
|};

type PropsType = {| ...DispatchPropsType, ...StatePropsType |};

const FilteredContentList = ({ content, nodes, language, ...other }: PropsType): Element<'div'> =>
    <div className="col-xs-12 col-md-9">
        <h3>
            {`${content.name} `}
            <span className="badge">
                {nodes
                    ? size(nodes)
                    : 0}
            </span>
        </h3>
        { nodes && language
            ? <ContentList
                {...other}
                nodes={nodes}
                language={language}
                type={content.code} />
            : <small className="text-muted">
                no content found
            </small>
        }
    </div>;

export default firedux(
    connect(
        (state: State): StatePropsType => ({
            content:     state.content,
            language:    state.language,
            nodes:       getVisibleNodes(state),
            pageSize:    state.pageSize,
            historySlug: state.history
                ? state.history.slug
                : null,
        }),
        (dispatch: Dispatch): DispatchPropsType => bindActionCreators({
            onPageExpand: pageExpand,
            onHistory:    fetchHistory,
        }, dispatch)
    )(FilteredContentList),
    ({ language }) => `status/${language.code}`
);
