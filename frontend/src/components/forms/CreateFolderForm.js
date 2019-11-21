import React from 'react';
import {Field, reduxForm} from 'redux-form';

import {required} from 'core/utils/validations';

function CreateFolderForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label>Enter the directory name</label>
                <Field
                    type="text"
                    name="name"
                    component="input"
                    validate={required}
                />
            </div>
            <button className="button button-primary" type="submit">Create</button>
        </form>
    );
}

export default reduxForm({
    form: 'createFolder',
})(CreateFolderForm);
