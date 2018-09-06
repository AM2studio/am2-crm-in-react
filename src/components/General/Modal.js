import React from 'react';
import Modal from 'react-modal';
import '../../styles/modal.css';

const AM2Modal = props => {
    const { open, children, handleModalClose } = props;
    return (
        <Modal ariaHideApp={false} isOpen={open} onRequestClose={handleModalClose}>
            {children}
        </Modal>
    );
};

export default AM2Modal;
