const React =require('react');
const E=React.createElement;
const {openCorpus}=require("ksana-corpus");
const filterItem=require("../components/filteritem");
const {_}=require("ksana-localization")
const styles={
	container:{overflowY:"auto",height:"49vh"},
	btn:{marginLeft:"10px"}
}
const RangeSelector=React.createClass({
	getInitialState(){
		return {groupNames:[],groupKPoss:[]};
	}
	,componentWillReceiveProps(nextProps,nextState){
		if (nextProps.activeCorpus && nextProps.activeCorpus!==this.props.activeCorpus) {
			const cor=openCorpus(nextProps.activeCorpus);
			this.setState({groupNames:cor.groupNames(),groupKPoss:cor.groupKPoss()});
		}
	}
	,setExclude(group,value){
		this.props.setExclude(group,value);
	}
	,goGroup(group){
		const kpos=this.state.groupKPoss[group];
		this.props.updateArticleByAddress(kpos);
	}
	,firstOccurOfGroup(group){
		var first=0;
		for(let i=0;i<group;i++) {
			if (!this.props.filter.exclude[i]){
				first+=this.props.filter.hits[i];				
			}
		}
		return first;
	}
	,goHit(group){
		const occur=this.firstOccurOfGroup(group);
		this.props.goOccur(occur);
	
}	,rendergroup(g,key){
		const hit=this.props.filter.hits[key] || 0;
		const exclude=this.props.filter.exclude[key] || false;
		var br=false;
		if (g.substr(0,2)=="\\n") {
			g=g.substr(2);
			br=true;
		}
		return E(filterItem,{label:g,hit,exclude,key,br,idx:key,
			setExclude:this.setExclude,goGroup:this.goGroup,goHit:this.goHit});
	}
	,selectall(){
		this.props.includeAll();
	}
	,deselectall(){
		this.props.excludeAll();
	}
	,render(){ 
		return E("div",{style:styles.container},
			E("button",{style:styles.btn,onClick:this.selectall},_("Select All")),
			E("button",{style:styles.btn,onClick:this.deselectall},_("Deselect All")),
			this.state.groupNames.map(this.rendergroup));	
	}
	
});

module.exports=RangeSelector;