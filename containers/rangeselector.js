const React =require('react');
const E=React.createElement;
const {openCorpus}=require("ksana-corpus");
const filterItem=require("../components/filteritem");
const RangeSelector=React.createClass({
	getInitialState(){
		return {groupnames:[]};
	}
	,componentWillReceiveProps(nextProps,nextState){
		if (nextProps.activeCorpus && nextProps.activeCorpus!==this.props.activeCorpus) {
			const cor=openCorpus(nextProps.activeCorpus);
			this.setState({groupnames:cor.groupnames()});
		}
	}
	,shouldComponentUpdate(nextProps){
		//return (nextProps.activeCorpus &&nextProps.activeCorpus!==this.props.activeCorpus);
		return true;
	}
	,rendergroup(g,key){
		const hit=Math.random()*1000;
		var br=false;
		if (g.substr(0,2)=="\\n") {
			g=g.substr(2);
			br=true;
		}
		return E(filterItem,{label:g,hit,key,br});
	}
	,render(){ 
		return E("div",{},this.state.groupnames.map(this.rendergroup));	
	}
	
});

module.exports=RangeSelector;