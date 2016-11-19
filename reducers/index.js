const { combineReducers } =require('redux');
const corpus=require('./corpus');
const articles=require('./articles');
const activeArticleTab=require('./activetab');
const selections=require('./selections');
const caret=require('./caret');
const rootReducer = combineReducers({
	corpus ,
	articles ,
	activeArticleTab ,
	selections,
	caret
});

module.exports=rootReducer;