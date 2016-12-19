const appkey="linker";
const saveAddress=function(corpus,address){
	localStorage.setItem(appkey+"."+corpus,address);
}
const loadAddress=function(corpus,defaultvalue){
	return localStorage.getItem(appkey+"."+corpus, defaultvalue||"");
}

module.exports={loadAddress,saveAddress};