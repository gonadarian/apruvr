import React, { PropTypes } from 'react';
import map from 'lodash/map';
import filter from 'lodash/filter';
import ApruvrTypes from '../types';
import VideoItem from './VideoItem';

function visibleVideo(content, visibility) {
    const isDubd = content.dubbed && visibility.dubbed;
    const isSubd = content.subbed && !content.dubbed && visibility.subtitled;
    const isFrsh = !content.subbed && !content.dubbed && visibility.fresh;

    return isSubd || isDubd || isFrsh;
}

const VideoList = ({ nodes, visibility, ...other }) =>
    <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Agent</th>
                    <th>Status</th>
                    <th>Subtitling</th>
                    <th>Dubbing</th>
                </tr>
            </thead>
            <tbody>
                {map(
                    filter(
                        nodes,
                        (content) => visibleVideo(content, visibility)
                    ),
                    (content, key) =>
                        <VideoItem
                            {...other}
                            key={key}
                            content={content} />
                )}
            </tbody>
        </table>
    </div>;

VideoList.propTypes = {
    nodes:      PropTypes.objectOf(PropTypes.object).isRequired,
    visibility: ApruvrTypes.choices.isRequired,
};

export default VideoList;
