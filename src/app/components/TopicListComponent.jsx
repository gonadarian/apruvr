import React from 'react';

import Apruvr from '../helpers/Apruvr.jsx';

import map from 'lodash/map';
import size from 'lodash/size';

const TopicListComponent = ({ root, ...other }) =>
    <TopicList
        {...other}
        path="root"
        level={1}
        topics={root.topics} />;

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

    const style = 'btn btn-block ' + className;
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

TopicListComponent.propTypes = {
    root:       Apruvr.PropTypes.topic.isRequired,
    selected:   React.PropTypes.string.isRequired,
    onChoose:   React.PropTypes.func.isRequired,
};

TopicList.propTypes = {
    topics:     Apruvr.PropTypes.topics.isRequired,
    path:       React.PropTypes.string.isRequired,
};

TopicItem.propTypes = {
    topic:      Apruvr.PropTypes.topic.isRequired,
    path:       React.PropTypes.string.isRequired,
    selected:   React.PropTypes.string.isRequired,
    level:      React.PropTypes.number.isRequired,
    onChoose:   React.PropTypes.func.isRequired,
};

export default TopicListComponent;
