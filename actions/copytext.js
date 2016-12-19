const copyText=({cm,value,krange,cor})=>(dispatch,getState)=>{
		return "「"+value+"」"+"《"+cor.getTitle(krange)+"》"+cor.stringify(krange).replace(/\d+p/,"p");
}

module.exports={copyText};
