const React=require("react");
const E=React.createElement;
const styles={
	activeWLink:{color:"lightblue",fontSize:"80%"},
	user:{color:"silver"}
}
const WLinkEditor=React.createClass({
	getInitialState(){
		return {confirmed:false};
	}
	,componentWillReceiveProps(nextProps){
		if (nextProps.activeWLink!==this.props.activeWLink) {
			this.setState({confirmed:false});
		}
		if (!nextProps.rightuserlink || !nextProps.rightuserlink[nextProps.activeWLink]||
			!nextProps.leftuserlink ||!nextProps.leftuserlink[nextProps.activeWLink]){
			this.setState({confirmed:false});	
		}
	}
	,renderLinkInfo(){
		const link1=this.props.leftuserlink[this.props.activeWLink];
		if (this.props.user!==link1.user) {
			return E("div",{style:styles.user},link1.user);
		}
	}
	,onClick(){
		if (!this.state.confirmed) {
			const link1=this.props.leftuserlink[this.props.activeWLink];
			const link2=this.props.rightuserlink[this.props.activeWLink];
			if (!link1||!link2)return;
			this.props.openLink(link1.corpus+"@"+link1.to);
			this.props.openLink(link2.corpus+"@"+link2.to);

			if (link1.user==this.props.user) {
				this.setState({confirmed:true})
			}
			return;
		}
		//can only delete when both side article is match
		this.props.onDeleteLink();
	}
	,render(){
		return E("div",{},
		 E("div",{style:styles.activeWLink},this.props.activeWLink),
		 E("button",{onClick:this.onClick},this.state.confirmed?"Delete":"Show Link"),
		 this.renderLinkInfo()
		);
	}
});
module.exports=WLinkEditor;