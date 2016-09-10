import React from 'react';

import CrowdinComponent from './CrowdinComponent.jsx';
import VideoComponent from './VideoComponent.jsx';
import Apruvr from '../helpers/Apruvr.jsx';
import Consts from '../helpers/Consts.jsx';

import map from 'lodash/map';
import filter from 'lodash/filter';

const { TYPES } = Consts;

function visibleCrowdin(content, visibility) {
    const totl = content.wordCount;
    const trns = content.translatedWordCount;
    const appr = content.approvedWordCount;

    const isAppr = appr === totl && visibility.approved;
    const isTrns = trns === totl && appr !== totl && visibility.translated;
    const isFrsh = trns === 0 && visibility.fresh;
    const isDoin = trns > 0 && trns < totl && visibility.doing;

    return isTrns || isAppr || isFrsh || isDoin;
}

const CrowdinList = ({ type, contents, visibility, ...other }) =>
    <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Translate</th>
                    <th>Approve</th>
                </tr>
            </thead>
            <tbody>
                {map(
                    filter(
                        contents,
                        (content) => visibleCrowdin(content, visibility)
                    ),
                    (content, key) =>
                        <CrowdinComponent
                            {...other}
                            key={key}
                            code={TYPES[type]}
                            content={content} />
                )}
            </tbody>
        </table>
    </div>;

function visibleVideo(content, visibility) {
    const isDubd = content.dubbed && visibility.dubbed;
    const isSubd = content.subbed && !content.dubbed && visibility.subtitled;
    const isFrsh = !content.subbed && !content.dubbed && visibility.fresh;

    return isSubd || isDubd || isFrsh;
}

const VideoList = ({ contents, visibility, ...other }) =>
    <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Subtitling</th>
                    <th>Dubbing</th>
                </tr>
            </thead>
            <tbody>
                {map(
                    filter(
                        contents,
                        (content) => visibleVideo(content, visibility)
                    ),
                    (content, key) =>
                        <VideoComponent
                            {...other}
                            key={key}
                            content={content} />
                )}
            </tbody>
        </table>
    </div>;

const listStrategy = {
    exercises:      CrowdinList,
    articles:       CrowdinList,
    scratchpads:    CrowdinList,
    videos:         VideoList,
};

const ContentListComponent = ({ type, ...other }) => {
    const strategy = listStrategy[type];
    return strategy({ ...other, type });
};

ContentListComponent.propTypes = {
    type:       React.PropTypes.string.isRequired,
};

CrowdinList.propTypes = {
    contents:   React.PropTypes.objectOf(React.PropTypes.object).isRequired,
    type:       React.PropTypes.string.isRequired,
    visibility: Apruvr.PropTypes.choices.isRequired,
};

VideoList.propTypes = {
    contents:   React.PropTypes.objectOf(React.PropTypes.object).isRequired,
    visibility: Apruvr.PropTypes.choices.isRequired,
};

export default ContentListComponent;
