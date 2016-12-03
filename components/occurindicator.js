const React =require('react');
const E=React.createElement;

const OccurIndidator=(props)=>{
	var now=props.now+1;
	var count=props.count;
	if (count<0) count=0;
	if (now>count) now=count;

	return E("span",{style:{color:"silver"}}," "+now+"/"+count+" ");
}
module.exports=OccurIndidator;