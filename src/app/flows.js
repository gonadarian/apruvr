/* @flow */

declare module 'less' {
    declare var exports: { [key: string]: string };
}

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

class NodeType {
    slug: string;
    title: string;
}

export type NodeMapType = {[slug: string]: NodeType};

export class VideoNodeType extends NodeType {
    subbed: boolean;
    dubbed: boolean;
}

export class CrowdinNodeType extends NodeType {
    wordCount: number;
    translatedWordCount: number;
    approvedWordCount: number;
}

export class TopicNodeType extends NodeType {
    metadataWordCount: number;
    metadataTranslatedWordCount: number;
    metadataApprovedWordCount: number;
}

export type WorkflowType = {
    uid?: string,
    status?: string,
};

export type WorkflowMapType = {[slug: string]: WorkflowType};
