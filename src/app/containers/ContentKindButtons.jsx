import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterContentKind } from '../actions';

import ButtonGroup from '../components/ButtonGroup';

import { CONTENTS } from '../helpers/consts';

const ContentKindButtons = (props) =>
    <div className="col-md-5 col-sm-5 col-xs-12">
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
