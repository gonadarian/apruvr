/* @flow */
import { createSelector } from 'reselect';
import { filter, reject, forEach, reduce } from 'lodash';
import type { State, NodesType } from '../flows';

/**
 * Used to recursively build the tree of topics.
 * @param  {NodesType} nodes      original data structure containing all content items
 * @param  {TopicNodeType} topic  current topic to work on
 * @return {void}
 */
const createTopicSubTree = (nodes, topic) => {
    // repeat for all sub-topics of given topic and populate new topics list
    topic.topics = reduce(
        // extract sub-topics from children list
        filter(
            topic.children,
            (child) => child[0] === 'Topic'
        ),
        (mem, [, slug]) => {
            // under sub-topic slug, inject entire topic from the original nodes structure
            mem[slug] = nodes.topics[slug];
            return mem;
        },
        {}
    );
    // remove topic from children list and leave only true content items there
    topic.children = reject(
        topic.children,
        (child) => child[0] === 'Topic');
    // repeat this process for all sub-topics of this topic
    forEach(
        topic.topics,
        (childTopic) => {
            // go deeper into the tree, recursively
            createTopicSubTree(nodes, childTopic);
        }
    );
};

/**
 * Convert list of topic nodes to hierarchical representation.
 * @param  {NodesType} nodes original data structure containing all content items
 * @return {TopicNodeType}   recursive data structure of topics containing sub-topics
 */
const createTopicTree = (nodes: NodesType) => {
    // as data storage and transfer is optimized, we duplicate slug data only now
    forEach(
        nodes.topics,
        (topic, slug) => {
            // slug used as a key for the node is now copied into the node itself
            topic.slug = slug;
        }
    );
    // start from an empty tree...
    const tree = {};
    // ... and set known root node as root for the tree...
    tree.root = nodes.topics.root;
    // ... and start generating tree from the root upwards..
    createTopicSubTree(nodes, tree.root);
    // ... and tree should be fully built now
    return tree;
};

export default createSelector(
    [
        (state: State) => state.nodes,
    ],
    (nodes) => nodes
        ? createTopicTree(nodes)
        : {}
);
