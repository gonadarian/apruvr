/* @flow */
import React, { type Element } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map, reduce, find } from 'lodash';
import { chooseLanguage } from '../actions';
import { LANGUAGES, type LanguageType } from '../consts';
import { Picker } from '../components';
import type { State, Dispatch } from '../flows';

type NameMapType = {[code: string]: string};

const getNameMap = (): NameMapType =>
    reduce(
        LANGUAGES,
        (memo: NameMapType, { code, name, note }: LanguageType): NameMapType => {
            memo[code] = name + (note
                ? ` (${note})`
                : '');
            return memo;
        },
        {}
    );

interface StatePropsType {
    language: ?LanguageType,
}

interface PropsType extends StatePropsType {
    onChoose: (language: ?LanguageType) => void,
}

const LanguagePicker = ({ language, onChoose }: PropsType): Element<*> =>
    <div className="col-xs-2">
        <h2>Language</h2>
        <Picker
            pickable
            states={[...map(LANGUAGES, 'code'), null]}
            current={language
                ? language.code
                : null}
            nameMap={getNameMap()}
            onChoose={(code: ?string): void => onChoose(
                find(
                    LANGUAGES,
                    (item: LanguageType): boolean => item.code === code
                )
            )} />
    </div>;

export default connect(
    (state: State): StatePropsType => ({
        language: state.language,
    }),
    (dispatch: Dispatch): void => bindActionCreators({
        onChoose: chooseLanguage,
    }, dispatch)
)(LanguagePicker);
