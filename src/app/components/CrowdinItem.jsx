/* @flow */
import React, { type Element } from 'react';
import { iif } from '../utils';
import { STATUSES, urls } from '../consts';
import { StatusPicker, AgentPicker } from '../containers';
import { DetailsButton } from './';
import type { CrowdinNodeType, ItemType } from '../flows';

const { khan, proofread, translate } = urls;

const getRowClass = (totl, trns, appr): string =>
    iif(appr === totl, 'success',
        iif(trns === totl, 'info',
            iif(trns > 0, 'warning',
                'danger')));

const getPercent = (total: number, done: number): number =>
    iif(total === 0, 0, Math.floor(100 * done / total));

// Crowdin uses different language codes then Khan Academy
const getLangCode = ({ crowdin, code }: ItemType): string =>
    crowdin || code;

type PropsType = {
    content: CrowdinNodeType,
    language: ItemType,
    code: string,
    onHistory: (slug: ?string) => void,
};

const CrowdinItem = ({
    content: { slug, title, data: [, totl, trns, appr] },
    language,
    code,
    onHistory,
}: PropsType): Element<*> =>
    <tr className={getRowClass(totl, trns, appr)}>
        <td>
            <DetailsButton id={slug} onExpand={onHistory} />
            <a className="btn btn-link"
                href={`${khan}/${code}/${slug}`}
                target="_blank">
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
                statuses={STATUSES.crowdin} />
        </td>
        <td>
            <a className="btn btn-default"
                href={`${translate}/${code}/${slug}`}
                target="_blank">
                {'go '}
            </a>
        </td>
        <td>
            <a className="btn btn-default"
                href={`${khan}/translations/edit/${language.code}/${code}/${slug}`}
                target="_blank">
                {'go '}
                <span className="badge">
                    {`${trns} \
                    (${getPercent(totl, trns)}%)`}
                </span>
            </a>
        </td>
        <td>
            <a className="btn btn-default"
                href={`${proofread}/all/enus-${getLangCode(language)}#q=/${slug}`}
                target="_blank">
                {'go '}
                <span className="badge">
                    {`${appr} \
                    (${getPercent(totl, appr)}%)`}
                </span>
            </a>
        </td>
    </tr>;

export default CrowdinItem;
