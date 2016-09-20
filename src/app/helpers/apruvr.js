import React from 'react';

const item =
    React.PropTypes.shape({
        code: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        note: React.PropTypes.string,
    });

const items =
    React.PropTypes.arrayOf(item);

const choices =
    React.PropTypes.objectOf(React.PropTypes.bool.isRequired);

const topic =
    React.PropTypes.shape({
        topics: React.PropTypes.object,
    });

const topics =
    React.PropTypes.objectOf(topic);

export default {
    PropTypes: {
        item,
        items,
        choices,
        topic,
        topics,
    },
};
