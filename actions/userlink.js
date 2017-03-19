const ADD_USERLINK="ADD_USERLINK"
     ,REMOVE_USERLINK="REMOVE_USERLINK"
     ,REMOVE_ALL_USERLINK="REMOVE_ALL_USERLINK"

var addtimer=null;
var additems=[];

const addUserLink=(id,rawpayload,corpus,article,targetcorpus,decorator,fromcor)=>(dispatch,getState)=>{
	clearTimeout(addtimer);
	const r=fromcor.parseRange(rawpayload.from);
	
	const payload=Object.assign({},rawpayload,{
		start:r.start,end:r.end,
		range:r.range,
		corpus:targetcorpus,decorator
	});
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