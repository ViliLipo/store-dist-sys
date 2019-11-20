import React from 'react';

import {Switch, Route, Redirect, useRouteMatch} from 'react-router-dom';

import LoginPage from 'components/pages/LoginPage';
import HomePage from 'components/pages/HomePage';
import RegistrationPage from 'components/pages/RegistrationPage';

// TODO: Should be eventually refactored. All the props could be separated into
// data and actions or something similar.
function Router(props) {
    const {url} = useRouteMatch();

    return (
        <Switch>
            <Route
                path="/home"
                render={({location}) =>
                    props.isAuthorized ? (
                        <HomePage
                            user={props.username}
                            structure={props.structure}
                            removeUsername={props.removeUsername}
                            showNotification={props.showNotification}
                            setStructure={props.setStructure}
                            setFiles={props.setFiles}
                            setCurrentId={props.setCurrentId}
                            files={props.files}
                            logout={props.removeAuthorization}
                            openModal={props.openModal}
                            closeModal={props.closeModal}
                            location={location}
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
            <Route
                path={`${url}/:name`}
                render={({location}) =>
                    props.isAuthorized ? (
                        <Structure
                            user={props.username}
                            structure={props.structure}
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
            <Redirect to="/" />
        </Switch>
    );
}

export default Router;
