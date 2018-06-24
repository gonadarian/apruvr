/* @flow */
import moment from 'moment-mini';
import { some, values } from 'lodash';

const iif = <T>(flag: boolean, trueValue: T, falseValue: T): T =>
    flag
        ? trueValue
        : falseValue;

const iiff = <T>(flag: boolean, trueValue: () => T, falseValue: () => T): T =>
    flag
        ? trueValue()
        : falseValue();

const iifn = <T>(flag: boolean, trueValue: () => T): ?T =>
    flag
        ? trueValue()
        : null;

const MS_PER_SEC = 1000;
const SEC_PER_MIN = 60;
const WORDS_PER_MIN = 150;
const WORDS_PER_SEC = WORDS_PER_MIN / SEC_PER_MIN;

const localize = (num: number): string =>
    num.toLocaleString('sr');

const seconds = (sec: number): string =>
    localize(Math.floor(sec));

const words = (sec: number): string =>
    seconds(sec * WORDS_PER_SEC);

const percent = (num: number): string =>
    `${localize(Math.floor(100 * num))}%`;

const minsec = (sec: number): string =>
    moment.utc(sec * MS_PER_SEC).format('m[m] s[s]');

const hasValues = (object: Object): boolean =>
    // FIXME: remove the iteratee
    some(values(object), (value) => value);

export {
    iif,
    iiff,
    iifn,
    localize,
    seconds,
    words,
    percent,
    minsec,
    hasValues,
};
