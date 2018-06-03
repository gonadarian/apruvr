/* @flow */
import React, { type Element } from 'react';
import CrowdinList from './CrowdinList';
import TopicList from './TopicList';
import VideoList from './VideoList';
import { CONTENT_GROUPS, type ContentCodeType } from '../consts';
import type { NodeMapType, ItemType } from '../flows';

const LISTS = {
    videos:  VideoList,
    crowdin: CrowdinList,
    topics:  TopicList,
};

export type ContentListType = {
    type: ContentCodeType,
    nodes: NodeMapType,
    language: ItemType,
    historySlug: ?string,
    onHistory: (slug: ?string) => void,
    pageSize: ?number,
    onPageExpand: (fullExpand: boolean) => void,
};

const ContentList = ({ type, ...other }: ContentListType): Element<*> => {
    const group = CONTENT_GROUPS[type];
    const List = LISTS[group];
    return <List
        { ...other }
        type={type} />;
};

export default ContentList;
