import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterContentKind } from '../actions';

import ButtonGroupComponent from '../components/ButtonGroupComponent';

import { CONTENTS } from '../helpers/consts';

const ContentKindButtons = (props) =>
    <div className="col-md-4">
        <h2>Content</h2>
        <ButtonGroupComponent
            {...props} />
    </div>;

export default connect(
    (state) => ({
        buttons:    CONTENTS,
        current:    state.content,
    }),
    (dispatch) => bindActionCreators({
        onChoose: filterContentKind,
    }, dispatch)
)(ContentKindButtons);
