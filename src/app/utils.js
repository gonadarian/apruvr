/* @flow */

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

export {
    iif,
    iiff,
    iifn,
};
