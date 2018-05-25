/* @flow */
import React, { type Element } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterVisibility } from '../actions';
import { VISIBILITIES, PICKS, type VisibilityType, type VisibilityListType } from '../consts';
import { ButtonChoice } from '../components';
import type { State, Dispatch } from '../flows';

interface StatePropsType {
    choices: VisibilityListType,
    used: VisibilityType[],
}

interface PropsType extends StatePropsType {
    onChoose: (choice: string) => void,
}

const VisibilityButtons = ({ ...props }: PropsType): Element<*> =>
    <div className="col-xs-12 col-sm-4">
        <h2>States</h2>
        <ButtonChoice
            {...props}
            names={VISIBILITIES} />
    </div>;

export default connect(
    (state: State): StatePropsType => ({
        choices: state.visibility,
        used:    PICKS[state.content.code],
    }),
    (dispatch: Dispatch) => bindActionCreators({
        onChoose: filterVisibility,
    }, dispatch)
)(VisibilityButtons);
