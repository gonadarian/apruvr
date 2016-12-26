/* @flow */
import React from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';
import type { LanguageType } from '../consts';
import { languageLookup } from '../consts';
import { LanguagePicker, SignInButton, LoadingSpinner } from '../containers';
import styles from '../styles/main.less';

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

interface StatePropsType {
    language: ?LanguageType,
}

export default connect(
    (state: Store, props: OwnPropsType): StatePropsType => ({
        language: languageLookup(props.params.lang),
    })
)(ApruvrPage);
