const { combineReducers } =require('redux');
const corpora=require('./corpora');
const articles=require('./articles');
const activeArticle=require('./activetab');
const selections=require('./selections');
const querys=require("./querys");
const activeQuery=require("./activequery");
const activeCorpus=require("./activecorpus");
const excerpts=require("./excerpts");
const filters=require("./filters");

const rootReducer = combineReducers({
	corpora ,
	activeCorpus,

	articles ,
	activeArticle ,

	querys,
	activeQuery,

	selections,
	excerpts,
	filters
});

module.exports=rootReducer;