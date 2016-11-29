/* @flow */
import React from 'react';
import type { Element } from 'react';
import { sprintf } from 'sprintf-js';
import type { TopicNodeType, ItemType } from '../flows';
import { STATUSES } from '../consts';
import { StatusPicker } from '../containers';
import { AgentPicker } from '../containers';

type PropsType = {
    content: TopicNodeType,
    language: ItemType,
    code: string,
};

const TopicItem = ({
    content: { slug, title, metadataWordCount, metadataTranslatedWordCount, metadataApprovedWordCount },
    language,
    code,
}: PropsType): Element<*> => {

    const trnsp = metadataWordCount === 0 ? 0 : metadataTranslatedWordCount / metadataWordCount * 100;
    const apprp = metadataWordCount === 0 ? 0 : metadataApprovedWordCount / metadataWordCount * 100;

    const className = apprp === 100
        ? 'success'
        : trnsp === 100
            ? 'info'
            : trnsp > 0
                ? 'warning'
                : 'danger';

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
                            {metadataWordCount}
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
                <a
                    className="btn btn-default"
                    href={`https://www.khanacademy.org/translations/edit/${language.code}/${slug}`}
                    target="_blank">
                        go
                        {' '}
                        <span className="badge">
                            {metadataTranslatedWordCount} ({sprintf('%.0f', trnsp)}%)
                        </span>
                </a>
            </td>
        </tr>
    );
};

export default TopicItem;
