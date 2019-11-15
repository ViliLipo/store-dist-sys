import React from 'react';

import File from './File';

function Files(props) {
    if (props.files.length === 0) {
        return (
            <tbody>
                <tr>
                    <td>The user has no files</td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody>
            {Array.isArray(props.files) &&
                props.files.map(file => {
                    return <File key={file.id} file={file} />;
                })}
        </tbody>
    );
}

export default Files;
