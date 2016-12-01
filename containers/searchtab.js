const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const SearchBox=require("../components/searchbox");
const CorpusSelector=require("../components/corpusselector");
const ResultNav=require("../components/resultnav");
const RangeSelector=require("../components/rangeselector");
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
	,render(){
		const querys=this.props.querys.map((query)=>query.q).join("\n");
		return E("div",{},
			E(CorpusSelector,{selected:0,
				selectCorpus:this.selectCorpus,corpora:this.props.stockcorpora}),
			E(SearchBox,{querys,onLineChanged:this.onLineChanged}),
			E(ResultNav),
			E(RangeSelector)
		)
	}
})
module.exports=SearchTab;