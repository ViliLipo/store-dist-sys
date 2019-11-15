import React from 'react';

import RegistrationForm from 'components/forms/RegistrationForm';

function RegistrationPage(props) {
    const submit = values => {
        //TODO: api call to registration
        console.log(values);
    };

    return <RegistrationForm onSubmit={submit} />;
}

export default RegistrationPage;
