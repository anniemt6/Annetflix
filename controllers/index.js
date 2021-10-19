const favoritesURL = document.getElementById('favorites');
const filmsList = document.getElementById('filmsList');
const pagination = document.getElementById('pagination');

const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchBtn');

const modal = document.getElementById('modal');
const closeBtn = document.getElementsByClassName('close')[0];

const modalContent = document.getElementById('content');
const filmName = document.getElementById('filmName');
const filmImg = document.getElementById('filmImg');

const selectorGenres = document.getElementById('selectGenres');
const selectorLangs = document.getElementById('selectLang');
const selectorAmountOnPage = document.getElementById('amountFilms');

const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');


export {
    favoritesURL,
    filmsList,
    pagination,
    searchInput,
    searchButton,
    modal,
    closeBtn,
    modalContent,
    filmName,
    filmImg,
    selectorGenres,
    selectorLangs,
    selectorAmountOnPage,
    prevButton,
    nextButton,
};