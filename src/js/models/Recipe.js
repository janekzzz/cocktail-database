import axios from 'axios';


const filterIngredients = (obj) => {
    let myKeys = Object.keys(obj);
    let myValues = Object.values(obj);
    let ingredientList = [];
    let measuresList = [];

    myKeys.forEach((el, index) => {
        if (el.includes('gredient') && myValues[index] ) {
            ingredientList.push(myValues[index]);
        } else if (el.includes('Measure') && myValues[index]) {
            measuresList.push(myValues[index]);        }
    })

    if (ingredientList.length > measuresList.length) {
        for (let i=0; i<=(ingredientList.length-measuresList.length);i++){
            measuresList.push('');
        }
    }
    
    return([ingredientList, measuresList]);
    
}



export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {

        //const temp = st[st.findIndex(el=> el.idDrink === this.id)];

        try {
            const temp = await axios(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.id}`);
            const res=temp.data.drinks[0];
            

            this.name = res.strDrink;
            this.img = res.strDrinkThumb;
            this.glass = res.strGlass;
            this.instructions = res.strInstructions;
            this.isAlcoholic = res.strAlcoholic;
            [this.ingredients, this.measures] = filterIngredients(res);

        } catch (err){
            console.log(err);
        }


             
    }

    calcPrice() {
        if (this.ingredients.length <= 3){
            this.price = '$';
        } else if (this.ingredients.length > 3 && this.ingredients.length <=6 ) {
            this.price = '$$';
        } else {
            this.price = '$$$';
        }
    }

}

