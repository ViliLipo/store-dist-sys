import React from 'react';

import RegistrationForm from 'components/forms/RegistrationForm';
import Navigation from 'components/structures/Navigation';

import api from 'core/api';

function RegistrationPage(props) {
    const submit = values => {
        // TODO: indication of successful registration (not a priority right
        // now).
        api.auth
            .register(values)
            .then(response => {
                if (response.success) {
                    props.history.push('/');
                } else {
                    props.showNotification(response.message);
                }
            })
            .catch(err => {
                props.showNotification(err);
            });
    };

    return (
        <>
            <Navigation />
            <RegistrationForm onSubmit={submit} />
        </>
    );
}

export default RegistrationPage;
