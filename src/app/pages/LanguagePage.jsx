import React from 'react';

import Content from '../containers/Content';
import LanguageButtons from '../containers/LanguageButtons';
import LoadingSpinner from '../containers/LoadingSpinner';
import ContentKindButtons from '../containers/ContentKindButtons';
import VisibilityButtons from '../containers/VisibilityButtons';
import SelectedTopicList from '../containers/SelectedTopicList';
import FilteredContentList from '../containers/FilteredContentList';
import ExporterButton from '../containers/ExporterButton';

import styles from '../styles/main.less';

const LanguagePage = () =>
    <div>
        <div className={`jumbotron text-center ${styles.dark}`}>
            <h1>Khan Academy Apruvr</h1>
            <p>Approval workflow for Khan Academy translations.</p>
        </div>

        <div className="container-fluid">

            <LanguageButtons />
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
