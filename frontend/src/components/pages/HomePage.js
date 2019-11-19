import React, {useEffect} from 'react';

import Structure from 'components/structures/Structure';
import UploadFileForm from 'components/forms/UploadFileForm';

import api from 'core/api';

function HomePage(props) {
    useEffect(() => {
        api.files.getFiles(props.user).then(structure => {
            props.setStructure(structure[0]);
        });
    }, []);

    const upload = values => {
        const homeFolderId = props.structure.id;
        api.files
            .uploadFile(props.user, homeFolderId, values.file)
            .then(response => {
                if (response.success) {
                    // TODO: if there's time, add error handling.
                    // Refresh the file list after uploading a new file.
                    api.files.getFiles(props.user).then(files => {
                        props.setStructure(files[0]);
                    });
                } else {
                    props.showNotification(response.message);
                }
            });
    };

    // Ideally, it shouldn't fail...
    const logout = () => {
        api.auth.logout().then(response => {
            if (response.success) {
                props.logout();
                props.removeUsername();
            }
        });
    };

    const submitModal = values => {
        api.directories
            .createFolder(props.user, values.name, `${props.user}/`) // Should add + location
            .then(response => {
                console.log('response:', response);
            });
    };

    return (
        <div>
            <h3>Distributed Systems 2019</h3>
            <table>
                <Structure user={props.user} structure={props.structure} />
            </table>
            <UploadFileForm onSubmit={upload} />
            <button
                onClick={() =>
                    props.openModal({
                        isOpen: true,
                        type: 'createFolder',
                        properties: {submitModal},
                    })
                }>
                Add a directory
            </button>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default HomePage;
