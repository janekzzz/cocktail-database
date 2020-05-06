import axios from 'axios';

export default class Search {

    constructor(query) {
        this.query = query;
    }

    async getResults(q=undefined) {
        try {
            if (q) {
                const res = await axios(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.query}`);
                this.result = res.data.drinks;
            } else {
                
                const res = await axios(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.query}`);
                
                this.result = res.data.drinks;
            }
            
            return this.result;
            
        } catch(error) {
            alert('Cannot get search results');
        }
    }

}

/*
// so we have class Search:
example:

Search {
    query: 'vodka'
    result: [
        [id="6352", strDrink="Vodka cocktail1",....]
    ]

}

*/