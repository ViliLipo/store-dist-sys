import React from 'react';
import {reduxForm, Field} from 'redux-form';
import FontAwesomeIcon from 'react-fontawesome';
import {required} from 'core/utils/validations';

const handleChange = handler => ({target: {files}}) =>
    handler(files.length && files[0]);

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
            <Field
                type="file"
                name="file"
                component={FileInput}
                validate={required}
            />
            <button className="button button-primary"><FontAwesomeIcon name="upload"/> Upload</button>
        </form>
    );
}

UploadFileForm = reduxForm({
    form: 'upload',
})(UploadFileForm);

export default UploadFileForm;
