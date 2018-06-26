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

type OwnProps = {|
    history: RouterHistory,
|};

type StateProps = {|
    content: ContentKindType,
|};

type Props = {|
    ...OwnProps,
    ...StateProps,
    onChoose: (content: ?ContentKindType) => void,
|};

const ContentKindPicker = ({ content, onChoose }: Props): Element<'div'> =>
    <div className="col-xs-2">
        <h3>Content</h3>
        <Picker
            pickable
            states={map(CONTENTS, 'code')}
            current={content.code}
            nameMap={getNameMap()}
            onChoose={(code: ?string) => onChoose(contentKindLookup(code))} />
    </div>;

export default withRouter(connect(
    (state: State): StateProps => ({
        content: state.content,
    }),
    (dispatch: Dispatch, ownProps: OwnProps) => bindActionCreators({
        onChoose: chooseContent(ownProps.history),
    }, dispatch)
)(ContentKindPicker));
