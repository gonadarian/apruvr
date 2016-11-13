import React from 'react';
import {
    Content,
    LanguageButtons,
    SignInButton,
    LoadingSpinner,
    ContentKindButtons,
    VisibilityButtons,
    SelectedTopicList,
    FilteredContentList,
    ExporterButton,
} from '../containers';
import styles from '../styles/main.less';

const LanguagePage = () =>
    <div>
        <div className={`jumbotron text-center ${styles.dark}`}>
            <h1>Khan Academy Apruvr</h1>
            <h3>Approval workflow for Khan Academy translations</h3>
        </div>
        <div className="container-fluid">
            <LanguageButtons />
            <SignInButton />
            <LoadingSpinner />
            <Content>
                <ContentKindButtons />
                <VisibilityButtons />
                <ExporterButton />
                <SelectedTopicList />
                <FilteredContentList />
            </Content>
        </div>
    </div>;

export default LanguagePage;
