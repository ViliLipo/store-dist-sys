import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

import LoginPage from 'components/pages/LoginPage';
import HomePage from 'components/pages/HomePage';
import RegistrationPage from 'components/pages/RegistrationPage';

import {
    addAuthorization,
    removeAuthorization,
    addUsername,
    removeUsername,
    setFiles,
} from 'core/redux/actions';

function App(props) {
    return (
        <Switch>
            <Route
                path="/home"
                render={({location}) =>
                    props.isAuthorized ? (
                        <HomePage
                            user={props.username}
                            removeUsername={props.removeUsername}
                            setFiles={props.setFiles}
                            files={props.files}
                            logout={props.removeAuthorization}
                        />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: {from: location},
                            }}
                        />
                    )
                }
            />
            <Route
                path="/register"
                render={({history}) => <RegistrationPage history={history} />}
            />
            <Route
                exact
                path="/"
                render={({history}) => (
                    <LoginPage
                        history={history}
                        login={props.addAuthorization}
                        addUsername={props.addUsername}
                    />
                )}
            />
            <Redirect to="/" />
        </Switch>
    );
}

const mapStateToProps = state => {
    return {
        isAuthorized: state.auth.isAuthorized,
        username: state.user.username,
        files: state.files.files,
    };
};

export default connect(mapStateToProps, {
    addAuthorization,
    removeAuthorization,
    addUsername,
    removeUsername,
    setFiles,
})(App);
