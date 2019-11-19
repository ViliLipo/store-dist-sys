import React from 'react';

import Folder from 'components/structures/Folder';

function Folders(props) {
    return (
        <tr>
            {Array.isArray(props.subfolders) &&
                props.subfolders.length !== 0 &&
                props.subfolders.map(subfolder => {
                    return (
                        <Folder
                            user={props.user}
                            key={subfolder.id}
                            file={subfolder.name}
                        />
                    );
                })}
        </tr>
    );
}

export default Folders;
