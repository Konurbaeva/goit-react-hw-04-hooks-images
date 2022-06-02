import axios from "axios";
import settings from "../components/settings";

const { BASE_URL, API_KEY } = settings;
axios.defaults.baseURL = BASE_URL;

export const getSearch = async (searchQuery, per_page, page) => {

    const response = await axios.get(
        `?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&per_page=${per_page}&page=${page}`
    )

    return response.data.hits
}