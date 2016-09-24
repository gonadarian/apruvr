import { createSelector } from 'reselect';
import forIn from 'lodash/forIn';
import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';
import transform from 'lodash/transform';
import { NAMES } from '../helpers/consts';
import topicTreeSelector from './topicTreeSelector';

function loadSlugs(topic, slugs, path) {
    forEach(
        topic.children,
        (child) => {slugs[NAMES[child[0]]][child[1]] = path;});

    forIn(
        topic.topics,
        (current) => loadSlugs(current, slugs, [...path, current.slug]));
}

function filterNodes(nodes, topic, tree, content) {
    const startPath = topic.split('.').slice(1);
    const localTopic = reduce(
        startPath,
        (currTopic, slug) => currTopic.topics[slug],
        tree.root);

    const slugs = { exercises: {}, articles: {}, videos: {}, scratchpads: {} };
    loadSlugs(localTopic, slugs, startPath);

    const contentNodes = nodes[content.code];
    const filtered = transform(
        slugs[content.code],
        (result, path, slug) => {result[slug] = { ...contentNodes[slug], path };},
        {});

    return filtered;
}

export default createSelector(
    [
        (state) => state.nodes,
        (state) => state.topic,
        (state) => state.content,
        topicTreeSelector,
    ],
    (nodes, topic, content, tree) => filterNodes(nodes, topic, tree, content)
);
