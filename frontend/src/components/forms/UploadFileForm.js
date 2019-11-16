import React from 'react';
import {reduxForm, Field} from 'redux-form';

const handleChange = handler => ({target: {files}}) =>
    handler(files.length && files[0]);
//handler(files.length ? {file: files[0], filename: files[0].name} : {});

const FileInput = ({
    input: {onChange, onBlur, value: omitValue, ...inputProps},
    meta: omitMeta,
    ...props
}) => (
    <input
        type="file"
        onChange={handleChange(onChange)}
        onBlur={handleChange(onBlur)}
        {...inputProps}
        {...props}
    />
);

function UploadFileForm(props) {
    return (
        <form encType="multipart/form-data" onSubmit={props.handleSubmit}>
            <Field type="file" name="file" component={FileInput} />
            <button>Upload</button>
        </form>
    );
}

UploadFileForm = reduxForm({
    form: 'upload',
})(UploadFileForm);

export default UploadFileForm;
