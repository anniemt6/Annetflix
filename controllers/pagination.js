import {fetchPagination} from "../model/model.js";
import {generateFilmListItem} from "./displayFilms.js";
import {addListenersToSelect, fRuleGenres, fRuleLangs} from "./filter.js";
import {selectorGenres, selectorLangs, selectorAmountOnPage, prevButton, nextButton, filmsList} from "./index.js";

const pageNumbersDisplayedOnPage = document.getElementById('pageNumber');
let pageNumber = document.getElementById('pageNumber').getElementsByClassName('clickPageNumber');

const numberOfPages = 5;
let pageSize = Number(selectorAmountOnPage.value);

const pagination = {
    current_page: 1,
    startPage: 1,
    endPage: 5,

    init: function() {
        changePage(this.current_page);
        pageNumbers(this.startPage, this.endPage);
        selectedPage();
        clickOnPage();
        addListeners();
    }
};

const checkPrevButtonActivity = function () {
    if (pagination.current_page === 1) {
        prevButton.classList.add('opacity');
    } else {
        prevButton.classList.remove('opacity');
    }
}

const checkNextButtonActivity = function () {
    if (pagination.current_page === pagination.endPage) {
        nextButton.classList.add('opacity');
    } else {
        nextButton.classList.remove('opacity');
    }
}

const checkButtonActivity = function () {
    checkPrevButtonActivity();
    checkNextButtonActivity();
}

let selectedPage = function () {
    for (let i = 0; i < pageNumber.length; i++) {
        if (pageNumber[i].textContent == pagination.current_page) {
            pageNumber[i].style.opacity = "3.0";
        }
        else {
            pageNumber[i].style.opacity = "0.2";
        }
    }
}

const changePage = function (page) {
    if (page < 1) {
        page = 1;
    }

    if (page < pagination.startPage) {
        pagination.startPage = page - numberOfPages + 1;
        pagination.endPage = page;
        pageNumbers(pagination.startPage, pagination.endPage);
        pageNumber = document.getElementById('pageNumber').getElementsByClassName('clickPageNumber');
    }

    if (page > pagination.endPage) {
        pagination.startPage = page;
        pagination.endPage = page + numberOfPages - 1;
        pageNumbers(pagination.startPage, pagination.endPage);
        pageNumber = document.getElementById('pageNumber').getElementsByClassName('clickPageNumber');
    }

    pagination.current_page = page;

    filmsList.innerHTML = '';

    fetchPagination(page, pageSize)
        .then (filmsArr => {
            filmsArr.forEach(film => {
                filmsList.appendChild(generateFilmListItem(film));
            });

            addListenersToSelect(selectorLangs, fRuleLangs, filmsArr);
            addListenersToSelect(selectorGenres, fRuleGenres, filmsArr);

        });

    checkButtonActivity();
    selectedPage();
}

const clickOnPage = function () {
    document.addEventListener('click', ( {target} ) => {
        const clickNumsRule =
            target.nodeName === 'SPAN' &&
            target.classList.contains('clickPageNumber');

        if (clickNumsRule) {
            changePage(Number(target.textContent));
        }
    });
}

const pageNumbers = function(first, last) {
    pageNumbersDisplayedOnPage.innerHTML = '';

    for (let i = first; i <= last; i++) {
        pageNumbersDisplayedOnPage.innerHTML += `<span class='clickPageNumber'>` + i + `</span>`;
    }
}

const prevPageHandler = () => {
    if (pagination.current_page > 1) {
        changePage(pagination.current_page - 1);
    }
}

const nextPageHandler = () => {
    changePage(pagination.current_page + 1);
}

const addListeners = function() {
    prevButton.addEventListener('click', prevPageHandler);
    nextButton.addEventListener('click', nextPageHandler);
}

selectorAmountOnPage.addEventListener('change', () => {
    pageSize = Number(selectorAmountOnPage.value);
    changePage(pagination.current_page);
});

pagination.init();







