/* @flow */
import React from 'react';
import type { Element } from 'react';
import { sprintf } from 'sprintf-js';
import type { CrowdinNodeType, ItemType } from '../flows';
import { STATUSES } from '../consts';
import { StatusPicker } from '../containers';
import { AgentPicker } from '../containers';

type PropsType = {
    content: CrowdinNodeType,
    language: ItemType,
    code: string,
};

const CrowdinItem = ({
    content: { slug, title, wordCount, translatedWordCount, approvedWordCount },
    language,
    code,
}: PropsType): Element<*> => {

    const trnsp = wordCount === 0 ? 0 : translatedWordCount / wordCount * 100;
    const apprp = wordCount === 0 ? 0 : approvedWordCount / wordCount * 100;

    const className = apprp === 100
        ? 'success'
        : trnsp === 100
            ? 'info'
            : trnsp > 0
                ? 'warning'
                : 'danger';

    // Crowdin uses different language codes then Khan Academy
    const crowdin = language.crowdin ? language.crowdin : language.code;

    return (
        <tr className={className}>
            <td>
                <a
                    className="btn btn-link"
                    href={`https://www.khanacademy.org/${code}/${slug}`}
                    target="_blank">
                        {title}
                        {' '}
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
                <a
                    className="btn btn-default"
                    href={`https://translate.khanacademy.org/${code}/${slug}`}
                    target="_blank">
                        go
                        {' '}
                        <span className="badge">
                            {translatedWordCount} ({sprintf('%.0f', trnsp)}%)
                        </span>
                </a>
            </td>

            <td>
                <a
                    className="btn btn-default"
                    href={`https://crowdin.com/proofread/khanacademy/all/enus-${crowdin}#q=/${slug}`}
                    target="_blank">
                        go
                        {' '}
                        <span className="badge">
                            {approvedWordCount} ({sprintf('%.0f', apprp)}%)
                        </span>
                </a>
            </td>
        </tr>
    );
};

export default CrowdinItem;
