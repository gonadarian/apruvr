/* @flow */
import React, { type Element } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userSignIn, userSignOut } from '../actions';
import type { State, Dispatch, UserType } from '../flows';

const iconStyle = {
    marginLeft: '1em',
};

type StateProps = {|
    user: ?UserType,
|};

type Props = {|
    ...StateProps,
    signIn: () => void,
    signOut: () => void,
|};

const SignInButton = ({ user, signIn, signOut }: Props): Element<*> =>
    user
        ? <div className="pull-right col-xs-2">
            <h3>
                {user.displayName}
            </h3>
            <a className="btn btn-primary"
                onClick={() => signOut()}>
                {'Sign out'}
                <span className="fas fa-sign-out-alt" style={iconStyle} />
            </a>
        </div>
        : <div className="pull-right col-xs-2">
            <h3>
                {'User'}
            </h3>
            <a className="btn btn-primary"
                onClick={() => signIn() }>
                {'Sign in'}
                <i className="fas fa-sign-in-alt" style={iconStyle} />
            </a>
        </div>;

export default connect(
    (state: State): StateProps => ({
        user: state.user,
    }),
    (dispatch: Dispatch) => bindActionCreators({
        signIn:  userSignIn,
        signOut: userSignOut,
    }, dispatch)
)(SignInButton);
