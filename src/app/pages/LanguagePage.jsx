/* @flow */
import React, { Component } from 'react';
import type { Match } from 'react-router-dom';
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
    match: Match,
}

interface StatePropsType {
    lang: ?string,
    visible: boolean,
}

interface PropsType extends OwnPropsType, StatePropsType {
    onLanguageChange: (language: LanguageType) => void,
}

class LanguagePage extends Component<PropsType> {
    componentDidMount () {
        this.fetching();
    }

    componentDidUpdate (prevProps: PropsType) {
        const { lang } = this.props;
        if (lang === prevProps.lang) {
            return;
        }
        this.fetching();
    }

    fetching () {
        const { lang, onLanguageChange } = this.props;
        const language = languageLookup(lang);
        if (!language) {
            throw Error('Language should be available for this component.');
        }
        // load language translation data
        onLanguageChange(language);
    }

    render () {
        const { visible } = this.props;
        return visible && <div>
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
        lang:    props.match.params.lang,
        visible: state.nodes !== null,
    }),
    (dispatch: Dispatch) => bindActionCreators({
        onLanguageChange: fetchNodes,
    }, dispatch)
)(LanguagePage);
