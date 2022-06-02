import styles from './App.module.css';

import { Component } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";


import { getSearch } from "services/api"
import { LoadMore } from './LoadMore';

export function App() {
    state = {
        hits: [],
        searchQuery: '',
        page: 1,
        currentPage: 1,
        showModal: false,
        isLoading: false,
        totalHits: 0,
        errorMsg: '',
        per_page: 7,
        modalImage: null,
    };

    handleFormSubmit = queryFromSearchbar => {
        this.setState({ searchQuery: queryFromSearchbar, hits: [], page: 1 });
    };

    componentDidUpdate(prevProps, prevState) {
        const prevPage = prevState.page;
        const nextPage = this.state.page;
        const prevsearchQuery = prevState.searchQuery;
        const searchQuery = this.state.searchQuery;

        if (prevPage !== nextPage || prevsearchQuery !== searchQuery) {
            this.loadResults();
        }
    }

    loadResults = () => {
        const { page, per_page } = this.state;

        this.setState({ isLoading: true });

        getSearch(this.state.searchQuery, per_page, page)
            .then((hits) => {
                this.setState(prevState => ({
                    hits: [...prevState.hits, ...hits], errorMsg: ''
                }))
            })
            .catch((error) =>
                this.setState({
                    errorMsg: 'Error while loading data. Try again later.'
                })
            )
            .finally(() => {
                this.setState({ isLoading: false });
            });
    };


    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
    };

    zoomImage = image => {
        this.toggleModal();
        this.setState({
            modalImage: image,
        });
    };

    loadMore = () => {
        this.setState((prevState) => ({
            page: prevState.page + 1
        }));
    };


    render() {
        const { hits, isLoading, showModal, modalImage, searchQuery } = this.state;
        return (
            <div className={styles.App}>
                <Searchbar onSubmit={this.handleFormSubmit} />
                {hits.length > 0 && (
                    <ImageGallery images={hits} openModal={this.zoomImage} />
                )}
                {showModal && (
                    <Modal
                        largeImageURL={modalImage}
                        onClose={this.toggleModal}
                        description={searchQuery}
                    />
                )}
                {hits.length > 0 &&
                    <LoadMore isLoading={isLoading} loadMore={this.loadMore} />
                }


                {isLoading && <Loader />}
            </div>
        );
    }
}

