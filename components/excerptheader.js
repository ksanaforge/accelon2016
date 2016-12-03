const React=require("react");
const E=React.createElement;
const styles={
	container:{background:"#3f537f"},
	jump:{color:"yellow",cursor:"pointer"}
}
const ExcerptHeader=(props)=>{
	const onClick=(e)=>console.log("o")
	return E("div",{style:styles.container},
		"----Group"+props.title+"-----",E("span",{style:styles.jump,onClick},"open"));
}
module.exports=ExcerptHeader;