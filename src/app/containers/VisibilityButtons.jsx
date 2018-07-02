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

type StateProps = {|
    choices: VisibilityListType,
    used: VisibilityType[],
|};

type Props = {|
    ...StateProps,
    onChoose: (choice: string) => void,
|};

const VisibilityButtons = ({ choices, used, ...other }: Props): Element<*> =>
    <div className="col-xs-12 col-sm-4">
        <h3>States</h3>
        <ButtonChoice
            {...other}
            choices={mapKeys(choices, (value, key) => VISIBLITY_CODES[key])}
            names={mapKeys(VISIBILITY_NAMES, (value, key) => VISIBLITY_CODES[key])}
            used={map(used, (item) => VISIBLITY_CODES[item])} />
    </div>;

export default connect(
    (state: State): StateProps => ({
        choices: state.visibility,
        used:    PICKS[state.content.code],
    }),
    (dispatch: Dispatch) => bindActionCreators({
        onChoose: filterVisibility,
    }, dispatch)
)(VisibilityButtons);
