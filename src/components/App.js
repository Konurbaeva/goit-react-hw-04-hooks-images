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

export default function App() {

    const [hits, setHits] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    // const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //  const [totalHits, setTotalHits] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [perPage, setPerPage] = useState(7);
    const [modalImage, setModalImage] = useState(null);

    const handleFormSubmit = queryFromSearchbar => {
        // setSearchQuery({ searchQuery: queryFromSearchbar })

        console.log('searchQuery: ', searchQuery)
        setSearchQuery(queryFromSearchbar)
        setHits([])
        setPage(1)
    };

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&per_page=${perPage}&page=${page}`
            )
            const data = await response.data.hits

            setHits(data);
        }

        fetchData();
    }, [searchQuery, page, perPage]);

    const toggleModal = () => setShowModal(!showModal);

    const zoomImage = image => {
        toggleModal();
        setModalImage(image);
    };

    const loadMore = (prevState) => {
        setPage({ page: prevState.page + 1 })
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

