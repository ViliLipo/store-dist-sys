import React from 'react';
import { reduxForm, Field } from 'redux-form'

function LoginForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label>username</label>
                <Field
                    name='username'
                    type='text'
                    component='input'
                />
            </div>
            <div>
                <label>password</label>
                <Field
                    type='password'
                    name='password'
                    component='input'
                />
            </div>
            <button>login</button>
        </form>
    )
}

LoginForm = reduxForm({
    form: 'login'
})(LoginForm)

export default LoginForm;
