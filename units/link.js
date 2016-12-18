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
const hasLinkAt=function(kpos,fields) {

}
const hasUserLinkAt=function(kpos,userfields){
	const out=[];
	for (var id in userfields) {
		const field=userfields[id];
		if (kpos>=field.start && kpos<=field.end) out.push(id);
	}
	return out;
}
module.exports={getWorkingLinks,makeWLinkId,hasLinkAt,hasUserLinkAt};