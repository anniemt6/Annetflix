import {filmName, filmImg, modalContent, modal} from "./index.js";

const removeFromFav = function (filmsArr, film) {
    return filmsArr.filter(elem => {
        return elem.id !== film.id;
    });
}

const isInArray = function (id, filmsArr) {
    return filmsArr.some(elem => elem.id === id);
}

const addOrRemoveFromFavorites = function (id, film) {
    let favFilms = JSON.parse(localStorage.getItem('Film')) || [];

    if (isInArray(id, favFilms)) {
        const updatedFilmsArr = removeFromFav(favFilms, film);
        localStorage.setItem('Film', JSON.stringify(updatedFilmsArr));

        return;
    } else {
        favFilms.push(film);
        localStorage.setItem('Film', JSON.stringify(favFilms));

        return;
    }
}

const makeLikeButtonColor = function (film, button) {
    let favFilms = JSON.parse(localStorage.getItem('Film')) || [];

    if (isInArray(film.id, favFilms)) {
        button.className = 'liked';
    } else {
        button.className = 'unliked';
    }
}

const isImageEmpty = function (img, link) {
    if (img) {
        img.setAttribute('src', link);
    } else {
        img.setAttribute('src', '../img/no-image.jpg');
    }
}

const clearModalWindowContent = function (nodeArr) {
    nodeArr.forEach(node => {
        node.innerHTML = '';
    });
}

const addContentToModalWindow = function (film) {
    clearModalWindowContent([filmName, filmImg, modalContent]);

    const textName = document.createTextNode(film.name);
    const textPremiered = document.createTextNode(`Premiered: ${film.premiered}`);
    const textNEnded = document.createTextNode(`Ended: ${film.ended}`);

    const img = document.createElement('img');
    const pPremiered = document.createElement('p');
    const pEnded = document.createElement('p');

    pPremiered.appendChild(textPremiered);
    pEnded.appendChild(textNEnded)

    img.setAttribute('src', film.image.original);

    filmName.appendChild(textName);
    filmImg.appendChild(img);
    modalContent.innerHTML = film.summary;
    modalContent.append(pPremiered, pEnded);
}

const generateFilmListItem = function (film) {
    const item = document.createElement('li');
    const image = document.createElement('img');
    const button = document.createElement('a');

    item.appendChild(image);
    item.appendChild(button);

    isImageEmpty(image, film.image.original);
    makeLikeButtonColor(film, button);

    const btnLikeHandler = () => {
        addOrRemoveFromFavorites(film.id, film);
        makeLikeButtonColor(film, button);
    }

    const openModalWindow = () => {
        modal.setAttribute('style', `display: block;`);
        addContentToModalWindow(film);
    }

    button.addEventListener('click', btnLikeHandler);
    image.addEventListener('click', openModalWindow);

    return item;
}

export {
    generateFilmListItem
};