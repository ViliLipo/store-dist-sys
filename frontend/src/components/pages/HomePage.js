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
        api.files
            .uploadFile(props.user, props.folder.id, values.file)
            .then(response => {
                if (response.success) {
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
        const path = `${props.location.pathname.replace(
            /home/gi,
            props.user,
        )}/`;
        api.directories
            .createFolder(props.user, values.name, path)
            .then(response => {
                if (response.success) {
                    api.files.getFiles(props.user).then(files => {
                        props.setStructure(files[0]);
                    });
                } else {
                    props.showNotification(response.message);
                }
            });

        props.closeModal();
    };

    return (
        <div>
            <h3>Distributed Systems 2019</h3>
            {props.structure.files.length !== 0 ||
            props.structure.subfolders.length !== 0 ? (
                <table>
                    <Structure
                        user={props.user}
                        structure={props.structure}
                        location={props.location}
                        folder={props.folder}
                        setCurrentId={props.setCurrentId}
                    />
                </table>
            ) : (
                <h4>The user has no folders or files uploaded</h4>
            )}

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
