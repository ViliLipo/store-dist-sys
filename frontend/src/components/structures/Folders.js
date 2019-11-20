import React from 'react';

import Folder from 'components/structures/Folder';

function Folders(props) {
    return (
        <>
            {Array.isArray(props.subfolders) &&
                props.subfolders.length !== 0 &&
                props.subfolders.map(subfolder => {
                    return (
                        <Folder
                            key={subfolder.id}
                            path={subfolder.path}
                            name={subfolder.name}
                        />
                    );
                })}
        </>
    );
}

export default Folders;
