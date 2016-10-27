import React, { PropTypes } from 'react';
import map from 'lodash/map';
import { TYPES } from '../consts';
import CrowdinItem from './CrowdinItem';

const CrowdinList = ({ type, nodes, ...other }) =>
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
                    (content, key) =>
                        <CrowdinItem
                            {...other}
                            key={key}
                            code={TYPES[type]}
                            content={content} />
                )}
            </tbody>
        </table>
    </div>;

CrowdinList.propTypes = {
    nodes:      PropTypes.objectOf(PropTypes.object).isRequired,
    type:       PropTypes.string.isRequired,
};

export default CrowdinList;
