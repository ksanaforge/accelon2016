const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const styles={
	menubutton:{float:"left",color:"silver",
	userSelect:"none",cursor:"pointer"}
	,panel:{position:"absolute",width:150,height:100,borderRadius:"5px",
	top:"1.5em", //height of mui tab bar
	background:"silver",zIndex:255}
}

const TabMenu=React.createClass({
	getInitialState(){
		return {menuopen:false}
	}
	,propTypes:{
		panel:PT.func.isRequired,
	}
	,toggleMenu(){
		this.setState({menuopen:!this.state.menuopen})
	}
	,render(){
		const caption=this.state.menuopen?"⏷":"⏵";
		return E("div",{onClick:this.toggleMenu},
			E("span",{style:styles.menubutton},caption),
			this.state.menuopen&&E("div",{style:styles.panel},E(this.props.panel))
		)		
	}
});

module.exports=TabMenu;