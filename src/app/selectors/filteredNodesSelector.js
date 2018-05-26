/* @flow */
import { createSelector } from 'reselect';
import { forIn, reduce, forEach, transform } from 'lodash';
import { NAMES } from '../consts';
import topicTreeSelector from './topicTreeSelector';

/**
 * Loads full topics in a list and full paths to items of other content types.
 * @param  {Object}   topic topic tree to recursivelly traverse
 * @param  {Object}   slugs structure to store found data
 * @param  {string[]} path  slug array representing full path
 * @return {Object}         content list with topics and paths for other content types
 */
const loadSlugs = (topic, slugs, path: string[]) => {
    // add current topic to the topic list, recursion will add them all
    slugs.topics[topic.slug] = topic;
    // get and store full paths for all slugs
    forEach(
        // topic children don't include topics themselves, only true content types
        topic.children,
        (child) => {
            const [contentName, contentSlug] = child;
            slugs[NAMES[contentName]][contentSlug] = path;
        }
    );
    // go through the topic tree recursively
    forIn(
        topic.topics,
        (current) =>
            // load for each sub-topic, and pass the path extended by current slug
            loadSlugs(current, slugs, [...path, current.slug])
    );
};

/**
 * Filter the nodes for given topic and content type.
 * @param  {Object} nodes   flat list of nodes, grouped by content type
 * @param  {string} topic   path to parent topic, dot separated list of slugs from hierarchy
 * @param  {string} content chosen content type to filter by
 * @param  {[type]} tree    pre-generated tree of topics
 * @return {[type]}         those nodes of given types and descendants of given content type
 */
const filterNodes = (nodes, topic, content, tree) => {
    // remove starting 'root' from the topic path, e.g. from 'root.math' to ['math']
    const startPath = topic.split('.').slice(1);
    // go through the topic path, slug by slug, and traverse the tree to find target topic
    const localTopic = reduce(
        startPath,
        (currTopic, slug) => currTopic.topics[slug],
        tree.root
    );
    // prepare the resulting slug list...
    const slugs = { exercises: {}, articles: {}, videos: {}, scratchpads: {}, topics: {} };
    // ... and populate it with paths alone
    loadSlugs(localTopic, slugs, startPath);
    // take only those nodes of the given content type
    const contentNodes = nodes[content.code];
    // extend node data with information about the topic path to it
    const filtered = transform(
        slugs[content.code],
        (result, path, slug) => {
            // take the entire node plus add topic path
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
    (nodes, topic, content, tree) =>
        filterNodes(nodes, topic, content, tree)
);
