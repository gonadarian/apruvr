/* @flow */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    ContentKindPicker, VisibilityButtons, SelectedTopicList,
    FilteredContentList, ExporterButton,
} from '../containers';
import { fetchNodes } from '../actions';
import { languageLookup, type LanguageType } from '../consts';
import type { State } from '../flows';

interface OwnPropsType {
    params: {lang: string},
}

interface StatePropsType extends OwnPropsType {
    visible: boolean,
}

interface PropsType extends StatePropsType {
    onLanguageChange: (language: LanguageType) => void,
}

class LanguagePage extends Component<PropsType> {
    componentDidMount () {
        this.fetching();
    }

    componentDidUpdate (prevProps: PropsType) {
        if (this.props.params.lang === prevProps.params.lang) {
            return;
        }
        this.fetching();
    }

    fetching () {
        const language = languageLookup(this.props.params.lang);
        if (!language) {
            throw Error('Language should be available for this component.');
        }
        // load language translation data
        this.props.onLanguageChange(language);
    }

    render () {
        return this.props.visible &&
            <div>
                <ContentKindPicker />
                <VisibilityButtons />
                <ExporterButton />
                <SelectedTopicList />
                <FilteredContentList />
            </div>;
    }
}

export default connect(
    (state: State, props: OwnPropsType): StatePropsType => ({
        params:  props.params,
        visible: state.nodes !== null,
    }),
    (dispatch: Dispatch): void => bindActionCreators({
        onLanguageChange: fetchNodes,
    }, dispatch)
)(LanguagePage);
