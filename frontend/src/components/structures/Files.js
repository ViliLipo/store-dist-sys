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
        <>
            <thead>
                <tr>
                    <td>name</td>
                    <td>path</td>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(props.files) &&
                    props.files.map(file => {
                        return (
                            <File user={props.user} key={file.id} file={file} />
                        );
                    })}
            </tbody>
        </>
    );
}

export default Files;
