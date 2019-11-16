import React, {useState, useEffect} from 'react';

import Files from 'components/structures/Files';
import UploadFileForm from 'components/forms/UploadFileForm';

import api from 'core/api';

function HomePage(props) {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        api.files.getFiles(props.user).then(files => {
            setFiles(files);
        });
    }, []);

    const submit = values => {
        api.files.uploadFile(props.user, values.file).then(response => {
            console.log(response);
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
                <Files files={files} />
            </table>
            <UploadFileForm onSubmit={submit} />
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default HomePage;
