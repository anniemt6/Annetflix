import {generateFilmListItem} from "./displayFilms.js";
import {fetchSearch} from "../model/model.js";
import {addClassNameToNode} from "./favorites.js";
import {filmsList, pagination, searchInput, searchButton, selectorGenres, selectorLangs, selectorAmountOnPage} from "./index.js";

const showNoResult = function () {
    const item = document.createElement('p');
    const message = document.createTextNode('Not Found. Try again, please.');

    filmsList.className = 'emptyMessage';

    filmsList.appendChild(item);
    item.appendChild(message);
}

const isFoundFilms = function (films) {
    if (films.length === 0) {
        showNoResult();
    }
}

const searchHandler = () => {
    filmsList.innerHTML = '';

    addClassNameToNode(
        [
            pagination,
            selectorGenres,
            selectorLangs,
            selectorAmountOnPage
        ],
        'hide'
    );

    addClassNameToNode([filmsList], 'favorites');

    fetchSearch(searchInput.value)
        .then(films => {
            isFoundFilms(films);

            films.forEach(film => {
                filmsList.appendChild(generateFilmListItem(film));
            });
        });
}

searchButton.addEventListener('click', searchHandler);

export {
    isFoundFilms,
    showNoResult
};


