const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const PT=React.PropTypes;
const tabsBarJustifiedClass = 'mui-tabs__bar--justified',
      isActiveClass = 'mui--is-active';
const TabMenu=require("./tabmenu");

const styles={
	closebutton:{float:"right",color:"white",width:"1.1em",marginTop:"3px",
	fontSize:"125%",background:"#ff7f7f",borderRadius:"50%"} //in case css is not set
}


const Tabs=React.createClass({
	getInitialState(){
		return {selected:0}
	}
	,propTypes:{
		panes:PT.array.isRequired,
		tabs:PT.array.isRequired,
		rightButtons:PT.array,
		onLabelEnter:PT.func,
		onLabelLeave:PT.func,
	}
	,childContextTypes:{
		getActiveTab:PT.func
	}
	,componentWillReceiveProps(nextProps){
		if (typeof nextProps.selected!=="undefined" && nextProps.selected!==this.state.selected) {
			this.setState({selected:nextProps.selected});
		}
	}
	,getDefaultProps(){
		return {rightButtons:[]}
	}
	,getActiveTab(name){
		return this.props.tabs[this.state.selected][0];
	}
	,getChildContext(){
		return {getActiveTab:this.getActiveTab};
	}
	,onTabClick(e){
		var domnode=e.target;
		if (!domnode.dataset.i) domnode=domnode.parentElement;
		const selected=parseInt(domnode.dataset.i,10);	
		if (!this.props.onSelectTab) this.setState({selected});

		if (this.props.onSelectTab){
			if (!this.props.onSelectTab(selected,this.state.selected)) this.setState({selected});
		} else {
			this.setState({selected});
		}
	}
	,onLabelEnter(e){
		if (!this.props.onLabelEnter) return;
		const i=parseInt(e.target.parentElement.dataset.i);
		this.props.onLabelEnter(i,e.target.offsetLeft,e.target.offsetHeight);
	}
	,render(){
		var tabEls = [], paneEls=[], _=this.context._;
		for (var i=0;i<this.props.tabs.length;i++) {
			const name=this.props.tabs[i][0];
			const label=this.props.tabs[i][1];
			const isActive = (i === this.state.selected) ? true : false;
			const rightButton=this.props.rightButtons[i] ;
			tabEls.push(E("li",{key:i,className:(isActive) ? isActiveClass : ''},
				isActive&&this.props.panel&&E(TabMenu,{panel:this.props.panel,i}),
				E("a",{onClick:this.onTabClick,"data-i":i},
					E("span",{onMouseEnter:this.onLabelEnter,onMouseLeave:this.props.onLabelLeave},label),
					isActive&&rightButton?E(rightButton,{i,onClick:this.props.onRightButtonClick}):null))
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