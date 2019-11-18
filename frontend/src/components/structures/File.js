import React from 'react';

import api from 'core/api';
import {url} from 'core/config';

function File(props) {
  // These functions should be moved out of this file.
  const renameFile = id => {
    api.files.renameFile(props.user, id).then(response => {
      console.log(response);
    });
  };

  const deleteFile = id => {
    api.files.deleteFile(props.user, id).then(response => {
      console.log(response);
    });
  };

  const href = `${url}/api/${props.user}/files/${props.file.parent_folder}/${
    props.file.id
  }`;

  return (
    <tr>
      <td>{props.file.name}</td>
      <td>{props.file.path}</td>
      <td>
        <button onClick={() => renameFile(props.file.id)}>Rename</button>
      </td>
      <td>
        <a download={props.file.name} href={href} target="_blank">
          Download
        </a>
      </td>
      <td>
        <button onClick={() => deleteFile(props.file.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default File;
