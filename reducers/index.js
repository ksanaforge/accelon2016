const { combineReducers } =require('redux');
const counter=require('./counter');
const corpus=require('./corpus');
const articles=require('./articles');
const rootReducer = combineReducers({
	counter ,
	corpus ,
	articles 
});

module.exports=rootReducer;