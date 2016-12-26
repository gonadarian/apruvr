/* @flow */
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

type PropsType = {
    visible: boolean,
};

const LanguagePage = ({ visible }: PropsType): ?Element<*> =>
    !visible ? null :
        <div>
            <ContentKindPicker />
            <VisibilityButtons />
            <ExporterButton />
            <SelectedTopicList />
            <FilteredContentList />
        </div>;

export default connect(
    (state: Store): PropsType => ({
        visible:    state.nodes !== null,
    })
)(LanguagePage);
