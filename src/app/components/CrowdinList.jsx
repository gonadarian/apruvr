/* @flow */
import React, { Fragment, type Element } from 'react';
import { map, transform, keys, pick, take, size } from 'lodash';
import { iif, percent } from '../utils';
import { CONTENT_LETTERS } from '../consts';
import { HistoryList } from '../containers';
import { CrowdinItem, PageExpander, type ContentListType } from '.';
import type { CrowdinNodeType, NodeMapType } from '../flows';

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
                <span className="badge">{percent(trns.sum / totl.sum)}</span>
                <br />
                {`${trns.cnt} / ${totl.cnt} `}
                <span className="badge">{percent(trns.cnt / totl.cnt)}</span>
            </th>
            <th>
                {`${appr.sum} / ${totl.sum} `}
                <span className="badge">{percent(appr.sum / totl.sum)}</span>
                <br />
                {`${appr.cnt} / ${totl.cnt} `}
                <span className="badge">{percent(appr.cnt / totl.cnt)}</span>
            </th>
        </tr>;

const CrowdinList = ({
    type, nodes, historySlug, pageSize, onPageExpand, ...other
}: ContentListType): Element<*> =>
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
                pageSize
                    ? pick(nodes, take(keys(nodes), pageSize))
                    : nodes,
                (node: CrowdinNodeType, slug: string): Element<*> =>
                    <Fragment key={slug}>
                        <CrowdinItem
                            {...other}
                            historySlug={historySlug}
                            code={CONTENT_LETTERS[type]}
                            content={node} />
                        {historySlug === slug &&
                             <HistoryList />
                        }
                    </Fragment>
            )}
            {pageSize && pageSize < size(nodes) &&
                <PageExpander onPageExpand={onPageExpand} />
            }
        </tbody>
        <tfoot>
            <CrowdinStats
                stats={calcStats(nodes)} />
        </tfoot>
    </table>;

export default CrowdinList;
