const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const PT=React.PropTypes;
const tabsBarJustifiedClass = 'mui-tabs__bar--justified',
      isActiveClass = 'mui--is-active';
const TabMenu=require("./tabmenu");

const styles={
	closebutton:{float:"right",color:"white",width:"1.1em",
	fontSize:"125%",background:"#ff3f3f",borderRadius:"50%"}
}
const closeButton=(props)=>{
	const onClick=(e)=>{
		const i=parseInt(e.target.dataset.idx,10);
		props.onClose(i);
	}
	return E("span",{style:styles.closebutton,onClick,"data-idx":props.i},"×");
}
const Tabs=React.createClass({
	getInitialState(){
		return {selected:0}
	}
	,propTypes:{
		panes:PT.array.isRequired,
		tabs:PT.array.isRequired
	}
	,childContextTypes:{
		getActiveTab:PT.func
	}
	,componentWillReceiveProps(nextProps){
		if (typeof nextProps.selected!=="undefined" && nextProps.selected!==this.state.selected) {
			this.setState({selected:nextProps.selected});
		}
	}
	,getActiveTab(name){
		return this.props.tabs[this.state.selected][0];
	}
	,getChildContext(){
		return {getActiveTab:this.getActiveTab};
	}
	,onTabClick(e){
		const selected=parseInt(e.target.dataset.i,10);	
		if (!this.props.onSelectTab) this.setState({selected});

		if (this.props.onSelectTab&&!this.props.onSelectTab(selected,this.state.selected)){
			this.setState({selected});
		}
	}
	,render(){
		var tabEls = [], paneEls=[], _=this.context._;
		for (var i=0;i<this.props.tabs.length;i++) {
			const name=this.props.tabs[i][0];
			const label=this.props.tabs[i][1];
			const isActive = (i === this.state.selected) ? true : false;
			const closable=this.props.closable ;
			tabEls.push(E("li",{key:i,className:(isActive) ? isActiveClass : ''},
				isActive&&this.props.panel&&E(TabMenu,{panel:this.props.panel,i}),
				E("a",{onClick:this.onTabClick,"data-i":i},label,
				isActive&&closable&&E(closeButton,{i,onClose:this.props.onClose})))
			);

			var className = 'mui-tabs__pane ';
      if (isActive) className += isActiveClass;
			const ref=(isActive?"activePane":"");
			paneEls.push(E("div",{ref,key:i,className},this.props.panes[i]));
		}
		return E("div",{},
				E("ul",{className:'mui-tabs__bar mui-tabs__bar--justified'},tabEls)
			,paneEls);
	}
});
module.exports=Tabs;