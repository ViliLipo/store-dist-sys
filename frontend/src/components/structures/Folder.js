import React from 'react';
import {Link, useRouteMatch} from 'react-router-dom';

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
