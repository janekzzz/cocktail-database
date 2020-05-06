import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';
import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView';
import Likes from './models/Likes';
import * as likesView from './views/likesView';

const state = {};
state.likes = new Likes();
var page = 1;
var perPage = 5; //3 results shown per page

const controlSearch = async (q = undefined) => {
  //reset page to 1
  page = 1;

  //get the search query into state.query
  //clear the input field

  if (!q) {
    state.query = searchView.getInput();
    searchView.clearInput();
  } else {
    state.query = q;
    searchView.clearInput();
  }

  //if there is a query
  if (state.query) {
    try {
      const results = new Search(state.query);
      //get the search results
      state.searchResults = await results.getResults(q);
      //clear the search results view and buttons
      searchView.clearSearchResults();

      searchView.clearPageButton('prev');
      searchView.clearPageButton('next');
      //render the search results
      searchView.renderSearchResults(state.searchResults, perPage, 1);
      //if necessary - display the next button
      if (state.searchResults.length > perPage) {
        searchView.renderPageButton('next');
      }
    } catch (err) {
      console.log('error');
    }
  }
};

//if enter is pressed on the search - run the controlSearch() function!
elements.searchInput.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
    controlSearch();
  }
});

//if the next button is clicked.
elements.buttonNext.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-next');
  if (btn && state.searchResults.length > page * perPage) {
    // if we go from 1st to 2nd page - display the previous button
    page === 1 ? searchView.renderPageButton('prev') : {};
    // turn the page
    page += 1;
    // clear the old results and display new ones for new page
    searchView.clearSearchResults();
    searchView.renderSearchResults(state.searchResults, perPage, page);
    // if this is the last page, hide the next button
    state.searchResults.length <= page * perPage
      ? searchView.clearPageButton('next')
      : {};
  }
});

//if the previous button is clicked
elements.buttonPrev.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-prev');
  if (btn && page >= 1) {
    //if we go from last to next to last page - display the prev button
    state.searchResults.length <= page * perPage
      ? searchView.renderPageButton('next')
      : {};
    //turn the page
    page -= 1;
    //clear the old results and display new ones for new page
    searchView.clearSearchResults();
    searchView.renderSearchResults(state.searchResults, perPage, page);
    // if this is the first page, hide the prev button
    page === 1 ? searchView.clearPageButton('prev') : {};
  }
});

const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '');
  if (parseInt(id, 10)) {
    state.recipe = new Recipe(id);
    document.querySelector('.recipe').classList.remove('recipe-hidden');

    try {
      await state.recipe.getRecipe();

      state.recipe.calcPrice();
      recipeView.clearRecipe();
      recipeView.renderRecipe(state);
      
      
    } catch (err) {
      console.log(err);
    }
  } else {
    controlSearch(id);
  }
};

['hashchange', 'load'].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

elements.searchResults.addEventListener('click', (e) => {
  if (state.activeButton) {
    state.activeButton.classList.remove('item-active');
  }
  const btn = e.target.parentNode.parentNode.parentNode;

  if (btn) {
    btn.classList.add('item-active');
    state.activeButton = btn;
  }
});

const controlLike = () => {
  console.log(state.recipe);
  if (!state.likes) {
    state.likes = new Likes();
  }

  if (state.likes.isLiked(state.recipe.id)) {
    state.likes.deleteLike(state.recipe.id);
    document.querySelector('.recipe__title-icon').name = 'heart-outline';
    likesView.clearLikes();
    likesView.renderLikes(state.likes.likes);
    state.likes.persistData();
  } else {
    state.likes.addLike(state.recipe.id, state.recipe.name, state.recipe.img);
    document.querySelector('.recipe__title-icon').name = 'heart';
    likesView.clearLikes();
    likesView.renderLikes(state.likes.likes);
    state.likes.persistData();
  }
};

elements.recipe.addEventListener('click', (e) => {
  if (e.target.matches('.recipe__title-like, .recipe__title-like *')) {
    controlLike();
  } else if (
    e.target.matches('.recipe__title-expand, .recipe__title-expand *')
  ) {
    document
      .querySelector('.recipe__title')
      .classList.toggle('recipe__title-big');

    document.querySelector('.expand-btn').name === 'expand-outline'
      ? (document.querySelector('.expand-btn').name = 'contract-outline')
      : (document.querySelector('.expand-btn').name = 'expand-outline');
  }
});

// Restore liked recipes on page load
window.addEventListener('load', () => {
  state.likes = new Likes();

  // Restore likes
  state.likes.readStorage();
  console.log(state.likes);

  // Render the existing likes
  likesView.renderLikes(state.likes.likes);
});
