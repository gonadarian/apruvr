/* @flow */
import React, { Fragment, type Element } from 'react';
import { map, transform } from 'lodash';
import { iif } from '../utils';
import { CONTENT_LETTERS } from '../consts';
import { TopicItem, HistoryList } from '.';
import type { TopicNodeType, NodeMapType, ItemType, HistoryType } from '../flows';

type StatType = { cnt: number, sum: number };
type StatsType = { totl: StatType, trns: StatType };

const calcStats = (nodes: NodeMapType): StatsType =>
    transform(
        nodes,
        (mem: StatsType, node: TopicNodeType) => {
            mem.totl.cnt += 1;
            mem.totl.sum += node.metadataWordCount;
            mem.trns.cnt += iif(node.metadataTranslatedWordCount === node.metadataWordCount, 1, 0);
            mem.trns.sum += node.metadataTranslatedWordCount;
        },
        {
            totl: { cnt: 0, sum: 0 },
            trns: { cnt: 0, sum: 0 },
        }
    );

type PropsStatsType = {
    stats: StatsType,
};

const TopicStats = ({ stats: { totl, trns } }: PropsStatsType): Element<*> | false =>
    totl.cnt !== 0 &&
        <tr className="active">
            <th />
            <th>Total</th>
            <th>
                words:<br />
                items:
            </th>
            <th>
                {`${trns.sum} / ${totl.sum} `}
                <span className="badge">{`${Math.floor(100 * trns.sum / totl.sum)}%`}</span>
                <br />
                {`${trns.cnt} / ${totl.cnt} `}
                <span className="badge">{`${Math.floor(100 * trns.cnt / totl.cnt)}%`}</span>
            </th>
        </tr>;

type PropsType = {
    type: string,
    nodes: NodeMapType,
    language: ItemType,
    history: ?HistoryType,
    onHistory: (slug: string) => void,
};

const TopicList = ({ type, nodes, history, ...other }: PropsType): Element<*> =>
    <div>
        <table className="table">
            <thead>
                <tr className="active">
                    <th>Name</th>
                    <th>Agent</th>
                    <th>Status</th>
                    <th>Translate</th>
                </tr>
            </thead>
            <tbody>
                {map(
                    nodes,
                    (node: TopicNodeType, slug: string): Element<*> =>
                        <Fragment>
                            <TopicItem
                                {...other}
                                key={slug}
                                code={CONTENT_LETTERS[type]}
                                content={node} />
                            {history && history.slug === slug &&
                                 <HistoryList
                                     history={history} />
                            }
                        </Fragment>
                )}
            </tbody>
            <tfoot>
                <TopicStats stats={calcStats(nodes)} />
            </tfoot>
        </table>
    </div>;

export default TopicList;
