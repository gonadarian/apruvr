import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firebaseSignIn, firebaseSignOut } from '../actions';

const SignInButton = ({ user, signIn, signOut }) =>
    <div className="col-xs-2">
        <h2>
            {user ? user.displayName : 'User'}
        </h2>
        <a
            className="btn btn-primary"
            onClick={
                () => user
                    ? signOut()
                    : signIn()
            }>
            {user ? 'Sign out' : 'Sign in'}
        </a>
    </div>;

SignInButton.propTypes = {
    user:       PropTypes.object,
    signIn:     PropTypes.func.isRequired,
    signOut:    PropTypes.func.isRequired,
};

export default connect(
    (state) => ({
        user:       state.user,
    }),
    (dispatch) => bindActionCreators({
        signIn:     firebaseSignIn,
        signOut:    firebaseSignOut,
    }, dispatch)
)(SignInButton);
