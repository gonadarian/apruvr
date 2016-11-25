/* @flow */
import React from 'react';
import type { Element } from 'react';
import map from 'lodash/map';
import type { VideoNodeType, NodesType, ItemType } from '../flows';
import VideoItem from './VideoItem';

type PropsType = {
    nodes: NodesType,
    language: ItemType,
};

const VideoList = ({ nodes, ...other }: PropsType): Element<*> =>
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
                    (node: VideoNodeType, slug: string): Element<*> =>
                        <VideoItem
                            {...other}
                            key={slug}
                            content={node} />
                )}
            </tbody>
        </table>
    </div>;

export default VideoList;
