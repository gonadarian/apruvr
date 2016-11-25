/* @flow */
import React from 'react';
import type { Element } from 'react';
import map from 'lodash/map';
import { TYPES } from '../consts';
import type { CrowdinNodeType, NodesType, ItemType } from '../flows';
import CrowdinItem from './CrowdinItem';

type PropsType = {
    type: string,
    nodes: NodesType,
    language: ItemType,
};

const CrowdinList = ({ type, nodes, ...other }: PropsType): Element<*> =>
    <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Agent</th>
                    <th>Status</th>
                    <th>Translate</th>
                    <th>Approve</th>
                </tr>
            </thead>
            <tbody>
                {map(
                    nodes,
                    (node: CrowdinNodeType, slug: string): Element<*> =>
                        <CrowdinItem
                            {...other}
                            key={slug}
                            code={TYPES[type]}
                            content={node} />
                )}
            </tbody>
        </table>
    </div>;

export default CrowdinList;
