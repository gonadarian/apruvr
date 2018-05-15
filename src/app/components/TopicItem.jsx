/* @flow */
import React, { type Element } from 'react';
import { iif } from '../utils';
import { STATUSES, urls } from '../consts';
import { StatusPicker, AgentPicker } from '../containers';
import type { TopicNodeType, ItemType } from '../flows';

const { khan } = urls;

const getPercent = (total: number, done: number): number =>
    iif(total === 0, 0, Math.floor(100 * done / total));

type PropsType = {
    content: TopicNodeType,
    language: ItemType,
    code: string,
};

const TopicItem = ({
    content: {
        slug,
        title,
        metadataWordCount,
        metadataTranslatedWordCount,
        metadataApprovedWordCount,
    },
    language,
    code,
}: PropsType): Element<*> => {
    const trnsp = iif(metadataWordCount === 0, 0,
        metadataTranslatedWordCount / metadataWordCount * 100);
    const apprp = iif(metadataWordCount === 0, 0,
        metadataApprovedWordCount / metadataWordCount * 100);
    const className = iif(apprp === 100, 'success',
        iif(trnsp === 100, 'info',
            iif(trnsp > 0, 'warning',
                'danger')));
    return (
        <tr className={className}>
            <td>
                <a className="btn btn-link"
                    href={`${khan}/${code}/${slug}`}
                    target="_blank">
                    {`${title} `}
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
                <a className="btn btn-default"
                    href={`${khan}/translations/edit/${language.code}/${slug}`}
                    target="_blank">
                    {'go '}
                    <span className="badge">
                        {`${metadataTranslatedWordCount} \
                        (${getPercent(metadataWordCount, metadataTranslatedWordCount)}%)`}
                    </span>
                </a>
            </td>
        </tr>
    );
};

export default TopicItem;
