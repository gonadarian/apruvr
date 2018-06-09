import { languageLookup, contentKindLookup, CONTENTS } from './consts';

describe('Constants functions', () => {
    /* eslint-disable no-magic-numbers */
    /* eslint-disable no-undefined */

    test('function contentKindLookup should return expected values', () => {
        expect(contentKindLookup(undefined)).toBe(CONTENTS[0]);
        expect(contentKindLookup(null)).toBe(CONTENTS[0]);
        expect(contentKindLookup('foobar')).toBe(CONTENTS[0]);
        expect(contentKindLookup('exercises')).toBe(CONTENTS[0]);
        expect(contentKindLookup('videos')).toBe(CONTENTS[2]);
    });

    test('function languageLookup should return expected values', () => {
        expect(languageLookup(undefined)).toBeNull();
        expect(languageLookup(null)).toBeNull();
        expect(languageLookup('foobar')).toBeNull();
        expect(languageLookup('sr')).toEqual({ code: 'sr', name: 'Serbian', note: 'Cyrillic' });
        expect(languageLookup('bg')).toEqual({ code: 'bg', name: 'Bulgarian' });
    });
});
