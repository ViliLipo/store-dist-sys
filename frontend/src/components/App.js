import React from 'react';
import {connect} from 'react-redux';

import Router from 'components/structures/Router';
import Notification from 'components/structures/Notification';

import {
    addAuthorization,
    removeAuthorization,
    addUsername,
    removeUsername,
    setFiles,
    showNotification,
    hideNotification,
} from 'core/redux/actions';

function App(props) {
    return (
        <>
            <Notification
                hideNotification={props.hideNotification}
                text={props.text}
            />
            <Router {...props} />
        </>
    );
}

const mapStateToProps = state => {
    return {
        isAuthorized: state.auth.isAuthorized,
        username: state.user.username,
        files: state.files.files,
        text: state.notification.text,
    };
};

export default connect(mapStateToProps, {
    addAuthorization,
    removeAuthorization,
    addUsername,
    removeUsername,
    setFiles,
    showNotification,
    hideNotification,
})(App);
