import {generateFilmListItem} from "./displayFilms.js";
import {filmsList, pagination} from "./index.js";
import {isFoundFilms} from "./search.js";

const fRuleGenres = function (genre, films) {
    return films.filter(item => item.genres.includes(genre));
}

const fRuleLangs = function (genre, films) {
    return films.filter(item => item.language === genre);
}

const addListenersToSelect = function (selector, filterRule, films) {
    const listenersToSelectHandler = () => {
        filmsList.innerHTML = '';
        pagination.classList.add('hide');

        if (selector.value === 'All') {
            pagination.classList.remove('hide');
            filmsList.classList.remove('emptyMessage');

            films.forEach(film => {
                filmsList.appendChild(generateFilmListItem(film));
            });
        } else {
            const filteredFilms = filterRule(selector.value, films);
            isFoundFilms(filteredFilms);

            filteredFilms.forEach(film => {
                filmsList.appendChild(generateFilmListItem(film));
            });
        }
    }

    selector.addEventListener('change', listenersToSelectHandler);
}

export {
    addListenersToSelect,
    fRuleGenres,
    fRuleLangs
};


