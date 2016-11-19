const { combineReducers } =require('redux');
const corpus=require('./corpus');
const articles=require('./articles');
const selections=require('./selections');
const caret=require('./caret');
const rootReducer = combineReducers({
	corpus ,
	articles ,
	selections,
	caret
});

module.exports=rootReducer;