import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

import LoginPage from 'components/pages/LoginPage';
import HomePage from 'components/pages/HomePage';
import RegistrationPage from 'components/pages/RegistrationPage';

import {addAuthorization, removeAuthorization} from 'core/redux/actions';

function App(props) {
    // TODO: move out of this file.
    const uploadFile = () => {
        api.files.uploadFile('user', 'file').then(response => {
            // TODO: Update when backend is ready.
            console.log(response);
        });
    };

    return (
        <Switch>
            <Route
                path="/home"
                render={({location}) =>
                    props.isAuthorized ? (
                        <HomePage
                            uploadFile={uploadFile}
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
    };
};

export default connect(mapStateToProps, {
    addAuthorization,
    removeAuthorization,
})(App);
