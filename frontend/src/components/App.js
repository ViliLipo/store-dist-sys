import React, { useState, useEffect } from 'react';
import Files from './Files';

import api from './../api';

function App() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        api.files.getFiles('user').then(files => {
            setFiles(files);
        });
    }, []);

    const uploadFile = () => {
        api.files.uploadFile('user', 'file').then(resp => {
            console.log('POST', resp);
        })
    }

    return (
        <div>
            Distributed Systems 2019
            <table>
                <Files files={files} />
            </table>
            <button onClick={() => uploadFile()}>Upload</button>
        </div>
    );
};

export default App;

