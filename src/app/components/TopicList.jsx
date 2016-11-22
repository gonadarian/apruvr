import React, { PropTypes } from 'react';
import map from 'lodash/map';
import { TYPES } from '../consts';
import TopicItem from './TopicItem';

const TopicList = ({ type, nodes, ...other }) =>
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
                    (content, key) =>
                        <TopicItem
                            {...other}
                            key={key}
                            code={TYPES[type]}
                            content={content} />
                )}
            </tbody>
        </table>
    </div>;

TopicList.propTypes = {
    nodes:      PropTypes.objectOf(PropTypes.object).isRequired,
    type:       PropTypes.string.isRequired,
};

export default TopicList;
