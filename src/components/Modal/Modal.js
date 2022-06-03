import React, { useEffect } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

function Modal({ onClose, largeImageURL, description }) {

    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);


    return (
        <div className={styles.Overlay} onClick={onClose}>
            <div>
                <img
                    className={styles.ModalImage}
                    src={largeImageURL}
                    alt={description}
                />
            </div>
        </div>
    );
}

export default Modal;

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};