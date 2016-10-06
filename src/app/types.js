import { PropTypes } from 'react';

const item =
    PropTypes.shape({
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        note: PropTypes.string,
    });

const items =
    PropTypes.arrayOf(item);

const choices =
    PropTypes.objectOf(PropTypes.bool.isRequired);

const topic =
    PropTypes.shape({
        topics: PropTypes.object,
    });

const topics =
    PropTypes.objectOf(topic);

export default {
    item,
    items,
    choices,
    topic,
    topics,
};
