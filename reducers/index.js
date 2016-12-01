const { combineReducers } =require('redux');
const corpora=require('./corpora');
const articles=require('./articles');
const activeArticle=require('./activetab');
const selections=require('./selections');
const querys=require("./querys");
const activeQuery=require("./activequery");
const activeCorpus=require("./activecorpus");
const rootReducer = combineReducers({
	corpora ,
	activeCorpus,

	articles ,
	activeArticle ,

	querys,
	activeQuery,

	selections,
});

module.exports=rootReducer;