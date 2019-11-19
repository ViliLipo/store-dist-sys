import React from 'react';

import {Switch, Route, Redirect} from 'react-router-dom';

import LoginPage from 'components/pages/LoginPage';
import HomePage from 'components/pages/HomePage';
import RegistrationPage from 'components/pages/RegistrationPage';

function Router(props) {
    return (
        <Switch>
            <Route
                path="/home"
                render={({location}) =>
                    props.isAuthorized ? (
                        <HomePage
                            user={props.username}
                            removeUsername={props.removeUsername}
                            showNotification={props.showNotification}
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
                render={({history}) => (
                    <RegistrationPage
                        showNotification={props.showNotification}
                        history={history}
                    />
                )}
            />
            <Route
                exact
                path="/"
                render={({history}) => (
                    <LoginPage
                        history={history}
                        login={props.addAuthorization}
                        addUsername={props.addUsername}
                        showNotification={props.showNotification}
                    />
                )}
            />
            <Redirect to="/" />
        </Switch>
    );
}

export default Router;
