/* @flow */
import React, { type Element } from 'react';
import { withRouter, type RouterHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map, reduce } from 'lodash';
import { chooseContent } from '../actions';
import { Picker } from '../components';
import type { State, Dispatch } from '../flows';
import { CONTENTS, contentKindLookup, type ContentKindType } from '../consts';

const getNameMap = () =>
    reduce(
        CONTENTS,
        (memo, { code, name }) => {
            memo[code] = name;
            return memo;
        },
        {}
    );

interface OwnPropsType {
    history: RouterHistory,
}

interface StatePropsType {
    content: ContentKindType,
}

interface PropsType extends OwnPropsType, StatePropsType {
    onChoose: (content: ContentKindType) => void,
}

const ContentKindPicker = ({ content, onChoose }: PropsType): Element<'div'> =>
    <div className="col-xs-2">
        <h2>Content</h2>
        <Picker
            pickable
            states={map(CONTENTS, 'code')}
            current={content.code}
            nameMap={getNameMap()}
            onChoose={(code: ?string) => onChoose(contentKindLookup(code))} />
    </div>;

export default withRouter(connect(
    (state: State): StatePropsType => ({
        content: state.content,
    }),
    (dispatch: Dispatch, ownProps: OwnPropsType) => bindActionCreators({
        onChoose: chooseContent(ownProps.history),
    }, dispatch)
)(ContentKindPicker));
