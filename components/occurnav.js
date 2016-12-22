const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const OccurIndicator=require("./occurindicator")
const styles={
	button:{cursor:"pointer",userSelect:"none"}
}
const OccurNav=React.createClass({
	getInitialState(){
		return {editing:false}
	}
	,onChange(v){
		this.setState({editing:false});
		this.props.onChange(v);
	}
	,onCancelEdit(){
		if (this.props.editable) this.setState({editing:false});		
	}
	,onEdit(){
		if (this.props.editable) this.setState({editing:true});
	}
	,render(){
		const disabled=this.props.count==0;
		return E("div",{},
			this.state.editing?null:E("span",{style:styles.button,disabled,onClick:this.props.onPrev},"◀"),
			E(OccurIndicator,{editing:this.state.editing,onEdit:this.onEdit,
				onCancelEdit:this.onCancelEdit,
				onChange:this.onChange,now:this.props.now,count:this.props.count}),
			this.state.editing?null:E("span",{style:styles.button,disabled,onClick:this.props.onNext},"▶")
			);
	}
})

module.exports=OccurNav;