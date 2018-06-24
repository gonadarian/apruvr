/* @flow */
import React, { type Element } from 'react';
import { map, size, startsWith } from 'lodash';
import styles from '../styles/main.less';

const TOPIC_INDENT = 20;

type TopicType = {
    slug: string,
    title: string,
    topics: {[id: string]: TopicType},
};

export type TopicTreeType = {
    tree: {root: TopicType},
    selected: string,
    onChoose: (path: string) => void,
};

const TopicTree = ({ tree, ...other }: TopicTreeType): Element<*> =>
    <TopicList
        {...other}
        path="root"
        level={1}
        topics={tree.root.topics} />;

type ListPropsType = {
    topics: {[id: string]: TopicType},
    path: string,
    selected: string,
    level: number,
    onChoose: (path: string) => void,
};

const TopicList = ({ topics, path, ...other }: ListPropsType): Element<*> =>
    <div className="btn-group-vertical btn-group-justified">
        {map(
            topics,
            (topic: TopicType, key: string): Element<*> =>
                <TopicItem
                    {...other}
                    key={key}
                    topic={topic}
                    path={`${path}.${topic.slug}`} />
        )}
    </div>;


const getItemClass = (selected: string, path: string): string => {
    const className = selected === path
        ? 'btn-primary'
        : startsWith(selected, `${path}.`)
            ? 'btn-info'
            : 'btn-default';
    const style = `btn btn-block ${styles.btnText} ${className}`;
    return style;
};

type ItemPropsType = {
    topic: TopicType,
    path: string,
    selected: string,
    level: number,
    onChoose: (path: string) => void,
};

const TopicItem = ({ topic, path, selected, level, onChoose }: ItemPropsType): Element<*> =>
    <div>
        <div
            className={getItemClass(selected, path)}
            style={{ textAlign: 'left', paddingLeft: `${level * TOPIC_INDENT}px` }}
            onClick={(event: Event) => {
                event.stopPropagation();
                onChoose(path);
            }}>
            {topic.title}
        </div>
        {size(topic.topics) > 0 && startsWith(`${selected}.`, `${path}.`) &&
            <TopicList
                path={path}
                selected={selected}
                level={level + 1}
                topics={topic.topics}
                onChoose={onChoose}/>
        }
    </div>;

export default TopicTree;
