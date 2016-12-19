const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const styles={
	user:{color:"silver"}
}
const User=React.createClass({
	getInitialState(){
		return {user:localStorage.getItem("user")||"yapcheahshen"};
	}
	,propType:{
		onSetUser:PT.func.isRequired
	}
	,componentDidMount(){
		this.props.onSetUser(this.state.user);
	}
	,onChange(e){
		const user=e.target.value||"anonymous"
		this.setState({user});
		clearTimeout(this.timer);
		this.timer=setTimeout(()=>{
			this.props.onSetUser(user);
			localStorage.setItem("user",user);
		},500);
	}
	,render(){
		return E("div",{},
			E("span",{style:styles.user},"User"),
			E("br"),
			E("input",{size:12,value:this.state.user,onChange:this.onChange})
			)
	}
})
module.exports=User;