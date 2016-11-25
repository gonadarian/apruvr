/* @flow */
export type UserType = {
    uid: string,
    displayName: string,
    email: string,
    photoURL: string,
};

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

export type NodesType = {
    [slug: string]: NodeType,
};
