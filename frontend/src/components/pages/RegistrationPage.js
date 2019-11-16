import React from 'react';

import RegistrationForm from 'components/forms/RegistrationForm';

import api from 'core/api';

function RegistrationPage(props) {
    const submit = values => {
        // TODO: indication of successful registration.
        // Not a priority right now.
        api.auth.register(values).then(response => {
            if (response.success) {
                props.history.push('/');
            }
        });
    };

    return <RegistrationForm onSubmit={submit} />;
}

export default RegistrationPage;