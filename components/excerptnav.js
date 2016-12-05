const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const styles={
	container:{textAlign: "right",fontSize:14},
	pager:{textAlign:"center",marginLeft:3,cursor:"pointer",color:"#AfAfAf",
	background:"#2f2f2f",borderRadius:"50%",height:"1.5em",width:"1.5em",display:"inline-block"},

	selected:{textAlign:"center",marginLeft:3,color:"red",background:"silver",
	borderRadius:"50%",height:"1.5em",width:"1.5em",display:"inline-block"}
}
const maxbutton=10;
const ExcerptNav=React.createClass({
	propTypes:{
		count:PT.number.isRequired,
		hitperbatch:PT.number.isRequired,
		batch:PT.number.isRequired,
		gobatch:PT.func.isRequired
	}
	,calbatch(){
		if(!this.props.count) return null;
		var batchcount=Math.floor(this.props.count/this.props.hitperbatch);
		if (batchcount*this.props.hitperbatch>this.props.count) batchcount++;
		var remain=maxbutton;
		var start=this.props.batch ,end=this.props.batch;
		while ( remain ) {
			if (start) {remain--;start--}
			if (remain&&end<batchcount) {remain--;end++}
			if (end>=batchcount)break;
		}
		return {start,end};
	}
	,onClick(e) {
		const i=parseInt(e.target.dataset.idx);
		if (isNaN(i))return;
		this.props.gobatch(i);
	}
	,renderPager(){
		const B=this.calbatch();
		if (!B)return;
		var out=[],style={};
		for (let i=B.start;i<B.end;i++) {
			style=this.props.batch==i?styles.selected:styles.pager;
			out.push( E("span",{style,key:i,"data-idx":i,onClick:this.onClick}, (i+1) ));
		}
		return out;
	}
	,render(){
		return E("div",{style:styles.container},
			this.renderPager()
		);
	}
})
module.exports=ExcerptNav;