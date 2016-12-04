import React from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';
import {
    ContentKindPicker,
    VisibilityButtons,
    SelectedTopicList,
    FilteredContentList,
    ExporterButton,
} from '../containers';

const LanguagePage = ({ visible }): Element<*> =>
    visible &&
        <div>
            <ContentKindPicker />
            <VisibilityButtons />
            <ExporterButton />
            <SelectedTopicList />
            <FilteredContentList />
        </div>;

export default connect(
    (state) => ({
        visible:    state.nodes !== null,
    })
)(LanguagePage);
