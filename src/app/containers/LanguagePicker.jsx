/* @flow */
import React, { type Element } from 'react';
import { withRouter, type RouterHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map, reduce, find } from 'lodash';
import { chooseLanguage } from '../actions';
import { LANGUAGES, type LanguageType } from '../consts';
import { Picker } from '../components';
import type { State, Dispatch } from '../flows';

type NameMap = {[code: string]: string};

const getNameMap = (): NameMap =>
    reduce(
        LANGUAGES,
        (memo: NameMap, { code, name, note }: LanguageType): NameMap => {
            memo[code] = name + (note
                ? ` (${note})`
                : '');
            return memo;
        },
        {}
    );

type OwnProps = {|
    history: RouterHistory,
|};

type StateProps = {|
    language: ?LanguageType,
|};

type Props = {|
    ...OwnProps,
    ...StateProps,
    onChoose: (language: ?LanguageType) => void,
|};

const LanguagePicker = ({ language, onChoose }: Props): Element<*> =>
    <div className="col-xs-2">
        <h3>Language</h3>
        <Picker
            pickable
            states={[...map(LANGUAGES, 'code'), null]}
            current={language
                ? language.code
                : null}
            nameMap={getNameMap()}
            onChoose={(code: ?string): void => onChoose(
                find(LANGUAGES, ['code', code])
            )} />
    </div>;

export default withRouter(connect(
    (state: State): StateProps => ({
        language: state.language,
    }),
    (dispatch: Dispatch, ownProps: OwnProps) => bindActionCreators({
        onChoose: chooseLanguage(ownProps.history),
    }, dispatch)
)(LanguagePicker));
