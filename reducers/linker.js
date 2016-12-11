const { combineReducers } =require('redux');

const corpora=require("./corpora");
const linkarticle=require("./linkarticle");
const selections=require("./selections");
const rootReducer = combineReducers({
	corpora,
	linkarticle,
	selections
});

module.exports=rootReducer;