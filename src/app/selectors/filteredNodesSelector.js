/* @flow */
import { createSelector } from 'reselect';
import { forIn, reduce, forEach, transform } from 'lodash';
import { NAMES } from '../consts';
import topicTreeSelector from './topicTreeSelector';

const loadSlugs = (topic, slugs, path) => {
    slugs.topics[topic.slug] = topic;

    forEach(
        topic.children,
        (child) => {
            slugs[NAMES[child[0]]][child[1]] = path;
        }
    );

    forIn(
        topic.topics,
        (current) => loadSlugs(current, slugs, [...path, current.slug])
    );
};

const filterNodes = (nodes, topic, tree, content) => {
    const startPath = topic.split('.').slice(1);
    const localTopic = reduce(
        startPath,
        (currTopic, slug) => currTopic.topics[slug],
        tree.root
    );

    const slugs = { exercises: {}, articles: {}, videos: {}, scratchpads: {}, topics: {} };
    loadSlugs(localTopic, slugs, startPath);

    const contentNodes = nodes[content.code];
    const filtered = transform(
        slugs[content.code],
        (result, path, slug) => {
            result[slug] = { ...contentNodes[slug], path };
        },
        {}
    );

    return filtered;
};

export default createSelector(
    [
        (state) => state.nodes,
        (state) => state.topic,
        (state) => state.content,
        topicTreeSelector,
    ],
    (nodes, topic, content, tree) => filterNodes(nodes, topic, tree, content)
);
