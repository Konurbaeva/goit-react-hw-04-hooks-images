import styles from './App.module.css';

import { Component } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";


import { getSearch } from "services/api"
import { LoadMore } from './LoadMore';

export default function App() {
    // state = {
    //     hits: [],
    //     searchQuery: '',
    //     page: 1,
    //     currentPage: 1,
    //     showModal: false,
    //     isLoading: false,
    //     totalHits: 0,
    //     errorMsg: '',
    //     per_page: 7,
    //     modalImage: null,
    // };

    const [hits, setHits] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [totalHits, setTotalHits] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [per_page, setPerPage] = useState(7);
    const [modalImage, setModalImage] = useState(null);


    const handleFormSubmit = queryFromSearchbar => {
        setSearchQuery({ searchQuery: queryFromSearchbar })
        setHits([])
        setPage(1)
    };

    // componentDidUpdate(prevProps, prevState) {
    //     const prevPage = prevState.page;
    //     const nextPage = this.state.page;
    //     const prevsearchQuery = prevState.searchQuery;
    //     const searchQuery = this.state.searchQuery;

    //     if (prevPage !== nextPage || prevsearchQuery !== searchQuery) {
    //         loadResults();
    //     }
    // }

    useEffect(() => {


    }, [page, searchQuery])


    const loadResults = () => {
        const { page, per_page } = this.state;

        setIsLoading(true);

        getSearch(searchQuery, per_page, page)
            .then((hits) => {
                // this.setState(prevState => ({
                //     hits: [...prevState.hits, ...hits], errorMsg: ''
                // }))
                setHits(prevState => ({
                    hits: [...prevState.hits, ...hits]
                }))

                setErrorMsg('');
            })
            .catch((error) =>
                // this.setState({
                //     errorMsg: 'Error while loading data. Try again later.'
                // })
                setErrorMsg('Error while loading data. Try again later.')
            )
            .finally(() => {
                setIsLoading(false)
            });
    };

    const toggleModal = () => setShowModal(!showModal);

    const zoomImage = image => {
        toggleModal();
        setModalImage(image);
    };

    const loadMore = () => {
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

