import {generateFilmListItem} from "./displayFilms.js";
import {favoritesURL, filmsList, pagination, selectorGenres, selectorLangs, selectorAmountOnPage} from "./index.js";

const createMsgForEmptyFavorites = function () {
    const createdMessage = document.createElement('p');
    const emptyMessage = document.createTextNode('Add films to favorites ❤');
    createdMessage.className = 'emptyMessage';
    createdMessage.appendChild(emptyMessage);
    document.body.appendChild(createdMessage);

    return createdMessage;
}

const isFavoritesEmpty = function () {
    const storedData = localStorage.getItem('Film');
    const storedDataLength = JSON.parse(storedData).length;

    if (storedData === null || storedDataLength === 0) {
        createMsgForEmptyFavorites();
    }
}

const addClassNameToNode = function (nodeArr, className) {
    nodeArr.forEach(node => {
       node.className = className;
    });
}

const displayFavoritesHandler = () => {
    isFavoritesEmpty();

    const films = JSON.parse(localStorage.getItem('Film'));
    filmsList.innerHTML = '';

    addClassNameToNode([pagination, selectorGenres, selectorLangs, selectorAmountOnPage], 'hide');
    addClassNameToNode([filmsList], 'favorites');

    films.forEach(film => {
        filmsList.appendChild(generateFilmListItem(film));
    });
}

favoritesURL.addEventListener('click', displayFavoritesHandler);

export {
    addClassNameToNode
};








