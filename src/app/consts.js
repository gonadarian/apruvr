/* @flow */

export const CONTENTS = [
    { code: 'exercises', name: 'Exercises' },
    { code: 'articles', name: 'Articles' },
    { code: 'videos', name: 'Videos' },
    { code: 'scratchpads', name: 'Scratchpads' },
    { code: 'topics', name: 'Descriptions' },
];

export const LANGUAGES = [
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

export const VISIBILITIES = {
    fresh:      'New content',
    doing:      'In progress',
    translated: 'Translated',
    approved:   'Approved',
    subtitled:  'Subtitled',
    dubbed:     'Dubbed',
};

export const PICKS = {
    exercises:      ['fresh', 'doing', 'translated', 'approved'],
    articles:       ['fresh', 'doing', 'translated', 'approved'],
    scratchpads:    ['fresh', 'doing', 'translated', 'approved'],
    videos:         ['fresh', 'subtitled', 'dubbed'],
    topics:         ['fresh', 'doing', 'translated', 'approved'],
};

export const TYPES = {
    exercises:      'e',
    articles:       'a',
    scratchpads:    'p',
    videos:         'v',
    topics:         't',
};

export const TYPE_GROUPS = {
    exercises:      'crowdin',
    articles:       'crowdin',
    scratchpads:    'crowdin',
    videos:         'videos',
    topics:         'topics',
};

export const NAMES = {
    Exercise:   'exercises',
    Article:    'articles',
    Video:      'videos',
    Scratchpad: 'scratchpads',
    Topic:      'topic',
};

export const STATUSES = {
    crowdin:    ['translating', 'translated', 'revising', 'rejected', 'revised', 'approved'],
    video:      ['captioning', 'captioned', 'revising', 'rejected', 'revised', 'approved'],
    topic:      ['translating', 'translated', 'revising', 'rejected', 'revised', 'approved'],
};

export const IMPORTANT_STATUSES = {
    'translated':   true,
    'captioned':    true,
    'revised':      true,
    'approved':     true,
};
