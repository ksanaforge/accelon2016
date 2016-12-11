const React=require("react");
const E=React.createElement;
const styles={
	container:{borderTop:"1px solid #505050" ,background:"#202020"} //background:"#3f537f"
	,title:{color:"#9a9aff",background:"#404040",borderRadius:"5px"}
	,jump:{color:"brown",cursor:"pointer"}
}
const ExcerptHeader=(props)=>{
	return E("div",{style:styles.container},
		E("span",{style:styles.title},props.title)
		);
}
module.exports=ExcerptHeader;