const React =require('react');
const E=React.createElement;
const MainTabs=require("./maintabs");
const ControlTabs=require("../components/controltabs");
const CorpusViewOptions=require("./corpusviewoptions");
const TocNav=require("./tocnav");

const Desktop=React.createClass({
	componentDidMount(){
		this.props.stockcorpora.forEach((corpus)=>{
			this.props.openCorpus(corpus.name);	
		});
	}
	,render(){
		const props=Object.assign({},this.props,{viewOptions:CorpusViewOptions,nav:TocNav});
		return E("div",{style:styles.container},
			E("div",{style:styles.maintabs},E(MainTabs,props)),
			E("div",{style:styles.controltabs},E(ControlTabs,this.props))
		);
	}
});

const styles={
	container:{display:"flex",width:"100%"},
	maintabs:{flex:6},
	controltabs:{flex:3}
}

module.exports=Desktop;