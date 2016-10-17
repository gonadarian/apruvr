import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import ApruvrTypes from '../types';
import { TYPE_GROUPS } from '../consts';
import { getFilteredNodes } from '../selectors';

function exporterCrowdin(key, content) {
    const data =
          key + '\t' +
          content.title + '\t' +
          content.wordCount + '\t' +
          content.translatedWordCount + '\t' +
          content.approvedWordCount + '\t' +
          content.path.join('\t');

    return data;
}

function exporterVideo(key, content) {
    const data =
          key + '\t' +
          content.title + '\t' +
          content.subbed + '\t' +
          content.dubbed + '\t' +
          content.path.join('\t');

    return data;
}

const EXPORTERS = {
    videos:     exporterVideo,
    crowdin:    exporterCrowdin,
};

const COLUMNS = {
    videos:     ['slug', 'title', 'subbed', 'dubbed', 'subject', 'topic', 'subtopic', 'tutorial'],
    crowdin:    ['slug', 'title', 'total', 'translated', 'approved', 'subject', 'topic', 'subtopic', 'tutorial'],
};

function exporter(code, nodes) {
    const data = reduce(
        map(
            nodes,
            (content, key) => EXPORTERS[TYPE_GROUPS[code]](key, content)
        ),
        (result, row) => result + '\n' + row,
        COLUMNS[TYPE_GROUPS[code]].join('\t'));

    return 'data:attachment/csv,' + encodeURIComponent(data);
}

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
        nodes:      getFilteredNodes(state),
    })
)(ExporterButton);
