import React, { PropTypes } from 'react';
import map from 'lodash/map';
import VideoItem from './VideoItem';

const VideoList = ({ nodes, ...other }) =>
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
                    nodes,
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
};

export default VideoList;
