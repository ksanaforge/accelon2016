const SET_SELECTION = 'SET_SELECTION';
const CLEAR_SELECTION='CLEAR_SELECTION';

const setSelection=(opts)=>(Object.assign({},{type:SET_SELECTION},opts));

const clearSelection=()=>({type:CLEAR_SELECTION});

module.exports={SET_SELECTION,CLEAR_SELECTION,
	setSelection,clearSelection};
