const ADD_USERLINK="ADD_USERLINK"
     ,REMOVE_USERLINK="REMOVE_USERLINK"
     ,REMOVE_ALL_USERLINK="REMOVE_ALL_USERLINK"

var addtimer=null;
var additems=[];

const addUserLink=(id,rawpayload,corpus,article,targetcorpus)=>(dispatch,getState)=>{
	clearTimeout(addtimer);
	const payload=Object.assign({},rawpayload,{corpus:targetcorpus});
	additems.push({id,payload,corpus});
	addtimer=setTimeout(()=>{
		dispatch({type:ADD_USERLINK, items:additems});
		additems=[];
	},200);
}

const removeUserLink=(id,payload,corpus,article,targetcorpus)=>{
	return {type:REMOVE_USERLINK,corpus,id};
}
const removeAllUserLinks=(corpus)=>{
	return {type:REMOVE_ALL_USERLINK,corpus};
}
module.exports={removeAllUserLinks,addUserLink, removeUserLink,
ADD_USERLINK,REMOVE_USERLINK,REMOVE_ALL_USERLINK}