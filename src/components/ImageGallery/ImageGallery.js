
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import styles from './ImageGallery.module.css'
import PropTypes from 'prop-types';

function ImageGallery({ images, openModal }) {

    return (
        <ul className={styles.ImageGallery}>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem
                    key={id}
                    webImage={webformatURL}
                    description={tags}
                    openModal={openModal}
                    largeImageURL={largeImageURL}

                />
            ))}
        </ul>
    );
}

export default ImageGallery;


ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        })
    ),
    openModal: PropTypes.func.isRequired,
};