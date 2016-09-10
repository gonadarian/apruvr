const CONTENTS = [
    {
        code: 'exercises',
        name: 'Exercises',
    },
    {
        code: 'articles',
        name: 'Articles',
    },
    {
        code: 'videos',
        name: 'Videos',
    },
    {
        code: 'scratchpads',
        name: 'Scratchpads',
    },
];

const LANGUAGES = [
    {
        code: 'bg',
        name: 'Bulgarian',
    },
    {
        code: 'nl',
        name: 'Dutch',
    },
    {
        code: 'fr',
        name: 'French',
    },
    {
        code: 'de',
        name: 'German',
    },
    {
        code: 'gr',
        name: 'Greek',
    },
    {
        code: 'it',
        name: 'Italian',
    },
    {
        code: 'ko',
        name: 'Korean',
    },
    {
        code: 'pl',
        name: 'Polish',
    },
    {
        code: 'pt-pt',
        name: 'Portuguese',
        note: 'Portugal',
    },
    {
        code: 'ru',
        name: 'Russian',
    },
    {
        code: 'sr',
        name: 'Serbian',
        note: 'Cyrillic',
    },
    {
        code: 'es',
        name: 'Spanish',
    },
    {
        code: 'tr',
        name: 'Turkish',
    },
];

const VISIBILITIES = {
    fresh:      'New content',
    doing:      'In progress',
    translated: 'Translated',
    approved:   'Approved',
    subtitled:  'Subtitled',
    dubbed:     'Dubbed',
};

const PICKS = {
    exercises:      ['fresh', 'doing', 'translated', 'approved'],
    articles:       ['fresh', 'doing', 'translated', 'approved'],
    scratchpads:    ['fresh', 'doing', 'translated', 'approved'],
    videos:         ['fresh', 'subtitled', 'dubbed'],
};

const TYPES = {
    exercises:      'e',
    articles:       'a',
    scratchpads:    'p',
    videos:         'v',
};

const NAMES = {
    Exercise:   'exercises',
    Article:    'articles',
    Video:      'videos',
    Scratchpad: 'scratchpads',
};

const Consts = {
    CONTENTS,
    LANGUAGES,
    VISIBILITIES,
    PICKS,
    TYPES,
    NAMES,
};

export default Consts;
