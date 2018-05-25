/* @flow */
import React, { type Element } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userSignIn, userSignOut } from '../actions';
import type { State, Dispatch, UserType } from '../flows';

interface StatePropsType {
    user: ?UserType,
}

interface PropsType extends StatePropsType {
    signIn: () => void,
    signOut: () => void,
}

const SignInButton = ({ user, signIn, signOut }: PropsType): Element<*> =>
    user
        ? <div className="pull-right col-xs-2">
            <h3>
                {user.displayName}
            </h3>
            <a className="btn btn-primary"
                onClick={() => signOut()}>
                {'Sign out'}
                <span className="fas fa-sign-out-alt" />
            </a>
        </div>
        : <div className="pull-right col-xs-2">
            <h3>
                {'User'}
            </h3>
            <a className="btn btn-primary"
                onClick={() => signIn() }>
                {'Sign in'}
                <span className="fas fa-sign-in-alt" />
            </a>
        </div>;

export default connect(
    (state: State): StatePropsType => ({
        user: state.user,
    }),
    (dispatch: Dispatch) => bindActionCreators({
        signIn:  userSignIn,
        signOut: userSignOut,
    }, dispatch)
)(SignInButton);
