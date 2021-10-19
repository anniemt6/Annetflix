import {API_LINK} from "../constants/constants.js";

const apiPageSize = 250;
let lastFetchedPageFromApi = 0;
let lastRequestedPage = 0;

const calculateSliceIndices = function (page, pageSize) {
    let first = page * pageSize - apiPageSize * lastFetchedPageFromApi;
    let second = page * pageSize + pageSize - apiPageSize * lastFetchedPageFromApi;

    if (lastFetchedPageFromApi > 0) {
        first += pageSize * lastFetchedPageFromApi;
        second += pageSize * lastFetchedPageFromApi;
    }
    return { start: first, end: second };
}

const fetchPagination = async function (page, pageSize) {
    page--;

    try {
        if (typeof page === 'number') {
            let responce = await fetch(`${API_LINK}/shows?page=${lastFetchedPageFromApi}`);
            let filmData = await responce.json();

            let indices = calculateSliceIndices(page, pageSize);
            let films = filmData.slice(indices.start, indices.end);

            if (films.length < pageSize) {
                if (page > lastRequestedPage) {
                    lastFetchedPageFromApi++;
                } else {
                    lastFetchedPageFromApi--;
                }
                responce = await fetch(`${API_LINK}/shows?page=${lastFetchedPageFromApi}`);
                filmData = await responce.json();
                indices = calculateSliceIndices(page, pageSize);
                films = filmData.slice(indices.start, indices.end);
            }

            lastRequestedPage = page;
            return films;
        } else {
            throw new Error('Ooops! Wrong. Pages must be only number.')
        }
    } catch (e) {
        console.log(e.message);
    }
}

const fetchSearch = async function(inpValue) {
    try {
        if (typeof inpValue === 'string') {
            const responce = await fetch(`${API_LINK}/search/shows?q=${inpValue}`);
            const filmsData =  await responce.json();

            const films = filmsData
                .splice(0, 10)
                .map(currentFilm => {
                    return currentFilm.show;
                });

            return films;
        } else {
            throw new Error('Ooops! Wrong data type. I want string value.');
        }
    } catch (e) {
        console.log(e.message);
    }
}

export {
    fetchPagination,
    fetchSearch
};
