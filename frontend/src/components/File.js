import React from 'react';

function File(props) {
    return (
        <tr>
            <td>{props.file.path}</td>
            <td>{props.file.sha1_hash}</td>
        </tr>
    )
}

export default File;

