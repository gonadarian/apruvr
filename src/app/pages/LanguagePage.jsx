/* @flow */
import React, { type Element } from 'react';
import { connect } from 'react-redux';
import {
    ContentKindPicker,
    VisibilityButtons,
    SelectedTopicList,
    FilteredContentList,
    ExporterButton,
} from '../containers';
import type { State } from '../flows';

type PropsType = {
    visible: boolean,
};

const LanguagePage = ({ visible }: PropsType): Element<*> | false =>
    visible &&
        <div>
            <ContentKindPicker />
            <VisibilityButtons />
            <ExporterButton />
            <SelectedTopicList />
            <FilteredContentList />
        </div>;

export default connect(
    (state: State): PropsType => ({
        visible: state.nodes !== null,
    })
)(LanguagePage);
