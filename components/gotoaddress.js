const React=require("react");
const E=React.createElement;
const GotoAddress=React.createClass({
	getInitialState(){
		return {value:''}
	}
	,componentWillReceiveProps(nextProps){
		if (nextProps.value!==this.state.value) this.setState({value:nextProps.value});
	}
	,onKeyPress(e){
		if (e.key=="Enter") {
			this.props.onEnter(this.state.value,this.props.corpus);
		}
	}
	,onChange(e){
		this.setState({value:e.target.value});
	}
	,getRef(input){
		this.input=input;
	}
	,render(){
		return E("div",{},
			E("span",{style:styles.corpus},this.props.corpus),
			E("br"),
			E("input",{spellCheck:false,onChange:this.onChange,onKeyPress:this.onKeyPress,
				value:this.state.value,ref:this.getRef})
		);		
	}
});
const styles={
	corpus:{color:"white"}
}

module.exports=GotoAddress;