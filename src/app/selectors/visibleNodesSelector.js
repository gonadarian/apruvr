import { createSelector } from 'reselect';
import { pickBy } from 'lodash';
import { TYPE_GROUPS } from '../consts';
import filteredNodesSelector from './filteredNodesSelector';

function isVisibleCrowdin(node, visibility) {
    const totl = node.wordCount;
    const trns = node.translatedWordCount;
    const appr = node.approvedWordCount;

    const isAppr = appr === totl && visibility.approved;
    const isTrns = trns === totl && appr !== totl && visibility.translated;
    const isFrsh = trns === 0 && visibility.fresh;
    const isDoin = trns > 0 && trns < totl && visibility.doing;

    return isTrns || isAppr || isFrsh || isDoin;
}

function isVisibleVideo(node, visibility) {
    const isDubd = node.dubbed && visibility.dubbed;
    const isSubd = node.subbed && !node.dubbed && visibility.subtitled;
    const isFrsh = !node.subbed && !node.dubbed && visibility.fresh;

    return isSubd || isDubd || isFrsh;
}

function isVisibleTopic(node, visibility) {
    const totl = node.metadataWordCount;
    const trns = node.metadataTranslatedWordCount;
    const appr = node.metadataApprovedWordCount;

    const isAppr = appr === totl && visibility.approved;
    const isTrns = trns === totl && appr !== totl && visibility.translated;
    const isFrsh = trns === 0 && visibility.fresh;
    const isDoin = trns > 0 && trns < totl && visibility.doing;

    return isTrns || isAppr || isFrsh || isDoin;
}

const STRATEGY = {
    crowdin:    isVisibleCrowdin,
    videos:     isVisibleVideo,
    topics:     isVisibleTopic,
};

function visibleNodes(nodes, content, visibility) {
    const isVisible = STRATEGY[TYPE_GROUPS[content.code]];
    const filtered = pickBy(
        nodes,
        (node) => isVisible(node, visibility)
    );
    return filtered;
}

export default createSelector(
    [
        filteredNodesSelector,
        (state) => state.content,
        (state) => state.visibility,
    ],
    (nodes, content, visibility) => visibleNodes(nodes, content, visibility)
);
