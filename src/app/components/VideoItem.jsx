/* @flow */
import React, { type Element } from 'react';
import { iif, seconds, words, minsec } from '../utils';
import { STATUSES, urls } from '../consts';
import { StatusPicker, AgentPicker } from '../containers';
import { DetailsButton } from './';
import type { VideoNodeType, ItemType } from '../flows';

const { khan, timedtext } = urls;

const getRowClass = (subbed: boolean, dubbed: boolean): string =>
    iif(dubbed, 'success',
        iif(subbed, 'info', 'danger'));

type Props = {|
    content: VideoNodeType,
    language: ItemType,
    historySlug: ?string,
    onHistory: (slug: ?string) => void,
|};

const VideoItem = ({
    content: { slug, title, subdub: [subbed, dubbed], duration, yt: [ytid] },
    language, ...other
}: Props): Element<'tr'> =>
    <tr className={getRowClass(subbed, dubbed)}>
        <td style={{ verticalAlign: 'middle' }}>
            <DetailsButton {...other} slug={slug} />
            <a style={{ marginRight: '1em' }}
                href={`${khan}/v/${slug}`}
                target="_blank" rel="noreferrer noopener">
                {title}
            </a>
            { duration &&
                <small className="text-muted">
                    {minsec(duration)}
                </small>
            }
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
            { duration
                ? <span className="badge">
                    { seconds(duration) }s / { words(duration) }w
                </span>
                : <span className="badge">...</span>
            }
        </td>
        <td>
            <a className="btn btn-default"
                href={`${
                    timedtext
                }?action_mde_edit_form=1&v=${ytid}&lang=${language.code}&tab=captions`}
                target="_blank" rel="noreferrer noopener">
                {'go '}
                <span className="badge">
                    {iif(subbed, 'yes', 'no')}
                </span>
            </a>
        </td>
        <td>
            <a className="btn btn-default"
                href={`v/${slug}`}
                target="_blank" rel="noreferrer noopener">
                {'go '}
                <span className="badge">
                    {iif(dubbed, 'yes', 'no')}
                </span>
            </a>
        </td>
    </tr>;

export default VideoItem;
