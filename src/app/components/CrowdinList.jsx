import React, { PropTypes } from 'react';
import map from 'lodash/map';
import filter from 'lodash/filter';
import ApruvrTypes from '../types';
import { TYPES } from '../consts';
import CrowdinItem from './CrowdinItem';

function visibleCrowdin(content, visibility) {
    const totl = content.wordCount;
    const trns = content.translatedWordCount;
    const appr = content.approvedWordCount;

    const isAppr = appr === totl && visibility.approved;
    const isTrns = trns === totl && appr !== totl && visibility.translated;
    const isFrsh = trns === 0 && visibility.fresh;
    const isDoin = trns > 0 && trns < totl && visibility.doing;

    return isTrns || isAppr || isFrsh || isDoin;
}

const CrowdinList = ({ type, nodes, visibility, ...other }) =>
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
                    filter(
                        nodes,
                        (content) => visibleCrowdin(content, visibility)
                    ),
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
    visibility: ApruvrTypes.choices.isRequired,
};

export default CrowdinList;
