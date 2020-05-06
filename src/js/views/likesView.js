import { elements } from './base';

export const renderLikes = (res, resPerPage = 99, page = 1) => {    
    res.slice((page-1) * resPerPage, (page-1) * resPerPage + resPerPage).forEach((el) => {
        let markup = `
        <li class="likes__item">
        <a href="#${el.id}" class="likes__link">
            <div class="likes__item-thumbnail">
                <img src="${el.img}" alt="img-1" class="likes__item-img">
                <div class="likes__item-title" >${el.title}</div>
            </div>
        </a>
    </li>
        `
        elements.likes.insertAdjacentHTML('beforeend', markup);
    });
};

export const clearLikes = () => {
    elements.likes.innerHTML = '';
}