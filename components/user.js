const React=require("react");
const E=React.createElement;
const styles={
	user:{color:"silver"}
}
const User=React.createClass({
	getInitialState(){
		return {user:localStorage.getItem("user")||"yapcheahshen"};
	}
	,onChange(e){
		this.setState({user:e.target.value});
		clearTimeout(this.timer);
		this.timer=setTimeout(()=>{
			console.log(this.state.user);
			localStorage.setItem("user",this.state.user||"unknown");
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