/* @flow */
import React from 'react';
import type { Element } from 'react';
import { CONTENT_GROUPS } from '../consts';
import type { ContentCodeType } from '../consts';
import CrowdinList from './CrowdinList';
import VideoList from './VideoList';
import TopicList from './TopicList';

const LISTS = {
    videos:     VideoList,
    crowdin:    CrowdinList,
    topics:     TopicList,
};

type PropsType = {
    type: ContentCodeType,
};

const ContentList = ({ type, ...other }: PropsType): Element<*> => {
    const List = LISTS[CONTENT_GROUPS[type]];
    return <List type={type} { ...other } />;
};

export default ContentList;
