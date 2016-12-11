const {OPEN_RIGHT,OPEN_LEFT}=require("../actions/linkarticle")

module.exports=function linkarticles(state = {} , action = {}) {
	const A=action;
	if (OPEN_RIGHT===A.type) {
		const right=Object.assign({},action,{type:null});
		return {left:state.left, right};
	} else if (OPEN_LEFT===A.type) {
		const left=Object.assign({},action,{type:null});
		return {right:state.right,left};
	}
	return state;
}