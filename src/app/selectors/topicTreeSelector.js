/* @flow */
import { createSelector } from 'reselect';
import { size, forIn, filter, isEmpty, forEach } from 'lodash';
import type { State } from '../flows';

/**
 * Tries to find a proper place in the tree for the given topic and stores it there.
 * @param {Object} topicList topic tree or branch
 * @param {Object} topic single topic to store in the tree
 * @return {boolean} whether topic was successfully stored in the tree
 */
const handleTopicList = (topicList, topic): boolean => {
    // this tree or branch is empty, so topic is not here
    if (size(topicList) === 0) {
        return false;
    }
    // if topic is found to be a child of this branch or tree then store it there
    if (topic.slug in topicList) {
        topicList[topic.slug] = topic;
        return true;
    }
    // recursively search deeper in the tree
    let success = false;
    forEach(
        filter(
            topicList,
            (item) => !isEmpty(item)
        ),
        (item) => {
            // if we found the place to store the topic...
            if (handleTopicList(item.topics, topic)) {
                // save the success flag
                success = true;
                // and stop itterating forEach loop
                return false;
            }
            return true;
        });
    // return the success of recursive search
    return success;
};

/**
 * Analyze a single topic and find its place in the tree. Optionally, attaches previously analyzed
 * children topics.
 * @param {Object} tree topic tree in its current state
 * @param {Object} item single topic
 * @return {void}
 */
const handleTopic = (tree, item) => {
    item.topics = {};
    // extract all child topics and store them in separate 'topics' property
    forEach(
        filter(
            item.children,
            (child) => child[0] === 'Topic'
        ),
        (topic) => {
            item.topics[topic[1]] = {};
        }
    );
    // store all content (non-topic) children in separate property
    item.children = filter(
        item.children,
        (child) => child[0] !== 'Topic');
    // check if any of the child topics is already in the root of the tree
    forIn(
        item.topics,
        (value, slug) => {
            if (slug in tree) {
                // place it in a proper part of the tree
                item.topics[slug] = tree[slug];
                // and remove it from root
                delete tree[slug];
            }
        });
    // add the item to the root of the tree only if the same item is not already in the tree
    const found = handleTopicList(tree, item);
    if (!found) {
        tree[item.slug] = item;
    }
};

/**
 * Creates a hierarchycal tree representation from the flat list of topics.
 * @param {Object} nodes flat list of all content nodes of all types
 * @return {Object} a tree of all the topics
 */
const createTopicTree = (nodes) => {
    // prepare an empty tree of topic to generate
    const topicTree = {};
    forEach(
        nodes.topics,
        // find a place in the tree for topics one by one
        (topic, slug) => handleTopic(topicTree, { slug, ...topic })
    );
    return topicTree;
};

export default createSelector(
    [
        (state: State) => state.nodes,
    ],
    (nodes) => nodes
        ? createTopicTree(nodes)
        : {}
);
