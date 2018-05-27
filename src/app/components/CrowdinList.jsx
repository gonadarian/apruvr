/* @flow */
import React, { Fragment, type Element } from 'react';
import { map, transform } from 'lodash';
import { iif } from '../utils';
import { CONTENT_LETTERS } from '../consts';
import { HistoryList } from '../containers';
import { CrowdinItem } from '.';
import type { CrowdinNodeType, NodeMapType, ItemType, HistoryType } from '../flows';

type StatType = { cnt: number, sum: number };
type StatsType = { totl: StatType, trns: StatType, appr: StatType };

const calcStats = (nodes: NodeMapType): StatsType =>
    transform(
        nodes,
        (mem: StatsType, { data: [, totl, trns, appr] }: CrowdinNodeType) => {
            mem.totl.cnt += 1;
            mem.totl.sum += totl;
            mem.trns.cnt += iif(trns === totl, 1, 0);
            mem.trns.sum += trns;
            mem.appr.cnt += iif(appr === totl, 1, 0);
            mem.appr.sum += appr;
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

const CrowdinStats = ({ stats: { totl, trns, appr } }: PropsStatsType): Element<*> | false =>
    totl.cnt !== 0 &&
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
    history: ?HistoryType,
    onHistory: (slug: string) => void,
};

const CrowdinList = ({ type, nodes, history, ...other }: PropsType): Element<*> =>
    <table className="table table-condensed">
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
                    <Fragment>
                        <CrowdinItem
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
            <CrowdinStats
                stats={calcStats(nodes)} />
        </tfoot>
    </table>;

export default CrowdinList;
