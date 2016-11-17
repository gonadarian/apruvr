import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import ApruvrTypes from '../types';
import { TYPE_GROUPS } from '../consts';
import { getVisibleNodes } from '../selectors';

const exporterCrowdin = (key, content) =>
    [
        key,
        content.title,
        content.wordCount,
        content.translatedWordCount,
        content.approvedWordCount,
        ...content.path,
    ].join('\t');

const exporterVideo = (key, content) =>
    [
        key,
        content.title,
        content.subbed,
        content.dubbed,
        ...content.path,
    ].join('\t');

const EXPORTERS = {
    videos:     exporterVideo,
    crowdin:    exporterCrowdin,
};

const COLUMNS = {
    videos:     ['slug', 'title', 'subbed', 'dubbed', 'subject', 'topic', 'subtopic', 'tutorial'],
    crowdin:    ['slug', 'title', 'total', 'translated', 'approved', 'subject', 'topic', 'subtopic', 'tutorial'],
};

const exporter = (code, nodes) =>
    'data:attachment/csv,' + encodeURIComponent(
        reduce(
            map(
                nodes,
                (content, key) => EXPORTERS[TYPE_GROUPS[code]](key, content)
            ),
            (result, row) => result + '\n' + row,
            COLUMNS[TYPE_GROUPS[code]].join('\t')
        )
    );

const ExporterButton = ({ content, topic, nodes }) =>
    <div className="col-xs-12 col-sm-2">
        <h2>Export</h2>
        <a className="btn btn-primary"
            href={exporter(content.code, nodes)}
            download={content.name + ' ' + topic + '.csv'}
            target="_blank">
                Generate CSV
        </a>
    </div>;

ExporterButton.propTypes = {
    content:    ApruvrTypes.item.isRequired,
    topic:      PropTypes.string.isRequired,
    nodes:      PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(
    (state) => ({
        content:    state.content,
        topic:      state.topic,
        nodes:      getVisibleNodes(state),
    })
)(ExporterButton);
