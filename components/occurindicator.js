const React =require('react');
const E=React.createElement;

const OccurIndidator=(props)=>{
	return E("span",{style:{color:"silver"}}," "+props.now+"/"+props.total+" ");
}
module.exports=OccurIndidator;