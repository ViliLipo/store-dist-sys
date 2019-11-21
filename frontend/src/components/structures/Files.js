import React from 'react';

import File from 'components/structures/File';

function Files(props) {
    if (props.files.length === 0) {
        return (
            <tr>
                <td>The user has no files</td>
            </tr>
        );
    }

    return (
        <>
            {Array.isArray(props.files.files) &&
                props.files.files.map(file => {
                    return <File user={props.user} key={file.id} file={file} />;
                })}
        </>
    );
}

export default Files;
