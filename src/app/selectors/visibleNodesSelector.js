/* @flow */
import { createSelector } from 'reselect';
import { pickBy } from 'lodash';
import { CONTENT_GROUPS } from '../consts';
import filteredNodesSelector from './filteredNodesSelector';

/**
 * Checks to see whether given Crowdin based node (exercise, article, scratchpad) should be made
 * visible according to visibility filters.
 * @param  {string}  slug       item slug
 * @param  {Object}  node       content item to check
 * @param  {Object}  visibility filter to apply
 * @return {Boolean}            whether node should be visible or not
 */
const isVisibleCrowdin = (slug, node, visibility): boolean => {
    // data was missing for slugs that had special chars not supported by firebase
    if (!node.data) {
        throw Error(`No crowdin data found in node for slug ${slug}`);
    }
    // extract relevant statistics for translation of content data
    const [, totl, trns, appr] = node.data;
    // calculate whether node should be visible for given visibility state
    const isAppr = appr === totl && visibility.approved;
    const isTrns = trns === totl && appr !== totl && visibility.translated;
    const isFrsh = trns === 0 && visibility.fresh;
    const isDoin = trns > 0 && trns < totl && visibility.doing;
    // return final node visibility
    return isTrns || isAppr || isFrsh || isDoin;
};

/**
* Checks to see whether given video node should be made visible according to visibility filters.
* @param  {string}  slug       item slug
* @param  {Object}  node       content item to check
* @param  {Object}  visibility filter to apply
* @return {Boolean}            whether node should be visible or not
 */
const isVisibleVideo = (slug, node, visibility) => {
    // data was missing for slugs that had special chars not supported by firebase
    if (!node.subdub) {
        throw Error(`No video data found in node for slug ${slug}`);
    }
    // extract relevant staatuses for video translations
    const [subbed, dubbed] = node.subdub;
    // calculate whether node should be visible for given visibility state
    const isDubd = dubbed && visibility.dubbed;
    const isSubd = subbed && !dubbed && visibility.subtitled;
    const isFrsh = !subbed && !dubbed && visibility.fresh;
    // return final node visibility
    return isSubd || isDubd || isFrsh;
};

/**
* Checks to see whether given topic node should be made visible according to visibility filters.
* @param  {string}  slug       item slug
* @param  {Object}  node       content item to check
* @param  {Object}  visibility filter to apply
* @return {Boolean}            whether node should be visible or not
 */
const isVisibleTopic = (slug, node, visibility): boolean => {
    // metadata was missing for slugs that had special chars not supported by firebase
    if (!node.meta) {
        throw Error(`No topic metadata found in node for slug ${slug}`);
    }
    // extract relevant statistics for translation of metadata
    const [, totl, trns, appr] = node.meta;
    // calculate whether node should be visible for given visibility state
    const isAppr = appr === totl && visibility.approved;
    const isTrns = trns === totl && appr !== totl && visibility.translated;
    const isFrsh = trns === 0 && visibility.fresh;
    const isDoin = trns > 0 && trns < totl && visibility.doing;
    // return final node visibility
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
        (node, slug) => isVisible(slug, node, visibility)
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
