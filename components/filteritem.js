const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const styles={
	label:{color:"lightblue"},
	hit:{color:"#ff7f7f",fontSize:"75%",fontWeight:700},
	container:{whiteSpace: "break-word", display:"inline-block"}
}
const humanhit=function(hit){
	if (!hit)return "";
	if (hit<1000) return Math.floor(hit)+"";
	else if (hit<1000000) {
		return (hit/1000).toFixed(2)+"k";
	}
	return "爆";
}
const filterItem=React.createClass({
	propTypes:{
		label:PT.string.isRequired,
		hit:PT.number.isRequired,
		exclude:PT.bool.isRequired,
		setExclude:PT.func.isRequired,
		idx:PT.number.isRequired
	},
	setExclude(e){
		this.props.setExclude(this.props.idx,!this.props.exclude);
	}
	,render(){
		return E("span",{},
			this.props.br?E("br"):E("span"),
		  E("span",{style:styles.container},"　",
				E("input",{type:"checkbox",checked:!this.props.exclude,onChange:this.setExclude}),
				E("span",{style:styles.label},this.props.label)," ",
				E("span",{style:styles.hit}, humanhit(this.props.hit))
			)
		)
	}
});

module.exports=filterItem;