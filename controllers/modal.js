import {modal, closeBtn, filmImg} from "./index.js";

const closeModWinByButton = () => {
    modal.setAttribute('style', `display: none;`);
}

const closeModWinAnywhere = ( {target} ) => {
    if (target === modal) {
        modal.setAttribute('style', `display: none;`);
    }
}

closeBtn.addEventListener('click', closeModWinByButton);
window.addEventListener('click', ( {target} ) => closeModWinAnywhere({target} ));
