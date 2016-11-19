const React =require('react');
const E=React.createElement;
const MainTabs=require("../components/maintabs");
const ControlTabs=require("../components/controltabs");
const CorpusViewOptions=require("../containers/corpusviewoptions");

const Desktop=React.createClass({
	//console.log("desktop props",props,this.props)
	componentDidMount(){
		this.props.openCorpus("yinshun");
		this.props.openCorpus("taisho");
	}
	,render(){
		const props=Object.assign({},this.props,{viewOptions:CorpusViewOptions});
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