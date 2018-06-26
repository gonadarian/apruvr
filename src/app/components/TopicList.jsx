/* @flow */
import React, { Fragment, type Element } from 'react';
import { map, transform, keys, pick, take, size } from 'lodash';
import { iif, percent } from '../utils';
import { CONTENT_LETTERS } from '../consts';
import { HistoryList } from '../containers';
import { TopicItem, PageExpander, type ContentListProps } from '.';
import type { TopicNodeType, NodeMapType } from '../flows';

type Stat = {|
    cnt: number,
    sum: number
|};

type Stats = {|
    totl: Stat,
    trns: Stat
|};

const calcStats = (nodes: NodeMapType): Stats =>
    transform(
        nodes,
        (mem: Stats, { meta: [, totl, trns] }: TopicNodeType) => {
            mem.totl.cnt += 1;
            mem.totl.sum += totl;
            mem.trns.cnt += iif(trns === totl, 1, 0);
            mem.trns.sum += trns;
        },
        {
            totl: { cnt: 0, sum: 0 },
            trns: { cnt: 0, sum: 0 },
        }
    );

type TopicStatsProps = {|
    stats: Stats,
|};

const TopicStats = ({ stats: { totl, trns } }: TopicStatsProps): Element<*> | false =>
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
                <span className="badge">{percent(trns.sum / totl.sum)}</span>
                <br />
                {`${trns.cnt} / ${totl.cnt} `}
                <span className="badge">{percent(trns.cnt / totl.cnt)}</span>
            </th>
        </tr>;

const TopicList = ({
    type, nodes, historySlug, pageSize, onPageExpand, ...other
}: ContentListProps): Element<*> =>
    <div>
        <table className="table table-condensed">
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
                    pageSize
                        ? pick(nodes, take(keys(nodes), pageSize))
                        : nodes,
                    (node: TopicNodeType, slug: string): Element<*> =>
                        <Fragment key={slug}>
                            <TopicItem
                                {...other}
                                key={slug}
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
                <TopicStats stats={calcStats(nodes)} />
            </tfoot>
        </table>
    </div>;

export default TopicList;
