import React, { PropTypes } from 'react';
import map from 'lodash/map';
import size from 'lodash/size';
import ApruvrTypes from '../helpers/apruvr';
import styles from '../styles/main.less';

const TopicTree = ({ tree, ...other }) =>
    <TopicList
        {...other}
        path="root"
        level={1}
        topics={tree.root.topics} />;

const TopicList = ({ topics, path, ...other }) =>
    <div className="btn-group-vertical btn-group-justified">
        {map(topics, (topic, key) =>
            <TopicItem
                {...other}
                key={key}
                topic={topic}
                path={path + '.' + topic.slug} />
        )}
    </div>;

function getItemClass(selected, path) {
    const className = selected === path
        ? 'btn-primary'
        : selected.startsWith(path)
            ? 'btn-info'
            : 'btn-default';

    const style = `btn btn-block ${styles.btnText} ${className}`;
    return style;
}

const TopicItem = ({ topic, path, selected, level, onChoose }) =>
    <div>
        <div
            className={getItemClass(selected, path)}
            style={{ textAlign: 'left', paddingLeft: (level * 20) + 'px' }}
            onClick={(event) => {
                event.stopPropagation();
                onChoose(path);
            }}>
                {topic.title}
        </div>

        {size(topic.topics) > 0 && selected.startsWith(path) &&
            <TopicList
                path={path}
                selected={selected}
                level={level + 1}
                topics={topic.topics}
                onChoose={onChoose}/>
        }
    </div>;

TopicTree.propTypes = {
    tree:       ApruvrTypes.topic.isRequired,
    selected:   PropTypes.string.isRequired,
    onChoose:   PropTypes.func.isRequired,
};

TopicList.propTypes = {
    topics:     ApruvrTypes.topics.isRequired,
    path:       PropTypes.string.isRequired,
};

TopicItem.propTypes = {
    topic:      ApruvrTypes.topic.isRequired,
    path:       PropTypes.string.isRequired,
    selected:   PropTypes.string.isRequired,
    level:      PropTypes.number.isRequired,
    onChoose:   PropTypes.func.isRequired,
};

export default TopicTree;
