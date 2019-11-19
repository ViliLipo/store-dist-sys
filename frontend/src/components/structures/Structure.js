import React from 'react';

import Files from 'components/structures/Files';
import Folders from 'components/structures/Folders';

function Structure(props) {
    const {files, subfolders} = props.structure;

    return (
        <>
            <thead>
                <tr>
                    <td>name</td>
                    <td>path</td>
                </tr>
            </thead>
            <tbody>
                <Files user={props.user} files={files} />
                <Folders subfolders={subfolders} />
            </tbody>
        </>
    );
}

export default Structure;
