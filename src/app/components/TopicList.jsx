/* @flow */
import React from 'react';
import type { Element } from 'react';
import map from 'lodash/map';
import type { TopicNodeType, NodesType, ItemType } from '../flows';
import { TYPES } from '../consts';
import TopicItem from './TopicItem';

type PropsType = {
    type: string,
    nodes: NodesType,
    language: ItemType,
};

const TopicList = ({ type, nodes, ...other }: PropsType): Element<*> =>
    <div>
        <table className="table">
            <thead>
                <tr>
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
                            code={TYPES[type]}
                            content={node} />
                )}
            </tbody>
        </table>
    </div>;

export default TopicList;
