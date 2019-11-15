import React from 'react';
import {withRouter} from 'react-router-dom';

import LoginForm from 'components/forms/LoginForm';

import api from 'core/api';

function LoginPage(props) {
    const submit = values => {
        api.auth.login({...values}).then(response => {
            if (response.success) {
                props.login();
                props.history.push('/home');
            }
        });
    };

    return <LoginForm onSubmit={submit} />;
}

export default withRouter(LoginPage);
