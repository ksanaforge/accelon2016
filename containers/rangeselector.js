const React =require('react');
const E=React.createElement;
const {openCorpus}=require("ksana-corpus");
const filterItem=require("../components/filteritem");
const styles={
	container:{overflowY:"auto",height:"49vh"},
	btn:{marginLeft:"10px"}
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
	,setExclude(group,value){
		this.props.setExclude(group,value);
	}
	,rendergroup(g,key){
		const hit=this.props.filter.hits[key] || 0;
		const exclude=this.props.filter.exclude[key] || false;
		var br=false;
		if (g.substr(0,2)=="\\n") {
			g=g.substr(2);
			br=true;
		}
		return E(filterItem,{label:g,hit,exclude,key,br,idx:key,setExclude:this.setExclude});
	}
	,selectall(){
		this.props.includeAll();
	}
	,deselectall(){
		this.props.excludeAll();
	}
	,render(){ 
		return E("div",{style:styles.container},
			E("button",{style:styles.btn,onClick:this.selectall},"Select All"),
			E("button",{style:styles.btn,onClick:this.deselectall},"Deselect All"),
			this.state.groupNames.map(this.rendergroup));	
	}
	
});

module.exports=RangeSelector;