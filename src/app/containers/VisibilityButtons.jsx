/* @flow */
import React from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { VISIBILITIES, PICKS } from '../consts';
import { filterVisibility } from '../actions';
import { ButtonChoice } from '../components';

interface StatePropsType {
    choices: {[choice: string]: boolean},
    used: string[],
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
    (state: Store): StatePropsType => ({
        choices:    state.visibility,
        used:       PICKS[state.content.code],
    }),
    (dispatch: Dispatch): void => bindActionCreators({
        onChoose:   filterVisibility,
    }, dispatch)
)(VisibilityButtons);
