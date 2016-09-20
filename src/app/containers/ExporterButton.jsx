import React from 'react';
import { connect } from 'react-redux';

import Apruvr from '../helpers/apruvr';
import filterNodes from '../helpers/filter';

import map from 'lodash/map';
import reduce from 'lodash/reduce';

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

function exporter(code, nodes) {
    const data = reduce(
        map(
            nodes,
            (content, key) =>
                code === 'videos'
                    ? exporterVideo(key, content)
                    : exporterCrowdin(key, content)
        ),
        (result, row) => result + '\n' + row,
        code === 'videos'
            ? 'slug\ttitle\tsubbed\tdubbed\tsubject\ttopic\tsubtopic\ttutorial'
            : 'slug\ttitle\ttotal\ttranslated\tapproved\tsubject\ttopic\tsubtopic\ttutorial');

    return 'data:attachment/csv,' + encodeURIComponent(data);
}

const ExporterButton = ({ content, topic, nodes }) =>
    <div className="col-md-4">
        <h2>Export</h2>
        <a className="btn btn-primary"
            href={exporter(content.code, nodes)}
            download={content.name + ' ' + topic + '.csv'}
            target="_blank">
                Generate CSV
        </a>
    </div>;

function mapStateToProps(state) {
    return {
        content:    state.content,
        topic:      state.topic,
        nodes:      filterNodes(
            state.nodes,
            state.topic,
            state.tree,
            state.content
        ),
    };
}

ExporterButton.propTypes = {
    content:    Apruvr.PropTypes.item.isRequired,
    topic:      Apruvr.PropTypes.topic.isRequired,
    nodes:      React.PropTypes.objectOf(React.PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(ExporterButton);
