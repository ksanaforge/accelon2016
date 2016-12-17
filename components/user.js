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
		this.setState({user:e.target.value});
		clearTimeout(this.timer);
		this.timer=setTimeout(()=>{
			this.props.onSetUser(user);
			const user=this.state.user||"anonymous";
			localStorage.setItem("user",user);
		},500);
	}
	,render(){
		return E("div",{},
			E("span",{style:styles.user},"User"),
			E("br"),
			E("input",{value:this.state.user,onChange:this.onChange})
			)
	}
})
module.exports=User;