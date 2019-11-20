import React from 'react';
import {connect} from 'react-redux';

import api from 'core/api';
import {url} from 'core/config';
import {setStructure, showNotification} from 'core/redux/actions';

function File(props) {
    // These functions should be moved out of this file.
    // Get name from some UI-component
    const renameFile = id => {
        api.files.renameFile(props.user, id, 'newMockName').then(response => {
            console.log(response);
        });
    };

    // TODO: Update the file list after deleting an item.
    const deleteFile = id => {
        api.files.deleteFile(props.user, id).then(response => {
            if (response.success) {
                api.files.getFiles(props.user).then(files => {
                    props.setStructure(files[0]);
                });
            } else {
                props.showNotification(response.message);
            }
        });
    };

    const href = `${url}/api/${props.user}/files/${props.file.parent_folder}/${props.file.id}`;

    return (
        <tr>
            <td>{props.file.name}</td>
            <td>{props.file.path}</td>
            <td>
                <button onClick={() => renameFile(props.file.id)}>
                    Rename
                </button>
            </td>
            <td>
                <a download={props.file.name} href={href} target="_blank">
                    Download
                </a>
            </td>
            <td>
                <button onClick={() => deleteFile(props.file.id)}>
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default connect(null, {
    setStructure,
    showNotification,
})(File);
