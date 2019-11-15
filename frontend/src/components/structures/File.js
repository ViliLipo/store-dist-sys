import React from 'react';

import api from 'core/api';

function File(props) {
    // These functions should be moved out of this file.
    const renameFile = id => {
        api.files.renameFile('user', id).then(response => {
            console.log(response);
        });
    };

    const deleteFile = id => {
        api.files.deleteFile('user', id).then(response => {
            console.log(response);
        });
    };

    const downloadFile = id => {
        api.files.downloadFile('user', id).then(reponse => {
            console.log(response);
        });
    };

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
                <button onClick={() => downloadFile(props.file.id)}>
                    Download
                </button>
            </td>
            <td>
                <button onClick={() => deleteFile(props.file.id)}>
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default File;
