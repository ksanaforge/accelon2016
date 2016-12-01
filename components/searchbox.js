const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const CodeMirror=require("ksana-codemirror").Component;
const styles={
	container:{height:150}
}
const SearchBox=(props)=>{
	var prevline=-1,changetimer=null;
	const onCursorActivity=(cm)=>{
		const cursor=cm.getCursor();
		if (cursor.line!==prevline) props.onLineChanged(cm.getValue(),cursor.line);
		prevline=cursor.line;
	}
	const onChange=(cm)=>{
		clearTimeout(changetimer);
		changetimer=setTimeout(()=>{
			const cursor=cm.getCursor();
			props.onLineChanged(cm.getValue(),cursor.line);
		},300);
	}
	
	return E("div",{style:styles.container},
		E(CodeMirror,{theme:"ambiance",value:props.querys,style:styles.box
			,onCursorActivity,onChange
			,scrollbarStyle:"null"})
	);
}
module.exports=SearchBox;