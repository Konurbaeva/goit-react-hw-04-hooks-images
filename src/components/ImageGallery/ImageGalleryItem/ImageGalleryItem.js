import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ webImage, openModal, description, largeImageURL }) {
    return (
        <li className={styles.ImageGalleryItem}>
            <img
                className={styles.ImageGalleryItem_image}
                src={webImage}
                alt={description}
                onClick={() => openModal(largeImageURL)}
            />
        </li>
    );
}

export default ImageGalleryItem;


ImageGalleryItem.propTypes = {
    webImage: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
};