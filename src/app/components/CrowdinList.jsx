/* @flow */
import React from 'react';
import type { Element } from 'react';
import { map, transform } from 'lodash';
import { CONTENT_LETTERS } from '../consts';
import type { CrowdinNodeType, NodeMapType, ItemType } from '../flows';
import CrowdinItem from './CrowdinItem';

type StatType = { cnt: number, sum: number };
type StatsType = { totl: StatType, trns: StatType, appr: StatType };

const calcStats = (nodes: NodeMapType): StatsType =>
    transform(
        nodes,
        (mem: StatsType, node: CrowdinNodeType) => {
            mem.totl.cnt += 1;
            mem.totl.sum += node.wordCount;
            mem.trns.cnt += node.translatedWordCount === node.wordCount ? 1 : 0;
            mem.trns.sum += node.translatedWordCount;
            mem.appr.cnt += node.approvedWordCount === node.wordCount ? 1 : 0;
            mem.appr.sum += node.approvedWordCount;
        },
        {
            totl: { cnt: 0, sum: 0 },
            trns: { cnt: 0, sum: 0 },
            appr: { cnt: 0, sum: 0 },
        }
    );

type PropsStatsType = {
    stats: StatsType,
};

const CrowdinStats = ({ stats: { totl, trns, appr } }: PropsStatsType): ?Element<*> =>
    totl.cnt === 0 ? null :
        <tr className="active">
            <th />
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
            <th>
                {`${appr.sum} / ${totl.sum} `}
                <span className="badge">{`${Math.floor(100 * appr.sum / totl.sum)}%`}</span>
                <br />
                {`${appr.cnt} / ${totl.cnt} `}
                <span className="badge">{`${Math.floor(100 * appr.cnt / totl.cnt)}%`}</span>
            </th>
        </tr>;

type PropsType = {
    type: string,
    nodes: NodeMapType,
    language: ItemType,
};

const CrowdinList = ({ type, nodes, ...other }: PropsType): Element<*> =>
    <div>
        <table className="table">
            <thead>
                <tr className="active">
                    <th>Name</th>
                    <th>Agent</th>
                    <th>Status</th>
                    <th>WYSIWYG</th>
                    <th>Translate</th>
                    <th>Approve</th>
                </tr>
            </thead>
            <tbody>
                {map(
                    nodes,
                    (node: CrowdinNodeType, slug: string): Element<*> =>
                        <CrowdinItem
                            {...other}
                            key={slug}
                            code={CONTENT_LETTERS[type]}
                            content={node} />
                )}
            </tbody>
            <tfoot>
                <CrowdinStats stats={calcStats(nodes)} />
            </tfoot>
        </table>
    </div>;

export default CrowdinList;
