import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { VISIBILITIES, PICKS } from '../consts';
import { filterVisibility } from '../actions';
import { ButtonChoice } from '../components';

const VisibilityButtons = (props) =>
    <div className="col-xs-12 col-sm-5">
        <h2>States</h2>
        <ButtonChoice
            {...props}
            names={VISIBILITIES} />
    </div>;

export default connect(
    (state) => ({
        choices:    state.visibility,
        used:       PICKS[state.content.code],
    }),
    (dispatch) => bindActionCreators({
        onChoose:   filterVisibility,
    }, dispatch)
)(VisibilityButtons);
