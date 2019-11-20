import React from 'react';
import {connect} from 'react-redux';

import Modal from 'components/modal/Modal';
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
    setStructure,
    openModal,
    closeModal,
    setCurrentId,
} from 'core/redux/actions';

function App(props) {
    return (
        <>
            <Notification
                hideNotification={props.hideNotification}
                text={props.text}
            />
            {props.isAuthorized && (
                <Modal data={props.modal} closeModal={props.closeModal} />
            )}
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
        structure: state.structure,
        modal: state.modal,
        folder: state.folder,
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
    setStructure,
    openModal,
    closeModal,
    setCurrentId,
})(App);
