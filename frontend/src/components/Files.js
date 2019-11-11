import React from 'react';

import File from './File';

function Files(props) {
    return (
        <tbody>
            { props.files.map(file => {
                return (
                    <File key={file.id} file={file} />
                )
            }) }
        </tbody>
    )
}

export default Files;

