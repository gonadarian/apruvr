/* @flow */
import React, { type Element } from 'react';
import { iif } from '../utils';
import { STATUSES, urls } from '../consts';
import { StatusPicker, AgentPicker } from '../containers';
import { DetailsButton } from './';
import type { VideoNodeType, ItemType } from '../flows';

const { khan } = urls;

const getRowClass = (subbed: boolean, dubbed: boolean): string =>
    iif(dubbed, 'success',
        iif(subbed, 'info', 'danger'));

type PropsType = {
    content: VideoNodeType,
    language: ItemType,
    historySlug: ?string,
    onHistory: (slug: ?string) => void,
};

const VideoItem = ({
    content: { slug, title, subdub: [subbed, dubbed] },
    language, ...other
}: PropsType): Element<*> =>
    <tr className={getRowClass(subbed, dubbed)}>
        <td>
            <DetailsButton {...other} slug={slug} />
            <a className="btn btn-link"
                href={`${khan}/v/${slug}`}
                target="_blank">
                {title}
            </a>
        </td>
        <td>
            <AgentPicker
                slug={slug} />
        </td>
        <td>
            <StatusPicker
                slug={slug}
                statuses={STATUSES.videos} />
        </td>
        <td>
            <a className="btn btn-default"
                href={`${khan}/translate/videos/${slug}/subtitle?lang=${language.code}`}
                target="_blank">
                {'go '}
                <span className="badge">
                    {iif(subbed, 'yes', 'no')}
                </span>
            </a>
        </td>
        <td>
            <a className="btn btn-default"
                href={`v/${slug}`}
                target="_blank">
                {'go '}
                <span className="badge">
                    {iif(dubbed, 'yes', 'no')}
                </span>
            </a>
        </td>
    </tr>;

export default VideoItem;
