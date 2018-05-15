/* @flow */
import { find } from 'lodash';

const khan = 'https://www.khanacademy.org';
const api = `${khan}/api/internal`;
const crowdin = 'https://crowdin.com';
const proofread = `${crowdin}https://crowdin.com/proofread/khanacademy`;
const translate = 'https://translate.khanacademy.org';

export const urls = {
    khan,
    api,
    crowdin,
    proofread,
    translate,
};

export type LanguageType = {
    code: string,
    name: string,
    note?: string,
    crowdin?: string,
};

export const LANGUAGES: LanguageType[] = [
    { code: 'zh-hans', name: 'Chinese', note: 'Simplified', crowdin: 'zhcn' },
    { code: 'bg', name: 'Bulgarian' },
    { code: 'cs', name: 'Czech' },
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

export const languageLookup = (langCode: ?string): ?LanguageType =>
    langCode
        ? find(LANGUAGES, ({ code }: LanguageType): boolean => code === langCode)
        : null;

export type StatusType =
    'translating' | 'translated' | 'captioning' | 'captioned' |
    'revising' | 'rejected' | 'revised' | 'approved';

export type StatusMapType = {[contentGroup: string]: StatusType[]};

export const STATUSES: StatusMapType = {
    crowdin: ['translating', 'translated', 'revising', 'rejected', 'revised', 'approved'],
    videos:  ['captioning', 'captioned', 'revising', 'rejected', 'revised', 'approved'],
    topics:  ['translating', 'translated', 'revising', 'rejected', 'revised', 'approved'],
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
export type VisibilityListType = {[type: VisibilityType]: boolean};

export const CONTENT_LETTERS: {[contentCode: string]: string} = {
    exercises:   'e',
    articles:    'a',
    scratchpads: 'p',
    videos:      'v',
    topics:      't',
};

export type ContentCodeType = $Keys<typeof CONTENT_LETTERS>;

export const PICKS: {[contentCode: ContentCodeType]: VisibilityType[]} = {
    exercises:   ['fresh', 'doing', 'translated', 'approved'],
    articles:    ['fresh', 'doing', 'translated', 'approved'],
    scratchpads: ['fresh', 'doing', 'translated', 'approved'],
    videos:      ['fresh', 'subtitled', 'dubbed'],
    topics:      ['fresh', 'doing', 'translated', 'approved'],
};

export const CONTENT_GROUPS: {[contentCode: ContentCodeType]: ContentGroupType} = {
    exercises:   'crowdin',
    articles:    'crowdin',
    scratchpads: 'crowdin',
    videos:      'videos',
    topics:      'topics',
};

export const NAMES: {[contentName: string]: ContentCodeType} = {
    Exercise:   'exercises',
    Article:    'articles',
    Video:      'videos',
    Scratchpad: 'scratchpads',
    Topic:      'topics',
};

export type ContentNameType = $Keys<typeof NAMES>;

export type ContentKindType = {
    code: ContentCodeType,
    name: ContentNameType,
};

export const CONTENTS: Array<ContentKindType> = [
    { code: 'exercises', name: 'Exercises' },
    { code: 'articles', name: 'Articles' },
    { code: 'videos', name: 'Videos' },
    { code: 'scratchpads', name: 'Scratchpads' },
    { code: 'topics', name: 'Descriptions' },
];

export const contentKindLookup = (kindCode: ContentCodeType): ContentKindType =>
    find(CONTENTS, ({ code }: ContentKindType): boolean => code === kindCode);
