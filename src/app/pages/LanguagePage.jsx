/* @flow */
import React, { Component } from 'react';
import type { Match } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isNil } from 'lodash';
import {
    ContentKindPicker, VisibilityButtons, SelectedTopicList,
    FilteredContentList, ExporterButton,
} from '../containers';
import { fetchNodes, fetchWorkflow } from '../actions';
import { languageLookup, type LanguageType } from '../consts';
import type { State, WorkflowMapType } from '../flows';

type OwnProps = {|
    match: Match,
|};

type StateProps = {|
    lang: ?string,
    visible: boolean,
|};

type Props = {|
    ...OwnProps,
    ...StateProps,
    onLanguageChange: (language: LanguageType) => void,
    onFiredux: (snapshot: WorkflowMapType) => void,
|};

class LanguagePage extends Component<Props> {
    componentDidMount () {
        this.fetching();
    }

    componentDidUpdate (prevProps: Props) {
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
        const { visible, onFiredux } = this.props;
        return visible && <div>
            <ContentKindPicker />
            <VisibilityButtons />
            <ExporterButton />
            <SelectedTopicList />
            <FilteredContentList onFiredux={onFiredux}/>
        </div>;
    }
}

export default connect(
    (state: State, props: OwnProps): StateProps => ({
        lang:    props.match.params.lang,
        visible: !isNil(state.nodes),
    }),
    (dispatch: Dispatch) => bindActionCreators({
        onLanguageChange: fetchNodes,
        onFiredux:        fetchWorkflow,
    }, dispatch)
)(LanguagePage);
