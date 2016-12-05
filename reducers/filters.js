const {ADD_FILTER_GROUP,REMOVE_FILTER_GROUP,CLEAR_FILTER}=require("../actions/filter");
const {OPEN_CORPUS_SUCCESS}=require("../actions/corpus");

module.exports=function articlegroup(state = {} , action = {}) {
	const A=action;
	if (OPEN_CORPUS_SUCCESS===A.type){
		var newstate=state;
		if (!state[A.corpus]) {
			newstate=Object.assign({},state,{[A.corpus]:[]});
		}
		return newstate;
	}

	return state;
}
