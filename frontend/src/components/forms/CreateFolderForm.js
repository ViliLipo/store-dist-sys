import React from 'react';
import {Field, reduxForm} from 'redux-form';

function CreateFolderForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label>Enter the directory name</label>
                <Field type="text" name="name" component="input" />
            </div>
            <button type="submit">Create</button>
        </form>
    );
}

export default reduxForm({
    form: 'createFolder',
})(CreateFolderForm);
