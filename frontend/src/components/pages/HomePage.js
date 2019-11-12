import React from 'react';

import Files from 'components/structures/Files';

function HomePage(props) {
    return (
        <div>
            Distributed Systems 2019
            <table>
                <Files
                    files={props.files}
                />
            </table>
            <button onClick={ props.uploadFile }>Upload</button>
            <button onClick={ props.logout }>Logout</button>
        </div>
    )
}

export default HomePage;
