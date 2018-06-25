/* @flow */
import React, { type Element } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map, mapKeys } from 'lodash';
import { filterVisibility } from '../actions';
import {
    VISIBILITY_NAMES, VISIBLITY_CODES, PICKS,
    type VisibilityType, type VisibilityListType,
} from '../consts';
import { ButtonChoice } from '../components';
import type { State, Dispatch } from '../flows';

interface StatePropsType {
    choices: VisibilityListType,
    used: VisibilityType[],
}

interface PropsType extends StatePropsType {
    onChoose: (choice: string) => void,
}

const VisibilityButtons = ({ choices, used, ...other }: PropsType): Element<*> =>
    <div className="col-xs-12 col-sm-4">
        <h3>States</h3>
        <ButtonChoice
            {...other}
            choices={mapKeys(choices, (key) => VISIBLITY_CODES[key])}
            used={map(used, (item) => VISIBLITY_CODES[item])}
            names={mapKeys(VISIBILITY_NAMES, (key) => VISIBLITY_CODES[key])} />
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
