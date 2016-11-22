import React from 'react';
import {
    Content,
    LanguagePicker,
    SignInButton,
    LoadingSpinner,
    ContentKindPicker,
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
            <LanguagePicker />
            <SignInButton />
            <LoadingSpinner />
            <Content>
                <ContentKindPicker />
                <VisibilityButtons />
                <ExporterButton />
                <SelectedTopicList />
                <FilteredContentList />
            </Content>
        </div>
    </div>;

export default LanguagePage;
