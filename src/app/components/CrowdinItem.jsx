/* @flow */
import React, { type Element } from 'react';
import { iif } from '../utils';
import { STATUSES, urls } from '../consts';
import { StatusPicker, AgentPicker } from '../containers';
import type { CrowdinNodeType, ItemType } from '../flows';

const { khan, proofread, translate } = urls;

const getRowClass = (
    translatableWordCount: number,
    translatedWordCount: number,
    approvedWordCount: number
): string =>
    iif(approvedWordCount === translatableWordCount, 'success',
        iif(translatedWordCount === translatableWordCount, 'info',
            iif(translatedWordCount > 0, 'warning',
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
};

const CrowdinItem = ({
    content: { slug, title, translatableWordCount, translatedWordCount, approvedWordCount },
    language,
    code,
}: PropsType): Element<*> =>
    <tr className={getRowClass(translatableWordCount, translatedWordCount, approvedWordCount)}>
        <td>
            <span className="glyphicon glyphicon-chevron-down" />
            <a className="btn btn-link"
                href={`${khan}/${code}/${slug}`}
                target="_blank">
                {`${title} `}
                <span className="badge">
                    {translatableWordCount}
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
                    {`${translatedWordCount} \
                    (${getPercent(translatableWordCount, translatedWordCount)}%)`}
                </span>
            </a>
        </td>
        <td>
            <a className="btn btn-default"
                href={`${proofread}/all/enus-${getLangCode(language)}#q=/${slug}`}
                target="_blank">
                {'go '}
                <span className="badge">
                    {`${approvedWordCount} \
                    (${getPercent(translatableWordCount, approvedWordCount)}%)`}
                </span>
            </a>
        </td>
    </tr>;

export default CrowdinItem;
