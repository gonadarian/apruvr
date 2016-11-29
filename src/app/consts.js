/* @flow */

export type LanguageType = {
    code: string,
    name: string,
    note?: string,
    crowdin?: string,
};

export const LANGUAGES: Array<LanguageType> = [
    { code: 'bg', name: 'Bulgarian' },
    { code: 'nl', name: 'Dutch' },
    { code: 'fr', name: 'French' },
    { code: 'ka', name: 'Georgian' },
    { code: 'de', name: 'German' },
    { code: 'gr', name: 'Greek' },
    { code: 'it', name: 'Italian' },
    { code: 'ko', name: 'Korean' },
    { code: 'pl', name: 'Polish' },
    { code: 'pt', name: 'Portuguese', note: 'Brazil', crowdin: 'ptbr' },
    { code: 'pt-pt', name: 'Portuguese', note: 'Portugal', crowdin: 'pt' },
    { code: 'ru', name: 'Russian' },
    { code: 'sr', name: 'Serbian', note: 'Cyrillic' },
    { code: 'es', name: 'Spanish' },
    { code: 'tr', name: 'Turkish' },
];

export const TYPES: {[contentKind: string]: string} = {
    exercises:      'e',
    articles:       'a',
    scratchpads:    'p',
    videos:         'v',
    topics:         't',
};

export type ContentKindType = $Keys<typeof TYPES>;

export type StatusType =
    'translating' | 'translated' | 'captioning' | 'captioned' |
    'revising' | 'rejected' | 'revised' | 'approved';

export const STATUSES: {[contentGroup: string]: StatusType[]} = {
    crowdin:    ['translating', 'translated', 'revising', 'rejected', 'revised', 'approved'],
    videos:      ['captioning', 'captioned', 'revising', 'rejected', 'revised', 'approved'],
    topics:      ['translating', 'translated', 'revising', 'rejected', 'revised', 'approved'],
};

export type ContentGroupType = $Keys<typeof STATUSES>;

export const IMPORTANT_STATUSES: {[status: StatusType]: true} = {
    translated: true,
    captioned:  true,
    revised:    true,
    approved:   true,
};

export const VISIBILITIES = {
    fresh:      'New content',
    doing:      'In progress',
    translated: 'Translated',
    approved:   'Approved',
    subtitled:  'Subtitled',
    dubbed:     'Dubbed',
};

export type VisibilityType = $Keys<typeof VISIBILITIES>;

export const PICKS: {[contentKind: ContentKindType]: VisibilityType[]} = {
    exercises:      ['fresh', 'doing', 'translated', 'approved'],
    articles:       ['fresh', 'doing', 'translated', 'approved'],
    scratchpads:    ['fresh', 'doing', 'translated', 'approved'],
    videos:         ['fresh', 'subtitled', 'dubbed'],
    topics:         ['fresh', 'doing', 'translated', 'approved'],
};

export const TYPE_GROUPS: {[contentKind: ContentKindType]: ContentGroupType} = {
    exercises:      'crowdin',
    articles:       'crowdin',
    scratchpads:    'crowdin',
    videos:         'videos',
    topics:         'topics',
};

export const NAMES: {[contentKindName: string]: ContentKindType} = {
    Exercise:   'exercises',
    Article:    'articles',
    Video:      'videos',
    Scratchpad: 'scratchpads',
    Topic:      'topics',
};

export type ContentNameType = $Keys<typeof NAMES>;

export const CONTENTS: Array<{ code: ContentKindType, name: ContentNameType}> = [
    { code: 'exercises', name: 'Exercises' },
    { code: 'articles', name: 'Articles' },
    { code: 'videos', name: 'Videos' },
    { code: 'scratchpads', name: 'Scratchpads' },
    { code: 'topics', name: 'Descriptions' },
];
