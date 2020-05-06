import { elements } from "./base";

const renderIngredient = (measure, ing) => `<li class="recipe__ingredient">
    ${measure}&nbsp;<a href="#${ing}"> ${ing}</a></li>`;

    //const blank = () => ``;

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
}

export const renderRecipe = (state) =>{
    const markup = `
    <div class="recipe__title" style="background-image:linear-gradient(rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.2)), url('${state.recipe.img}');">

                <div class="recipe__title-expand">
                <ion-icon name="expand-outline" class="expand-btn"></ion-icon></div>
                <div class="recipe__title-headline"><h2>${state.recipe.name}</h2></div>
                <div class="recipe__title-like">
                <ion-icon class="recipe__title-icon" name="${state.likes.isLiked(state.recipe.id) ? `heart` : `heart-outline`}"></ion-icon></div>

            </div>
            <div class="recipe__instructions">
                <div class="recipe__details">
                    <div class="recipe__price"><ion-icon name="pricetag-outline"></ion-icon>${state.recipe.price}</div>
                    <div class="recipe__glasstype"><ion-icon name="wine-outline"></ion-icon>${state.recipe.glass}</div>
                    <div class="recipe__alcoholic"><ion-icon name="flame-outline"></ion-icon>${state.recipe.isAlcoholic}</div>
                </div>
                
                <div class="recipe__ingredients">
    
                    
                    
                    <h3>Ingredients</h3>
                    
                    <ul class="recipe__ingredients-list">
                        ${state.recipe.measures.map((el,i) => 
                            renderIngredient(el, state.recipe.ingredients[i])).join('')}

                        
                        

                    </ul>
                </div>
                <div class="recipe__steps">
                <h3>Instructions</h3>
                    <div class="recipe__steps-steps">
                        ${'<div>'+state.recipe.instructions.split('.').join('</div><div>')+'</div>'}
                    </div>    
                </div>
            </div>
        `

        elements.recipe.insertAdjacentHTML('beforeend', markup);
}

//${recipe.ingredients.length > recipe.measures.length ? recipe.ingredients.slice(recipe.measures.length).map(el => renderIngredient(el)).join('') : blank()}
