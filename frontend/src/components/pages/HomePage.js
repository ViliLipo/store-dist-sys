import React, { useState, useEffect } from 'react';

import Files from 'components/structures/Files';

import api from 'core/api';

function HomePage(props) {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        api.files.getFiles('user').then(files => {
            setFiles(files);
        });
    }, []);

    return (
        <div>
            Distributed Systems 2019
            <table>
                <Files
                    files={files}
                />
            </table>
            <button onClick={ props.uploadFile }>Upload</button>
            <button onClick={ props.logout }>Logout</button>
        </div>
    )
}

export default HomePage;
