/* @flow */
import React, { Fragment, type Element } from 'react';
import { map, transform } from 'lodash';
import { iif } from '../utils';
import { HistoryList } from '../containers';
import { VideoItem } from '.';
import type { VideoNodeType, NodeMapType, ItemType } from '../flows';

type StatsType = { totl: number, subd: number, dubd: number };

const calcStats = (nodes: NodeMapType): StatsType =>
    transform(
        nodes,
        (mem: StatsType, { subdub: [subbed, dubbed] }: VideoNodeType) => {
            mem.totl += 1;
            mem.subd += iif(subbed, 1, 0);
            mem.dubd += iif(dubbed, 1, 0);
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
    historySlug: ?string,
    onHistory: (slug: ?string) => void,
};

const VideoList = ({ nodes, historySlug, ...other }: PropsType): Element<*> =>
    <table className="table table-condensed">
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
                    <Fragment>
                        <VideoItem
                            {...other}
                            key={slug}
                            historySlug={historySlug}
                            content={node} />
                        {historySlug === slug &&
                             <HistoryList
                                 history={history} />
                        }
                    </Fragment>
            )}
        </tbody>
        <tfoot>
            {nodes &&
                <VideoStats
                    stats={calcStats(nodes)} />
            }
        </tfoot>
    </table>;

export default VideoList;
