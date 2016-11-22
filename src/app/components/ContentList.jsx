/* @flow */
import React from 'react';
import type { Element } from 'react';
import { TYPE_GROUPS } from '../consts';
import CrowdinList from './CrowdinList';
import VideoList from './VideoList';
import TopicList from './TopicList';

const STRATEGY = {
    videos:     VideoList,
    crowdin:    CrowdinList,
    topics:     TopicList,
};

type PropsType = {
    type: string,
};

const ContentList = ({ type, ...other }: PropsType): Element<*> => {
    const List = STRATEGY[TYPE_GROUPS[type]];
    return <List type={type} { ...other } />;
};

export default ContentList;
