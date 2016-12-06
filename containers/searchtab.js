const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const SearchBox=require("../components/searchbox");
const CorpusSelector=require("../components/corpusselector");
const OccurNav=require("../components/occurnav");
const RangeSelector=require("./rangeselector");
const SearchTab=React.createClass({
	propTypes:{
		querys:PT.array.isRequired,
	}
	,selectCorpus(idx){
		console.log("select",idx)
	}
	,onLineChanged(querys,idx){
		this.props.search(querys.split("\n"),idx);
	}
	,getCM(cm){
		this.cm=cm;
	}
	,onNext(){
		this.props.nextOccur();
		setTimeout(()=>this.cm.focus(),200); //resultview might get focus
	}
	,onPrev(){
		this.props.prevOccur();
		setTimeout(()=>this.cm.focus(),200);
	}
	,render(){
		const querys=this.props.querys.map((query)=>query.q).join("\n");
		const query=this.props.querys[this.props.activeQuery]||{};
		const navprops=Object.assign({},{
			now:query.now,
			count:(query.filtered||[]).length,
			onNext:this.onNext,onPrev:this.onPrev});
		return E("div",{},
			E(CorpusSelector,{selected:0,
				selectCorpus:this.selectCorpus,corpora:this.props.stockcorpora}),
			E(SearchBox,{querys,onLineChanged:this.onLineChanged,getCM:this.getCM}),
			E(OccurNav,navprops),
			E(RangeSelector,this.props)
		)
	}
})
module.exports=SearchTab;