const React =require('react');
const E=React.createElement;

const OccurIndidator=React.createClass({
	getInitialState(){
		return {editing:false}
	}
	,onKeyDown(e){
		if (e.key=="Enter") {
			this.setState({editing:false});
			this.props.onChange&&this.props.onChange(this.input.value);
		} else if (e.key=="Escape") {
			if (this.state.editing) this.setState({editing:false});
		}
	}
	,getInput(ref){
		this.input=ref;
	}
	,onClick(){
		if (!this.state.editing) this.setState({editing:true});
	}
	,componentDidUpdate(){
		if (this.input) this.input.focus();
	}
	,render(){
		var now=this.props.now+1;
		var count=this.props.count;
		if (count<0) count=0;
		if (now>count) now=count;

		return E("span",{onClick:this.onClick,style:{color:"silver"}},
		this.props.editable&&this.state.editing?E("input",{style:styles.input,
			ref:this.getInput,size:3,
			defaultValue:now,onKeyDown:this.onKeyDown}):now
		,"/"+count+" ");
	}
});
const styles={
	input:{color:"black"}
}
module.exports=OccurIndidator;