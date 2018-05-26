/* @flow */
import { createSelector } from 'reselect';
import { pickBy } from 'lodash';
import { CONTENT_GROUPS } from '../consts';
import filteredNodesSelector from './filteredNodesSelector';

/**
 * Checks to see whether given Crowdin based node (exercise, article, scratchpad) should be made
 * visible according to visibility filters.
 * @param  {Object}  node       content item to check
 * @param  {Object}  visibility filter to apply
 * @return {Boolean}            whether node should be visible or not
 */
const isVisibleCrowdin = (node, visibility): boolean => {
    const totl = node.translatableWordCount;
    const trns = node.translatedWordCount;
    const appr = node.approvedWordCount;

    const isAppr = appr === totl && visibility.approved;
    const isTrns = trns === totl && appr !== totl && visibility.translated;
    const isFrsh = trns === 0 && visibility.fresh;
    const isDoin = trns > 0 && trns < totl && visibility.doing;

    return isTrns || isAppr || isFrsh || isDoin;
};

/**
* Checks to see whether given video node should be made visible according to visibility filters.
* @param  {Object}  node       content item to check
* @param  {Object}  visibility filter to apply
* @return {Boolean}            whether node should be visible or not
 */
const isVisibleVideo = (node, visibility) => {
    const isDubd = node.dubbed && visibility.dubbed;
    const isSubd = node.subbed && !node.dubbed && visibility.subtitled;
    const isFrsh = !node.subbed && !node.dubbed && visibility.fresh;

    return isSubd || isDubd || isFrsh;
};

/**
* Checks to see whether given topic node should be made visible according to visibility filters.
* @param  {Object}  node       content item to check
* @param  {Object}  visibility filter to apply
* @return {Boolean}            whether node should be visible or not
 */
const isVisibleTopic = (node, visibility): boolean => {
    const totl = node.metadataWordCount;
    const trns = node.metadataTranslatedWordCount;
    const appr = node.metadataApprovedWordCount;

    const isAppr = appr === totl && visibility.approved;
    const isTrns = trns === totl && appr !== totl && visibility.translated;
    const isFrsh = trns === 0 && visibility.fresh;
    const isDoin = trns > 0 && trns < totl && visibility.doing;

    return isTrns || isAppr || isFrsh || isDoin;
};

const VISIBILITY_CHECKERS = {
    crowdin: isVisibleCrowdin,
    videos:  isVisibleVideo,
    topics:  isVisibleTopic,
};

/**
* Filter all the nodes according to visibility filters.
* @param  {Object}  nodes       content items to check
* @param  {string}  content     content type chosen
* @param  {Object}  visibility  filter to apply
* @return {Object}              filtered list of nodes
 */
const visibleNodes = (nodes, content, visibility) => {
    // mapping from contenty type to content group
    const group = CONTENT_GROUPS[content.code];
    // get viibilit checker for given content group
    const isVisible = VISIBILITY_CHECKERS[group];
    // filter the nodes via pickBy for objects which is the same as map is for arrays
    const filtered = pickBy(
        nodes,
        (node) => isVisible(node, visibility)
    );
    return filtered;
};

export default createSelector(
    [
        filteredNodesSelector,
        (state) => state.content,
        (state) => state.visibility,
    ],
    (nodes, content, visibility) => visibleNodes(nodes, content, visibility)
);
