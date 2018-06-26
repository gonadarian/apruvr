/* @flow */
import type { Store } from './store';
import type { Action, Dispatch } from './actions';
import type { State, GetState } from './reducers';

export type UserType = {
    uid: string,
    displayName: string,
    email: string,
    photoURL: string,
};

export type UserMapType = {[uid: string]: UserType};

export type ItemType = {
    code: string,
    name: string,
    note?: string,
    crowdin?: string,
};

export type NodeType = {
    slug: string;
    title: string;
};

export type CrowdinNodeType = NodeType & {
    data: number[];
};

export type VideoNodeType = NodeType & {
    subdub: boolean[];
    duration?: number;
};

export type TopicNodeType = NodeType & {
    meta: number[];
    children: Array<Array<string>>,
    topics?: ?{[slug: string]: TopicNodeType}
};

export type NodeMapType = {[slug: string]: NodeType};

export type NodesType = {
    exercises: {[slug: string]: CrowdinNodeType},
    articles: {[slug: string]: CrowdinNodeType},
    scratchpads: {[slug: string]: CrowdinNodeType},
    videos: {[slug: string]: VideoNodeType},
    topics: {[slug: string]: TopicNodeType},
};

export type WorkflowType = {
    uid?: string,
    status?: string,
};

export type WorkflowMapType = {[slug: string]: WorkflowType};

export type HistoryRecordType = {
    time: number;
    uid: ?string;
    status: ?string;
};

export type HistoryType = {
    slug: string;
    timeline: ?{[key: string]: HistoryRecordType};
};

export type DurationsType = {[ytid: string]: number};

export type ActionType = (dispatch: Dispatch, getState: GetState) => void;

export type RouteParamsType = {
    lang: ?string,
    kind: ?string,
    topic: ?string,
};

// re-export types for conveniance
export type {
    Action,
    Dispatch,
    Store,
    State,
    GetState,
};
