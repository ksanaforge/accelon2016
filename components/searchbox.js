const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const CodeMirror=require("ksana-codemirror").Component;
const styles={
	container:{height:150}
}
const SearchBox=React.createClass({
	prevline:-1
	,changetimer:null
	,shouldComponentUpdate(nextProps) {
		return nextProps.querys!==this.cm.getValue();
	}
	,onCursorActivity(cm){
		const cursor=cm.getCursor();
		if (cursor.line!==this.prevline) this.props.onLineChanged(cm.getValue(),cursor.line);
		this.prevline=cursor.line;
	}
	,onChange(cm){
		clearTimeout(this.changetimer);
		this.changetimer=setTimeout(()=>{
			const cursor=cm.getCursor();
			this.props.onLineChanged(cm.getValue(),cursor.line);
		},300);
	}
	,getCM(cm){
		this.cm=cm.getCodeMirror();
		if (this.props.getCM) this.props.getCM(this.cm);
	}
	,render(){
		return E("div",{style:styles.container},
			E(CodeMirror,{ref:this.getCM,
				theme:"ambiance",value:this.props.querys,style:styles.box
				,onCursorActivity:this.onCursorActivity,onChange:this.onChange
				,scrollbarStyle:"null"})
		);

	}
});
module.exports=SearchBox;