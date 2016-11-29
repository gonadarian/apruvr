/* @flow */
import React from 'react';
import type { Element } from 'react';
import type { VideoNodeType, ItemType } from '../flows';
import { STATUSES } from '../consts';
import { StatusPicker } from '../containers';
import { AgentPicker } from '../containers';

const getRowClass = (subbed: boolean, dubbed: boolean): string =>
    dubbed
        ? 'success'
        : subbed
            ? 'info'
            : 'danger';

type PropsType = {
    content: VideoNodeType,
    language: ItemType,
};

const VideoItem = ({ content: { slug, title, subbed, dubbed }, language }: PropsType): Element<*> =>
    <tr className={getRowClass(subbed, dubbed)}>
        <td>
            <a
                className="btn btn-link"
                href={`https://www.khanacademy.org/v/${slug}`}
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
            <a
                className="btn btn-default"
                href={`https://www.khanacademy.org/translate/videos/${slug}/subtitle?lang=${language.code}`}
                target="_blank">
                    sub
                    {' '}
                    <span className="badge">
                        {subbed ? 'yes' : 'no'}
                    </span>
            </a>
        </td>

        <td>
            <a
                className="btn btn-default"
                href={`v/${slug}`}
                target="_blank">
                    dub
                    {' '}
                    <span className="badge">
                        {dubbed ? 'yes' : 'no'}
                    </span>
            </a>
        </td>
    </tr>;

export default VideoItem;
