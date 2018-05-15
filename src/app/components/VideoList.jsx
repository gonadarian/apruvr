/* @flow */
import React, { type Element } from 'react';
import { map, transform } from 'lodash';
import { iif } from '../utils';
import type { VideoNodeType, NodeMapType, ItemType } from '../flows';
import VideoItem from './VideoItem';

type StatsType = { totl: number, subd: number, dubd: number };

const calcStats = (nodes: NodeMapType): StatsType =>
    transform(
        nodes,
        (mem: StatsType, node: VideoNodeType) => {
            mem.totl += 1;
            mem.subd += iif(node.subbed, 1, 0);
            mem.dubd += iif(node.dubbed, 1, 0);
        },
        { totl: 0, subd: 0, dubd: 0 }
    );

type PropsStatsType = {
    stats: StatsType,
};

const VideoStats = ({ stats: { totl, subd, dubd } }: PropsStatsType): Element<*> | false =>
    totl !== 0 &&
        <tr className="active">
            <th />
            <th>Total</th>
            <th>items:</th>
            <th>
                {`${subd} / ${totl} `}
                <span className="badge">{`${Math.floor(100 * subd / totl)}%`}</span>
            </th>
            <th>
                {`${dubd} / ${totl} `}
                <span className="badge">{`${Math.floor(100 * dubd / totl)}%`}</span>
            </th>
        </tr>;

type PropsType = {
    language: ItemType,
    nodes: ?NodeMapType,
};

const VideoList = ({ nodes, ...other }: PropsType): Element<*> =>
    <div>
        <table className="table">
            <thead>
                <tr className="active">
                    <th>Name</th>
                    <th>Agent</th>
                    <th>Status</th>
                    <th>Subtitle</th>
                    <th>Dub</th>
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
            <tfoot>
                {nodes &&
                    <VideoStats stats={calcStats(nodes)} />
                }
            </tfoot>
        </table>
    </div>;

export default VideoList;
