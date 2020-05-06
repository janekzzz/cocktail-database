import { elements } from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => elements.searchInput.value = '';

export const clearSearchResults = () => elements.searchResults.innerHTML = '';


const parseTitle = (str) => {
    if (str.length > 25) {
        str = str.slice(0,20) + '...';
        
    }
    return str;
} 

export const renderSearchResults = (results, resPerPage = 3, page = 1) => {    
    results.slice((page-1) * resPerPage, (page-1) * resPerPage + resPerPage).forEach((el) => {
        let markup = `
        <li class="search__item">
            <a href="#${el.idDrink}" class="search__link">
                <div class="search__item-thumbnail">
                    <img src="${el.strDrinkThumb}" alt="img-1" class="search__item-img">
                    <div class="search__item-title" >${parseTitle(el.strDrink)}</div>
                </div>
            </a>
        </li>
        `
        elements.searchResults.insertAdjacentHTML('beforeend', markup);
    });
};

export const renderPageButton = (type) => {
    const markup = `<button class="btn-${type}"><ion-icon name="chevron-${type === 'prev' ? 'up' : 'down'}-outline"></ion-icon></button>`
    
    type === 'prev' ? elements.buttonPrev.insertAdjacentHTML('beforeend', markup) : elements.buttonNext.insertAdjacentHTML('beforeend', markup);
   
}

export const clearPageButton = (type) => {
    type === 'prev' ? elements.buttonPrev.innerHTML='' : elements.buttonNext.innerHTML='';

}
