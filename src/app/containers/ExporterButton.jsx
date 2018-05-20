/* @flow */
import React, { type Element } from 'react';
import { connect } from 'react-redux';
import { map, reduce } from 'lodash';
import { getVisibleNodes } from '../selectors';
import { CONTENT_GROUPS, type ContentKindType } from '../consts';
import type { State, NodeMapType, WorkflowMapType, UserType } from '../flows';

const getStatus = (slug, workflow): string =>
    workflow && slug in workflow
        ? workflow[slug].status
        : 'x';

const getAgent = (slug, workflow, users): string =>
    workflow && users && slug in workflow && 'uid' in [workflow[slug]]
        ? users[workflow[slug].uid].displayName
        : 'x';

const exporterCrowdin = (slug, node, workflow, users): string =>
    [
        slug,
        node.title,
        getStatus(slug, workflow),
        getAgent(slug, workflow, users),
        node.translatableWordCount,
        node.translatedWordCount,
        node.approvedWordCount,
        ...node.path,
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

const exporterTopic = (slug, node, workflow, users): string =>
    [
        slug,
        node.title,
        getStatus(slug, workflow),
        getAgent(slug, workflow, users),
        node.metadataWordCount,
        node.metadataTranslatedWordCount,
        node.metadataApprovedWordCount,
        ...node.path,
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
                (node, slug) => exporter(slug, node, workflow, users)
            ),
            (result, row) => `${result}\n${row}`,
            columns.join('\t')
        )
    );
    return `data:attachment/csv,${encoded}`;
};

interface PropsType {
    content: ContentKindType,
    topic: string,
    nodes: ?NodeMapType,
    workflow: ?WorkflowMapType,
    users: ?UserType[],
}

const ExporterButton = ({ content, topic, nodes, workflow, users }: PropsType): Element<*> =>
    <div className="col-xs-12 col-sm-2">
        <h2>Export</h2>
        <a className="btn btn-primary"
            download={`${content.name} ${topic}.csv`}
            href={generateExport(content.code, nodes, workflow, users)}
            target="_blank">
                Generate Report
        </a>
    </div>;

export default connect(
    (state: State): PropsType => ({
        content:  state.content,
        topic:    state.topic,
        nodes:    getVisibleNodes(state),
        workflow: state.workflow,
        users:    state.users,
    })
)(ExporterButton);
