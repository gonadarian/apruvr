/* @flow */
import React, { type Element } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { map, reduce } from 'lodash';
import { startExport } from '../actions';
import { getVisibleNodes } from '../selectors';
import { CONTENT_GROUPS, type ContentKindType } from '../consts';
import type {
    State, Dispatch,
    NodeType, NodeMapType, WorkflowMapType, UserMapType,
} from '../flows';

const getStatus = (slug, workflow): string =>
    workflow && slug in workflow
        ? workflow[slug].status
        : 'x';

const getAgent = (slug, workflow, users): string =>
    workflow && users && slug in workflow && 'uid' in [workflow[slug]]
        ? users[workflow[slug].uid].displayName
        : 'x';

const exporterCrowdin = (
    slug, { title, path, data: [, totl, trns, appr] }, workflow, users
): string =>
    [
        slug,
        title,
        getStatus(slug, workflow),
        getAgent(slug, workflow, users),
        totl,
        trns,
        appr,
        ...path,
    ].join('\t');

const exporterVideo = (slug, node, workflow, users): string =>
    [
        slug,
        node.title,
        getStatus(slug, workflow),
        getAgent(slug, workflow, users),
        node.subbed,
        node.dubbed,
        ...node.path,
    ].join('\t');

const exporterTopic = (
    slug, { title, path, data: [, totl, trns, appr] }, workflow, users
): string =>
    [
        slug,
        title,
        getStatus(slug, workflow),
        getAgent(slug, workflow, users),
        totl,
        trns,
        appr,
        ...path,
    ].join('\t');

const EXPORTERS = {
    videos:  exporterVideo,
    crowdin: exporterCrowdin,
    topics:  exporterTopic,
};

const COLUMNS = {
    videos: [
        'slug', 'title', 'agent', 'status', 'subbed', 'dubbed', 'subject',
        'topic', 'subtopic', 'tutorial',
    ],
    crowdin: [
        'slug', 'title', 'agent', 'status', 'total', 'translated', 'approved',
        'subject', 'topic', 'subtopic', 'tutorial',
    ],
    topics: [
        'slug', 'title', 'agent', 'status', 'total', 'translated', 'approved',
        'subject', 'topic', 'subtopic', 'tutorial',
    ],
};

const generateExport = (code, nodes, workflow, users): string => {
    const exporter = EXPORTERS[CONTENT_GROUPS[code]];
    const columns = COLUMNS[CONTENT_GROUPS[code]];
    const encoded = encodeURIComponent(
        reduce(
            map(
                nodes,
                (node: NodeType, slug: string) =>
                    exporter(slug, node, workflow, users)
            ),
            (result, row) => `${result}\n${row}`,
            columns.join('\t')
        )
    );
    return `data:attachment/csv,${encoded}`;
};

interface StatePropsType {
    exporting: boolean,
    content: ContentKindType,
    topic: string,
    nodes: ?NodeMapType,
    workflow: ?WorkflowMapType,
    users: ?UserMapType,
}

interface PropsType extends StatePropsType {
    onExportStarted: () => void,
}

const ExporterButton = ({
    exporting, content, topic, nodes, workflow, users, onExportStarted,
}: PropsType): Element<*> =>
    <div className="col-xs-12 col-sm-2">
        <h3>Export</h3>
        {exporting
            ? <a className="btn btn-primary"
                download={`${content.name} ${topic}.csv`}
                href={generateExport(content.code, nodes, workflow, users)}
                target="_blank">
                {'Download Report '}
                <span className="fas fa-download" />
            </a>
            : <a className="btn btn-default"
                onClick={(): void => onExportStarted()}>
                Generate Report
                <span className="fas fa-download" />
            </a>
        }
    </div>;

export default connect(
    (state: State): StatePropsType => ({
        exporting: state.exporting,
        content:   state.content,
        topic:     state.topic,
        nodes:     getVisibleNodes(state),
        workflow:  state.workflow,
        users:     state.users,
    }),
    (dispatch: Dispatch) => bindActionCreators({
        onExportStarted: startExport,
    }, dispatch),
)(ExporterButton);
