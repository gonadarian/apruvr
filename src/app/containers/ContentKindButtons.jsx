import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterContentKind } from '../actions';
import { CONTENTS } from '../consts';
import { ButtonGroup } from '../components';

const ContentKindButtons = (props) =>
    <div className="col-xs-12 col-sm-3">
        <h2>Content</h2>
        <ButtonGroup
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
