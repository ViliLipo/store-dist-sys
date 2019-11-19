import React, {useState, useEffect} from 'react';
import {useRouteMatch, useParams} from 'react-router-dom';

import Files from 'components/structures/Files';
import Folders from 'components/structures/Folders';

const searchForObject = (object, name) => {
    if (object !== null && object.name === name) {
        return object;
    }

    let result;

    for (let property in object) {
        if (
            object.hasOwnProperty(property) &&
            typeof object[property] === 'object'
        ) {
            result = searchForObject(object[property], name);
            if (result) {
                return result;
            }
        }
    }
    return result;
};

function Structure(props) {
    const [files, setFiles] = useState({});

    useEffect(() => {
        // This will not work with paths that contain whitespace between words.
        // TODO: Add validation to the directory name.
        const current = props.location.pathname.split(/[\/ ]+/).pop();
        setFiles(searchForObject(props.structure, current));
    }, [props.structure, props.location, files]);

    return (
        <>
            <thead>
                <tr>
                    <td>name</td>
                    <td>path</td>
                </tr>
            </thead>
            <tbody>
                {props.name}
                <Files user={props.user} files={files} />
                <Folders subfolders={files.subfolders} />
            </tbody>
        </>
    );
}

export default Structure;
