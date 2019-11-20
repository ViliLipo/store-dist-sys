import React from 'react';
import {reduxForm, Field} from 'redux-form';

import {required} from 'core/utils/validations';

function RegistrationForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label>username</label>
                <Field
                    name="username"
                    type="text"
                    component="input"
                    validate={required}
                />
            </div>
            <div>
                <label>password</label>
                <Field
                    type="password"
                    name="password"
                    component="input"
                    validate={required}
                />
            </div>
            <button className="button button-primary">register</button>
        </form>
    );
}

RegistrationForm = reduxForm({
    form: 'register',
})(RegistrationForm);

export default RegistrationForm;
