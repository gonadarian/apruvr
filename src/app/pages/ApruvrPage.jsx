/* @flow */
import React, { Component, Fragment } from 'react';
import {
    Route, Switch, Redirect,
    type RouterHistory, type Location, type Match,
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pickBy, transform, isNil } from 'lodash';
import { LanguagePage } from './';
import { importFirebaseAuth } from '../imports';
import { routeChange, userAuth, fetchUsers, fetchDurations } from '../actions';
import { type LanguageType, type ContentKindType } from '../consts';
import {
    LanguagePicker, SignInButton, LoadingSpinner,
    ContentKindPicker, VisibilityButtons, ExporterButton,
} from '../containers';
import { hasValues } from '../utils';
import type { State, UserType, RouteParamsType } from '../flows';

const headerStyle = {
    backgroundColor: '#314453',
    color:           '#f5f5f5',
};

const footerStyle = {
    ...headerStyle,
    position: 'absolute',
    padding:  '10px',
    bottom:   0,
    right:    0,
    left:     0,
};

type OwnProps = {|
    match: Match,
    history: RouterHistory,
    location: Location,
|};

type StateProps = {|
    pathname: string,
    language: ?LanguageType,
    content: ContentKindType,
    topic: string,
    visible: boolean,
|};

type Props = {|
    ...OwnProps,
    ...StateProps,
    onRouteChange: (route: RouteParamsType) => void,
    onUserAuth: (user: UserType) => void,
    onUsersLoad: () => void,
    onDuratiosLoad: () => void,
|};

class ApruvrPage extends Component<Props> {
    constructor (props: Props) {
        super(props);
        importFirebaseAuth((firebase) => {
            // initialize user session, store user data in database
            firebase.auth().onAuthStateChanged((user: UserType) => {
                this.props.onUserAuth(user);
            });
        });
    }

    componentDidMount () {
        const { onRouteChange, onUsersLoad, onDuratiosLoad } = this.props;
        const { match: { params }, history } = this.props;
        // save to state initial path params before components are loaded
        if (hasValues(params)) {
            onRouteChange(params);
        }
        // get list of users
        onUsersLoad();
        // get durations of all videos
        onDuratiosLoad();
        // redirect to last used path
        const { language, content, topic } = this.props;
        if (language && content && topic) {
            history.push(`/${language.code}/${content.code}/${topic}`);
        }
    }

    componentDidUpdate (prevProps: Props) {
        const { pathname, match: { params } } = this.props;
        const prevParams = prevProps.match.params;
        if (pathname === prevProps.pathname) {
            return;
        }
        // ignore unchanged parameters
        const newAndChangedParams = pickBy(
            params,
            (value: ?string, param: string) =>
                !(param in prevParams) || value !== prevParams[param]
        );
        // keep information about removed parameters
        const removedParams = transform(
            prevParams,
            (memo, value, param) => {
                if (!(param in params)) {
                    memo[param] = null;
                }
            },
            {}
        );
        // and merge them before sending
        const updateParams = { ...newAndChangedParams, ...removedParams };
        if (hasValues(updateParams)) {
            this.props.onRouteChange(updateParams);
        }
    }

    render () {
        const { language, visible } = this.props;
        return <Fragment>
            <nav className="navbar navbar-default navbar-fixed-top" style={headerStyle}>
                <div className="container-fluid">
                    <h1 className="col-xs-12">
                        Khan Academy Apruvr
                        <small style={{ marginLeft: '1em' }}>
                            <em>approval workflow for Khan Academy translations</em>
                        </small>
                    </h1>
                </div>
            </nav>
            <main className="container-fluid">
                <div className="row">
                    <LanguagePicker language={language} />
                    {visible && <Fragment>
                        <ContentKindPicker />
                        <VisibilityButtons />
                        <ExporterButton />
                    </Fragment>}
                    <SignInButton />
                </div>
                <div className="row">
                    <LoadingSpinner />
                    <Switch>
                        <Route path="/:lang/:kind/:topic" component={LanguagePage} />
                        <Redirect exact from="/:lang/:kind" to=":lang/:kind/root.math" />
                        <Redirect exact from="/:lang" to=":lang/exercises/root.math" />
                    </Switch>
                </div>
            </main>
            <footer style={footerStyle}>
                <div className="col-xs-12" style={{ textAlign: 'center' }}>
                    <small>© 2018 Gonadarian</small>
                </div>
            </footer>
        </Fragment>;
    }
}

export default connect(
    (state: State, props: OwnProps): StateProps => ({
        pathname: props.location.pathname,
        language: state.language,
        content:  state.content,
        topic:    state.topic,
        visible:  !isNil(state.nodes),
    }),
    (dispatch: Dispatch) => bindActionCreators({
        onRouteChange:  routeChange,
        onUserAuth:     userAuth,
        onUsersLoad:    fetchUsers,
        onDuratiosLoad: fetchDurations,
    }, dispatch)
)(ApruvrPage);
