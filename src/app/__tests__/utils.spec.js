import {
    iif, iiff, iifn,
    seconds, words, percent, minsec, hasValues,
} from '../utils';

describe('Utility functions', () => {
    /* eslint-disable no-magic-numbers */
    /* eslint-disable no-undefined */

    test('function iff should return expected values', () => {
        const value1 = { value: 1 };
        const value2 = { value: 2 };
        expect(iif(true, value1, value2)).toBe(value1);
        expect(iif(false, value1, value2)).toBe(value2);
        expect(iif(null, value1, value2)).toBe(value2);
        expect(iif({}, value1, value2)).toBe(value1);
        expect(iif(undefined, value1, value2)).toBe(value2);
    });

    test('function iiff should return expected values', () => {
        const value1 = { value: 1 };
        const value2 = { value: 2 };
        const func1 = () => value1;
        const func2 = () => value2;
        expect(iiff(true, func1, func2)).toBe(value1);
        expect(iiff(false, func1, func2)).toBe(value2);
        expect(iiff(null, func1, func2)).toBe(value2);
        expect(iiff({}, func1, func2)).toBe(value1);
        expect(iiff(undefined, func1, func2)).toBe(value2);
    });

    test('function iifn should return expected values or null', () => {
        const value1 = { value: 1 };
        const func1 = () => value1;
        expect(iifn(true, func1)).toBe(value1);
        expect(iifn(false, func1)).toBe(null);
        expect(iifn(null, func1)).toBe(null);
        expect(iifn({}, func1)).toBe(value1);
        expect(iifn(undefined, func1)).toBe(null);
    });

    test('function seconds should return expected values or null', () => {
        expect(seconds(10)).toEqual('10');
        expect(seconds(10.1)).toEqual('10');
        expect(seconds(10.9)).toEqual('10');
        expect(seconds(1000)).toEqual('1,000');
        expect(seconds(1000000)).toEqual('1,000,000');
        expect(seconds(1000000.1)).toEqual('1,000,000');
        expect(seconds(1000000.9)).toEqual('1,000,000');
    });

    test('function words should return expected values or null', () => {
        expect(words(1)).toEqual('2');
        expect(words(10)).toEqual('25');
        expect(words(100)).toEqual('250');
        expect(words(101)).toEqual('252');
    });

    test('function percent should return expected values or null', () => {
        expect(percent(0.23)).toEqual('23%');
        expect(percent(0.2345)).toEqual('23%');
        expect(percent(0.2367)).toEqual('23%');
        expect(percent(0)).toEqual('0%');
        expect(percent(3)).toEqual('300%');
        expect(percent(3.23)).toEqual('323%');
        expect(percent(3.2345)).toEqual('323%');
        expect(percent(3.2367)).toEqual('323%');
    });

    test('function minsec should return expected values', () => {
        expect(minsec(5)).toEqual('0m 5s');
        expect(minsec(145)).toEqual('2m 25s');
    });

    test('function hasValues should return expected values', () => {
        expect(hasValues({ aa: undefined })).toEqual(false);
        expect(hasValues({ aa: null })).toEqual(false);
        expect(hasValues({ aa: 1 })).toEqual(true);
        expect(hasValues({ aa: null, bb: null })).toEqual(false);
        expect(hasValues({ aa: null, bb: undefined })).toEqual(false);
        expect(hasValues({ aa: null, bb: 1 })).toEqual(true);
        expect(hasValues({ aa: 1, bb: 2 })).toEqual(true);
    });
});
