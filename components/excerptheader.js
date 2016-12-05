const React=require("react");
const E=React.createElement;
const styles={
	container:{background:"#3f537f"},
	jump:{color:"brown",cursor:"pointer"}
}
const ExcerptHeader=(props)=>{
	const onClick=(e)=>{
		//props.goOccur(props.now);
	}
	return E("div",{style:styles.container},
		"----摘要"+props.title+"----");
}
module.exports=ExcerptHeader;