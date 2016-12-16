const decorate=function(fromkpos,tokpos){
	for (let field in this.props.fields) {
		if (!this.props.fields[field]) continue;
		const pos=this.props.fields[field].pos, value=this.props.fields[field].value;
		const decorator=this.props.decorators[field];
		if (!decorator) continue;
		let i=0;
		while (i<pos.length) {
			const range=this.cor.parseRange(pos[i]);
			if (range.start<fromkpos || range.end>tokpos) {
				i++;
				continue;
			}

			if (this.markinview[field+range.kRange]==true) {
				i++
				continue; 
			}
			const p=pos[i],v=value[i];
			var target=value[i];
			i++;

			while (pos[i]==p) {
				i++;
				target+=";"+value[i];
			}
			const r=this.toLogicalRange(p);
			
			decorator({cm:this.cm,cor:this.cor,start:r.start,end:r.end,corpus:this.props.corpus,
				tabid:this.props.id,id:i,target,actions:this.actions});

			this.markinview[field+range.kRange]=true;
		}
	}
}
module.exports=decorate;