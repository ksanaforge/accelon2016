const {openCorpus,trimArticleField}=require("ksana-corpus");

const	getWorkingLinks=(workinglinks,prefix,article)=>{
	if (!workinglinks)return null;

	const fields=trimArticleField(workinglinks,article);
	const value=fields.value.map( v=> prefix+"@"+v);
	return {pos:fields.pos,value};
}
const makeWLinkId=function(kpos,address){
	return kpos.toString(36) +"_"+address.replace(/.+@/,"");
}

module.exports={getWorkingLinks,makeWLinkId};