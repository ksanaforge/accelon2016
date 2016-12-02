const React =require('react');
const E=React.createElement;

const OccurIndidator=(props)=>{
	var now=props.now+1;
	if (now>props.count) now=props.count;

	return E("span",{style:{color:"silver"}}," "+now+"/"+props.count+" ");
}
module.exports=OccurIndidator;