import React from 'react';
import {Link, useRouteMatch} from 'react-router-dom';

// A component which renders a folder as a table row containing a link to the
// folder and the folders name.
function Folder(props) {
    const {url} = useRouteMatch();

    return (
        <tr>
            <td>
                <Link to={`${url}/${props.name}`}>{props.name}</Link>
            </td>
            <td>{props.path}</td>
        </tr>
    );
}

export default Folder;
