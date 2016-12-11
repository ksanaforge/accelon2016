const { combineReducers } =require('redux');

const corpora=require("./corpora");
const articles=require("./articles");
const selections=require("./selections");
const activeArticle=require('./activearticle');

const rootReducer = combineReducers({
	corpora,
	articles,
	selections,
	activeArticle
});

module.exports=rootReducer;