import handleReducers from './handler';
import { FETCH_NODES } from '../actions/index';

import size from 'lodash/size';
import forIn from 'lodash/forIn';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';

function handleTopicList(topicList, topic) {
    if (size(topicList) === 0) {
        return false;
    }

    if (topic.slug in topicList) {
        topicList[topic.slug] = topic;
        return true;
    }

    let success = false;
    forEach(
        filter(
            topicList,
            (item) => !isEmpty(item)),
        (item) => {
            if (handleTopicList(item.topics, topic)) {
                success = true;
                return false;
            }
            return true;
        });

    return success;
}

function handleTopic(tree, item) {
    item.topics = {};

    forEach(
        filter(
            item.children,
            (child) => child[0] === 'Topic'),
        (topic) => {item.topics[topic[1]] = {};});

    item.children = filter(
        item.children,
        (child) => child[0] !== 'Topic');

    forIn(
        item.topics,
        (value, slug) => {
            if (slug in tree) {
                item.topics[slug] = tree[slug];
                delete tree[slug];
            }
        });

    const found = handleTopicList(tree, item);
    if (!found) {
        tree[item.slug] = item;
    }
}

const handlers = {
    [FETCH_NODES]: (state, action) => {
        const newState = {};
        forEach(
            action.payload.data.nodes.topics,
            (topic) => handleTopic(newState, topic)
        );
        return newState;
    },
};

export default (state = null, action) =>
    handleReducers(handlers, state, action);
