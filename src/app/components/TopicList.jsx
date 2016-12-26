/* @flow */
import React from 'react';
import type { Element } from 'react';
import { map } from 'lodash';
import type { TopicNodeType, NodeMapType, ItemType } from '../flows';
import { CONTENT_LETTERS } from '../consts';
import TopicItem from './TopicItem';

type PropsType = {
    type: string,
    nodes: NodeMapType,
    language: ItemType,
};

const TopicList = ({ type, nodes, ...other }: PropsType): Element<*> =>
    <div>
        <table className="table">
            <thead>
                <tr className="active">
                    <th>Name</th>
                    <th>Agent</th>
                    <th>Status</th>
                    <th>Translate</th>
                </tr>
            </thead>
            <tbody>
                {map(
                    nodes,
                    (node: TopicNodeType, slug: string): Element<*> =>
                        <TopicItem
                            {...other}
                            key={slug}
                            code={CONTENT_LETTERS[type]}
                            content={node} />
                )}
            </tbody>
        </table>
    </div>;

export default TopicList;
