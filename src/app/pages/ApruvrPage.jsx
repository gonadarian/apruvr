/* @flow */
import React, { type Element } from 'react';
import { connect } from 'react-redux';
import { languageLookup, type LanguageType } from '../consts';
import { LanguagePicker, SignInButton, LoadingSpinner } from '../containers';
import type { State } from '../flows';
import styles from '../styles/main.less';

interface StatePropsType {
    language: ?LanguageType,
}

interface PropsType extends StatePropsType {
    children: Element<*>,
}

const ApruvrPage = ({ children, language }: PropsType): Element<*> =>
    <div>
        <div className={`jumbotron text-center ${styles.dark}`}>
            <h1>Khan Academy Apruvr</h1>
            <h3>Approval workflow for Khan Academy translations</h3>
        </div>
        <div className="container-fluid">
            <LanguagePicker language={language} />
            <SignInButton />
            <LoadingSpinner />
            {children}
        </div>
    </div>;

interface OwnPropsType {
    params: { lang: ?string },
}

export default connect(
    (state: State, props: OwnPropsType): StatePropsType => ({
        language: languageLookup(props.params.lang),
    })
)(ApruvrPage);
