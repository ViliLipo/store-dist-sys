import React from 'react';
import {withRouter} from 'react-router-dom';

import LoginForm from 'components/forms/LoginForm';
import Navigation from 'components/structures/Navigation';

import api from 'core/api';

function LoginPage(props) {
    const submit = values => {
        api.auth
            .login({...values})
            .then(response => {
                if (response.success) {
                    props.login();
                    props.addUsername(values.username);
                    props.history.push('/home');
                } else {
                    props.showNotification(response.message);
                }
            })
            .catch(err => {
                props.showNotification(err.message);
            });
    };

    return (
        <>
            <Navigation />
            <LoginForm onSubmit={submit} />
        </>
    );
}

export default withRouter(LoginPage);
