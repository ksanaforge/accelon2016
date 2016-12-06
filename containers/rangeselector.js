const React =require('react');
const E=React.createElement;
const {openCorpus}=require("ksana-corpus");
const filterItem=require("../components/filteritem");
const styles={
	container:{overflowY:"auto",height:"49vh"}
}
const RangeSelector=React.createClass({
	getInitialState(){
		return {groupNames:[]};
	}
	,componentWillReceiveProps(nextProps,nextState){
		if (nextProps.activeCorpus && nextProps.activeCorpus!==this.props.activeCorpus) {
			const cor=openCorpus(nextProps.activeCorpus);
			this.setState({groupNames:cor.groupNames()});
		}
	}
	,shouldComponentUpdate(nextProps){
		//return (nextProps.activeCorpus &&nextProps.activeCorpus!==this.props.activeCorpus);
		return true;
	}
	,rendergroup(g,key){
		const hit=this.props.filter.hits[key] || 0;
		var br=false;
		if (g.substr(0,2)=="\\n") {
			g=g.substr(2);
			br=true;
		}
		return E(filterItem,{label:g,hit,key,br});
	}
	,render(){ 
		return E("div",{style:styles.container},this.state.groupNames.map(this.rendergroup));	
	}
	
});

module.exports=RangeSelector;