const React=require("react");
const E=React.createElement;
const styles={
	container:{background:"#3f537f"},
	jump:{color:"yellow",cursor:"pointer"}
}
const ExcerptHeader=(props)=>{
	const onClick=(e)=>{
		props.goOccur(props.now);
	}
	return E("div",{style:styles.container},
		"----摘要"+props.title+"-----",E("span",{style:styles.jump,onClick},"open"));
}
module.exports=ExcerptHeader;