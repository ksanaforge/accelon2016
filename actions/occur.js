const SET_HIGHLIGHT='SET_HIGHLIGHT',PREV_OCCUR="PREV_OCCUR",NEXT_OCCUR="NEXT_OCCUR";

function updateHighlight(querys,n,dispatch) {
	setTimeout(()=>{
		const query=querys[n];
		if (query.matches && query.matches[query.now]) {
			const start=query.matches[query.now][0];
			const len=query.matches[query.now][1]-start;
			dispatch({type:SET_HIGHLIGHT,start,len});		
		}
	},1);
}
function nextOccur() {
	return (dispatch,getState) => {
  	const activeQuery=getState().activeQuery;
		dispatch({type:NEXT_OCCUR,n:activeQuery});
		updateHighlight(getState().querys,activeQuery,dispatch);
	}
}
function prevOccur(){
	return (dispatch,getState) => {
  	const activeQuery=getState().activeQuery;
		dispatch({type:PREV_OCCUR,n:activeQuery});
		updateHighlight(getState().querys,activeQuery,dispatch);
	}
}


module.exports={SET_HIGHLIGHT,NEXT_OCCUR,PREV_OCCUR,nextOccur,prevOccur,updateHighlight};