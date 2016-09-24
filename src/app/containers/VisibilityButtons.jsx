import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { VISIBILITIES, PICKS } from '../helpers/consts';
import { filterVisibility } from '../actions';
import ButtonChoice from '../components/ButtonChoice';

const VisibilityButtons = (props) =>
    <div className="col-md-5 col-sm-5 col-xs-12">
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
