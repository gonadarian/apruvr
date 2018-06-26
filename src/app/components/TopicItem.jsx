/* @flow */
import React, { type Element } from 'react';
import { iif } from '../utils';
import { STATUSES, urls } from '../consts';
import { StatusPicker, AgentPicker } from '../containers';
import { DetailsButton } from './';
import type { TopicNodeType, ItemType } from '../flows';

const { khan } = urls;

const getPercent = (total: number, done: number): number =>
    iif(total === 0, 0, Math.floor(100 * done / total));

type Props = {|
    content: TopicNodeType,
    language: ItemType,
    code: string,
    historySlug: ?string,
    onHistory: (slug: ?string) => void,
|};

const TopicItem = ({
    content: { slug, title, meta: [, totl, trns, appr] },
    language, code, ...other
}: Props): Element<*> => {
    const trnsp = iif(totl === 0, 0, trns / totl * 100);
    const apprp = iif(totl === 0, 0, appr / totl * 100);
    const className = iif(apprp === 100, 'success',
        iif(trnsp === 100, 'info',
            iif(trnsp > 0, 'warning',
                'danger')));
    return (
        <tr className={className}>
            <td style={{ verticalAlign: 'middle' }}>
                <DetailsButton {...other} slug={slug} />
                <a style={{ marginRight: '1em' }}
                    href={`${khan}/${code}/${slug}`}
                    target="_blank" rel="noreferrer noopener">
                    {`${title} `}
                    <span className="badge">
                        {totl}
                    </span>
                </a>
            </td>
            <td>
                <AgentPicker
                    slug={slug} />
            </td>
            <td>
                <StatusPicker
                    slug={slug}
                    statuses={STATUSES.topics} />
            </td>
            <td>
                <a className="btn btn-default"
                    href={`${khan}/translations/edit/${language.code}/${slug}`}
                    target="_blank" rel="noreferrer noopener">
                    {'go '}
                    <span className="badge">
                        {`${trns} \
                        (${getPercent(totl, trns)}%)`}
                    </span>
                </a>
            </td>
        </tr>
    );
};

export default TopicItem;
