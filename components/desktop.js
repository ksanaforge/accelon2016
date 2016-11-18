const React =require('react');
const E=React.createElement;
const MainTabs=require("./maintabs");
const ControlTabs=require("./controltabs");

const Desktop=React.createClass({
	//console.log("desktop props",props,this.props)
	componentDidMount(){
		this.props.openCorpus("yinshun");
		this.props.openCorpus("taisho");
	}
	,render(){
		return E("div",{style:styles.container},
			E("div",{style:styles.maintabs},E(MainTabs,this.props)),
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