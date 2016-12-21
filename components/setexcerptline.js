const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const styles={
	button:{cursor:"pointer",margin:5},
	selected:{borderRadius:"50%",background:"yellow",border:"solid 1px black",color:"black",
margin:5,paddingLeft:5,paddingRight:5}
}
const SetExcerptLine=(props)=>{
	const onClick=(e)=>{
		props.onSetExcerptLine(parseInt(e.target.innerHTML),10);
	}
	const renderButton=(line,key)=>{
		return E("span",{onClick,key,style:props.excerptline==line?styles.selected:styles.button},line);
	}
	return E("span",{},
		[1,3,5].map(renderButton)
	);
}
module.exports=SetExcerptLine;