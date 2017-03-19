const getQuoteText=(cm)=>{
	const str=cm.getSelection();
	if (str) return str;

	const text=cm.getValue();
	const cursor=cm.indexFromPos(cm.getCursor());
	var start=cursor,end=cursor;
	while (start>0) {
		if (text.charAt(start)==="「") break;
		if (text.charAt(start)==="」") break;
		start--;
	}
	while (end<text.length) {
		if (text.charAt(end)==="「") break;
		if (text.charAt(end)==="」") break;
		end++;
	}
	var quote=text.substring(start,end+1);
	if (quote.charAt(0)==="「" && quote.charAt(quote.length-1)==="」") {
		var q=quote.substr(1,quote.length-2);
		while (q.charAt(0)=="\n") {
			start++;
			q=q.substr(1);
		}
		while (q.charAt(q.length-1)=="\n") {
			end++;
			q=q.substr(0,q.length-1);
		}

		const s=cm.posFromIndex(start+1);
		const e=cm.posFromIndex(end);
		cm.setSelection(s,e);

		return q.replace(/\n/g,"");
	}
	return null;
}
const articleSubstr=function(cor,article,startfrom){
	const l1=cor.bookLineOf(article.article.start);
	const l2=cor.bookLineOf(startfrom);
	const chars=cor.charOf(startfrom);
	if (l1>l2) return "";
	const lines=article.rawlines.slice(l2-l1,l2-l1+cor.addressPattern.maxline*2);
	return {from:startfrom-chars,lines,startline:l2-l1};
}
const fromLogicalPos=function(cor,firstline,linech,text,getrawlines,linebreaks,article){//similar function in corpusview
	const lb=linebreaks[linech.line];
	if (typeof text==="undefined") return null;
	return cor.fromLogicalPos(text,linech,lb,firstline,getrawlines);
}
const posFromIndex=function(index,lines){ //same as codemirror
	var ch=index;
	var line=0;
	for (var i=0;i<lines.length;i++) {
		const l=lines[i];
		if (ch<l.length) {
			return {line,ch}
		}
		ch-=(l.length+1);
		line++;
	}
	return {line,ch};
}
module.exports={getQuoteText,posFromIndex,articleSubstr,fromLogicalPos};
