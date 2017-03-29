/* @flow */
import React from 'react';
import type { Element } from 'react';
import type { CrowdinNodeType, ItemType } from '../flows';
import { STATUSES } from '../consts';
import { StatusPicker } from '../containers';
import { AgentPicker } from '../containers';

const getRowClass = (wordCount: number, translatedWordCount: number, approvedWordCount: number): string =>
    approvedWordCount === wordCount
        ? 'success'
        : translatedWordCount === wordCount
            ? 'info'
            : translatedWordCount > 0
                ? 'warning'
                : 'danger';

const getPercent = (total: number, done: number): number =>
    total === 0 ? 0 : Math.floor(100 * done / total);

// Crowdin uses different language codes then Khan Academy
const getLangCode = ({ crowdin, code }: ItemType): string =>
    crowdin || code;

type PropsType = {
    content: CrowdinNodeType,
    language: ItemType,
    code: string,
};

const CrowdinItem = ({
    content: { slug, title, wordCount, translatedWordCount, approvedWordCount },
    language,
    code,
}: PropsType): Element<*> =>
    <tr className={getRowClass(wordCount, translatedWordCount, approvedWordCount)}>
        <td>
            <a className="btn btn-link"
                href={`https://www.khanacademy.org/${code}/${slug}`}
                target="_blank">
                    {`${title} `}
                    <span className="badge">
                        {wordCount}
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
                href={`https://translate.khanacademy.org/${code}/${slug}`}
                target="_blank">
                    {'go '}
            </a>
        </td>
        <td>
            <a className="btn btn-default"
                href={`https://www.khanacademy.org/translations/edit/${language.code}/${code}/${slug}`}
                target="_blank">
                    {'go '}
                    <span className="badge">
                        {`${translatedWordCount} \
                        (${getPercent(wordCount, translatedWordCount)}%)`}
                    </span>
            </a>
        </td>
        <td>
            <a className="btn btn-default"
                href={`https://crowdin.com/proofread/khanacademy/all/enus-${getLangCode(language)}#q=/${slug}`}
                target="_blank">
                    {'go '}
                    <span className="badge">
                        {`${approvedWordCount} \
                        (${getPercent(wordCount, approvedWordCount)}%)`}
                    </span>
            </a>
        </td>
    </tr>;

export default CrowdinItem;
