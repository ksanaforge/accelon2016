const {ADD_FILTER_GROUP,REMOVE_FILTER_GROUP,CLEAR_FILTER}=require("../actions/filter");
const {UPDATE_HITS}=require("../actions/grouping");
const {OPEN_CORPUS_SUCCESS}=require("../actions/corpus");

module.exports=function articlegroup(state = {} , action = {}) {
	const A=action;
	var newstate=state;
	if (OPEN_CORPUS_SUCCESS===A.type){
		if (!state[A.corpus]) {
			newstate=Object.assign({},state,{[A.corpus]:{hits:[],include:[]}});
		}
	} else if (UPDATE_HITS===A.type)  {
		const include=state[A.corpus].include;
		const hits=A.hits;
		newstate=Object.assign({},state,{[A.corpus]:{hits,include}});
	}

	return newstate;
}
