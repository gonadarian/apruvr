/* @flow */
import React, { Fragment, type Element } from 'react';
import { map, transform, keys, pick, take, size } from 'lodash';
import { iif, seconds, words, percent } from '../utils';
import { HistoryList } from '../containers';
import { VideoItem, PageExpander, type ContentListType } from '.';
import type { VideoNodeType, NodeMapType } from '../flows';

type StatType = { cnt: number, sum: number };
type StatsType = { totl: StatType, subd: StatType, dubd: StatType }

const calcStats = (nodes: NodeMapType): StatsType =>
    transform(
        nodes,
        (mem: StatsType, { subdub: [subbed, dubbed], duration }: VideoNodeType) => {
            mem.totl.cnt += 1;
            mem.subd.cnt += iif(subbed, 1, 0);
            mem.dubd.cnt += iif(dubbed, 1, 0);
            mem.totl.sum += duration;
            mem.subd.sum += iif(subbed, duration, 0);
            mem.dubd.sum += iif(dubbed, duration, 0);
        },
        {
            totl: { cnt: 0, sum: 0 },
            subd: { cnt: 0, sum: 0 },
            dubd: { cnt: 0, sum: 0 },
        },
    );

type PropsStatsType = {
    stats: StatsType,
};

const VideoStats = ({ stats: { totl, subd, dubd } }: PropsStatsType): Element<*> | false =>
    totl !== 0 &&
        <tr className="active">
            <th />
            <th />
            <th>Total</th>
            <th>
                seconds:<br />
                words:<br />
                items:
            </th>
            <th>
                {`${seconds(subd.sum)} / ${seconds(totl.sum)} `}
                <br />
                {`${words(subd.sum)} / ${words(totl.sum)} `}
                <span className="badge">{percent(subd.sum / totl.sum)}</span>
                <br />
                {`${subd.cnt} / ${totl.cnt} `}
                <span className="badge">{percent(subd.cnt / totl.cnt)}</span>
            </th>
            <th>
                {`${seconds(dubd.sum)} / ${seconds(totl.sum)} `}
                <br />
                {`${words(dubd.sum)} / ${words(totl.sum)} `}
                <span className="badge">{percent(dubd.sum / totl.sum)}</span>
                <br />
                {`${dubd.cnt} / ${totl.cnt} `}
                <span className="badge">{percent(dubd.cnt / totl.cnt)}</span>
            </th>
        </tr>;

const VideoList = ({
    nodes, historySlug, pageSize, onPageExpand, ...other
}: ContentListType): Element<*> =>
    <table className="table table-condensed">
        <thead>
            <tr className="active">
                <th>Name</th>
                <th>Agent</th>
                <th>Status</th>
                <th>Length</th>
                <th>Subtitle</th>
                <th>Dub</th>
            </tr>
        </thead>
        <tbody>
            {map(
                pageSize
                    ? pick(nodes, take(keys(nodes), pageSize))
                    : nodes,
                (node: VideoNodeType, slug: string): Element<*> =>
                    <Fragment key={slug}>
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
            {pageSize && pageSize < size(nodes) &&
                <PageExpander onPageExpand={onPageExpand} />
            }
        </tbody>
        <tfoot>
            {nodes &&
                <VideoStats
                    stats={calcStats(nodes)} />
            }
        </tfoot>
    </table>;

export default VideoList;
