import styles from './App.module.css';

import { useState, useEffect } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";
import { LoadMore } from './LoadMore';

import axios from "axios";
import settings from "./settings";

const { BASE_URL, API_KEY } = settings;
axios.defaults.baseURL = BASE_URL;


const APIfetch = async ({
    searchQuery = '',
    perPage = 7,
    page = 1,
} = {}) => {
    const response = await axios
        .get(
            `?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&per_page=${perPage}&page=${page}`);
    return response.data.hits;
};


export default function App() {
    const [hits, setHits] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //  const [totalHits, setTotalHits] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [perPage, setPerPage] = useState(7);
    const [modalImage, setModalImage] = useState(null);

    const handleFormSubmit = queryFromSearchbar => {
        setSearchQuery(queryFromSearchbar)
        setCurrentPage(1);
        setHits([])
        setPage(1)
        setErrorMsg(null);
    };

    useEffect(() => {
        if (!searchQuery) {
            return;
        }

        const loadResults = () => {
            setIsLoading(true);

            APIfetch({ searchQuery: searchQuery, currentPage, page })
                .then(response => {
                    setHits(prevResults => [...prevResults, ...response]);
                    // setPage(prevPage => prevPage + 1);
                })
                .catch(error => setErrorMsg(error.message))
                .finally(() => setIsLoading(false));
        };

        loadResults();

    }, [searchQuery, currentPage, page]);

    const toggleModal = () => setShowModal(!showModal);

    const zoomImage = image => {
        toggleModal();
        setModalImage(image);
    };


    // const loadMore = () => {
    //     setCurrentPage(prevPage => prevPage + 1);
    // };

    const loadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    return (
        <div className={styles.App}>
            <Searchbar onSubmit={handleFormSubmit} />
            {hits.length > 0 && (
                <ImageGallery images={hits} openModal={zoomImage} />
            )}
            {showModal && (
                <Modal
                    largeImageURL={modalImage}
                    onClose={toggleModal}
                    description={searchQuery}
                />
            )}
            {hits.length > 0 &&
                <LoadMore isLoading={isLoading} loadMore={loadMore} />
            }
            {isLoading && <Loader />}
        </div>
    );
}

