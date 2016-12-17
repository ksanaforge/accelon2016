
const paintUserField=function(fields, oldfields) {
	this.painted=this.painted||{};
	const decorator=this.props.decorators.userfield;

	for (let id in oldfields) {
		if (!fields[id] && this.painted[id]) {
			this.painted[id].clear();
			delete this.painted[id];
		}
	}

	for (let id in fields) {
		const field=fields[id];
		var target=field.corpus+"@"+field.to;
		const r=this.cor.parseRange(field.from);
		const logical=this.toLogicalRange(r.kRange);
		if (this.painted[id]) continue;
		this.painted[id]=decorator({cm:this.cm,corpus:this.props.corpus,cor:this.cor,
			start:logical.start,end:logical.end,
			kpos:r.start,krange:r.kRange,
			tabid:this.props.id,id,target,actions:this.actions});
	}
}
module.exports=paintUserField;