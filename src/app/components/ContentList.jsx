import { PropTypes } from 'react';
import { TYPE_GROUPS } from '../consts';
import CrowdinList from './CrowdinList';
import VideoList from './VideoList';

const STRATEGY = {
    videos:     VideoList,
    crowdin:    CrowdinList,
};

const ContentList = ({ type, ...other }) => {
    const listComponent = STRATEGY[TYPE_GROUPS[type]];
    return listComponent({ ...other, type });
};

ContentList.propTypes = {
    type:       PropTypes.string.isRequired,
};

export default ContentList;
