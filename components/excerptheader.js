const React=require("react");
const E=React.createElement;
const styles={
	container:{borderTop:"1px solid #3f537f" ,background:"#202020"} //background:"#3f537f"
	,title:{background:"#3f537f",borderRadius:"5px"}
	,jump:{color:"brown",cursor:"pointer"}
}
const ExcerptHeader=(props)=>{
	const onClick=(e)=>{
		//props.goOccur(props.now);
	}
	return E("div",{style:styles.container},
		E("span",{style:styles.title},props.title)
		);
}
module.exports=ExcerptHeader;