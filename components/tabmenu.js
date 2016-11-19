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
		return {menuopen:false,caption:"⏵"}
	}
	,propTypes:{
		panel:PT.func.isRequired
	}
	,onMouseLeave(e){
		this.clearTimeout();		
		this.timer2=setTimeout(()=>this.setState({menuopen:false,caption:"⏵"}),1000);
	}
	,componentWillUnmount(){
		this.clearTimeout();
	}
	,clearTimeout(){
		clearTimeout(this.timer1);
		clearTimeout(this.timer2);
	}
	,onMouseEnter(e){
		this.clearTimeout();
		this.timer1=setTimeout(()=>this.setState({menuopen:true,caption:"⏷"}),100);
	}
	,render(){
		return E("div",{onMouseEnter:this.onMouseEnter,onMouseLeave:this.onMouseLeave},
			E("span",{style:styles.menubutton},this.state.caption),
			this.state.menuopen&&E("div",{style:styles.panel},E(this.props.panel))
		)		
	}
});

module.exports=TabMenu;