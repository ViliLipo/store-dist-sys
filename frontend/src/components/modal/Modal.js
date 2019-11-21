import React from 'react';

import CreateFolderForm from 'components/forms/CreateFolderForm';

// A component fo displaying a form (e.g., CreateFolderForm).
function Modal(props) {
    const MODAL_TYPE = {
        createFolder: CreateFolderForm,
    };

    const {
        data: {isOpen, properties, type},
        closeModal,
    } = props;

    if (!type) return null;

    const TypeModal = MODAL_TYPE[type];

    return (
        <div>
            {isOpen !== 0 && (
                <div>
                    <TypeModal onSubmit={properties.submitModal} />
                    <button className="button" onClick={closeModal}>
                        Hide
                    </button>
                </div>
            )}
        </div>
    );
}

export default Modal;
