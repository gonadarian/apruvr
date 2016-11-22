import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import ApruvrTypes from '../types';
import { TYPE_GROUPS } from '../consts';
import { getVisibleNodes } from '../selectors';

const getStatus = (slug, workflow) =>
    workflow && slug in workflow
        ? workflow[slug].status
        : 'x';

const getAgent = (slug, workflow, users) =>
    workflow && users && slug in workflow
        ? users[workflow[slug].uid].displayName
        : 'x';

const exporterCrowdin = (slug, node, workflow, users) =>
    [
        slug,
        node.title,
        getStatus(slug, workflow),
        getAgent(slug, workflow, users),
        node.wordCount,
        node.translatedWordCount,
        node.approvedWordCount,
        ...node.path,
    ].join('\t');

const exporterVideo = (slug, node, workflow, users) =>
    [
        slug,
        node.title,
        getStatus(slug, workflow),
        getAgent(slug, workflow, users),
        node.subbed,
        node.dubbed,
        ...node.path,
    ].join('\t');

const exporterTopic = (slug, node, workflow, users) =>
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
    videos:     exporterVideo,
    crowdin:    exporterCrowdin,
    topics:     exporterTopic,
};

const COLUMNS = {
    videos:     [
        'slug', 'title', 'agent', 'status', 'subbed', 'dubbed', 'subject',
        'topic', 'subtopic', 'tutorial',
    ],
    crowdin:    [
        'slug', 'title', 'agent', 'status', 'total', 'translated', 'approved',
        'subject', 'topic', 'subtopic', 'tutorial',
    ],
    topics:    [
        'slug', 'title', 'agent', 'status', 'total', 'translated', 'approved',
        'subject', 'topic', 'subtopic', 'tutorial',
    ],
};

const generateExport = (code, nodes, workflow, users) => {
    const exporter = EXPORTERS[TYPE_GROUPS[code]];
    const columns = COLUMNS[TYPE_GROUPS[code]];
    const encoded = encodeURIComponent(
        reduce(
            map(
                nodes,
                (node, slug) => exporter(slug, node, workflow, users)
            ),
            (result, row) => result + '\n' + row,
            columns.join('\t')
        )
    );
    return 'data:attachment/csv,' + encoded;
};

const ExporterButton = ({ content, topic, nodes, workflow, users }) =>
    <div className="col-xs-12 col-sm-2">
        <h2>Export</h2>
        <a className="btn btn-primary"
            download={content.name + ' ' + topic + '.csv'}
            href={generateExport(content.code, nodes, workflow, users)}
            target="_blank">
                Generate Report
        </a>
    </div>;

ExporterButton.propTypes = {
    content:    ApruvrTypes.item.isRequired,
    topic:      PropTypes.string.isRequired,
    nodes:      PropTypes.objectOf(PropTypes.object).isRequired,
    workflow:   PropTypes.object,
    users:      PropTypes.object,
};

export default connect(
    (state) => ({
        content:    state.content,
        topic:      state.topic,
        nodes:      getVisibleNodes(state),
        workflow:   state.workflow,
        users:      state.users,
    })
)(ExporterButton);
