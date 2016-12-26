/* @flow */
import React from 'react';
import type { Element } from 'react';
import { map, transform } from 'lodash';
import type { TopicNodeType, NodeMapType, ItemType } from '../flows';
import { CONTENT_LETTERS } from '../consts';
import TopicItem from './TopicItem';

type StatType = { cnt: number, sum: number };
type StatsType = { totl: StatType, trns: StatType };

const calcStats = (nodes: NodeMapType): StatsType =>
    transform(
        nodes,
        (mem: StatsType, node: TopicNodeType) => {
            mem.totl.cnt += 1;
            mem.totl.sum += node.metadataWordCount;
            mem.trns.cnt += node.metadataTranslatedWordCount === node.metadataWordCount ? 1 : 0;
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

const TopicStats = ({ stats: { totl, trns } }: PropsStatsType): ?Element<*> =>
    totl.cnt === 0 ? null :
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
};

const TopicList = ({ type, nodes, ...other }: PropsType): Element<*> =>
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
                        <TopicItem
                            {...other}
                            key={slug}
                            code={CONTENT_LETTERS[type]}
                            content={node} />
                )}
            </tbody>
            <tfoot>
                <TopicStats stats={calcStats(nodes)} />
            </tfoot>
        </table>
    </div>;

export default TopicList;
