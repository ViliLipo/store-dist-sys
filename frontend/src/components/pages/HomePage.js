import React, {useEffect} from 'react';

import Files from 'components/structures/Files';
import UploadFileForm from 'components/forms/UploadFileForm';

import api from 'core/api';

function HomePage(props) {
    useEffect(() => {
        api.files.getFiles(props.user).then(files => {
            props.setFiles(files);
        });
    }, []);

    const submit = values => {
        api.files.uploadFile(props.user, values.file).then(response => {
            if (response.success) {
                // TODO: if there's time, add error handling.
                // Refresh the file list after uploading a new file.
                api.files.getFiles(props.user).then(files => {
                    props.setFiles(files);
                });
            }
        });
    };

    const logout = () => {
        api.auth.logout().then(response => {
            if (response.success) {
                props.logout();
                props.removeUsername();
            }
        });
    };

    return (
        <div>
            Distributed Systems 2019
            <table>
                <Files user={props.user} files={props.files} />
            </table>
            <UploadFileForm onSubmit={submit} />
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default HomePage;
