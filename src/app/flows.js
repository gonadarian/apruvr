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
}

export type NodeMapType = {[slug: string]: NodeType};

export type VideoNodeType = NodeType & {
    subbed: boolean;
    dubbed: boolean;
}

export type CrowdinNodeType = NodeType & {
    translatableWordCount: number;
    translatedWordCount: number;
    approvedWordCount: number;
}

export type TopicNodeType = NodeType & {
    metadataWordCount: number;
    metadataTranslatedWordCount: number;
    metadataApprovedWordCount: number;
}

export type WorkflowType = {
    uid?: string,
    status?: string,
};

export type WorkflowMapType = {[slug: string]: WorkflowType};

export type HistoryRecordType = {
    time: number;
    uid: ?string;
    status: ?string;
}

export type HistoryType = {
    slug: string;
    timeline: ?{[key: string]: HistoryRecordType};
}

export type ActionType = (dispatch: Dispatch, getState: GetState) => void;

export type RouteParamsType = {
    land?: string,
    kind?: string,
    topic?: string,
};

// re-export types for conveniance
export type {
    Action,
    Dispatch,
    Store,
    State,
    GetState,
};
