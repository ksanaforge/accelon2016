const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;

const CorpusSelector=React.createClass({
	getInitialState(){
		return {open:false};
	}
	,propTypes:{
		corpora:PT.array.isRequired,
		selected:PT.number.isRequired
	}
	,selectedCorpus(){
		return this.props.corpora[this.props.selected].label;
	}
	,selectItem(e){
		var target=e.target;
		if (!target.dataset.idx) target=target.parentElement;
		this.props.selectCorpus(target.dataset.idx);
		this.close();
	}
	,renderItem(item,idx){
		var style={};
		if (this.props.selected==idx) {
			style.background="highlight"
			style.pointerEvents="none"
			style.cursor="default"
		}
		return E("li",{key:idx,"data-idx":idx,style},
			E("a",{href:"#",onClick:this.selectItem},item.label));
	}
	,toggleOpen(e){
		this.setState({open:!this.state.open});
	}
	,close(){
		this.setState({open:false});
	}
	,render(){
		const ulclass="mui-dropdown__menu mui-dropdown__menu--right" 
					+ (this.state.open?" mui--is-open":"");
		return E("div",{className:"mui-dropdown"},
		E("button",{className:"mui-btn mui-btn--primary",onClick:this.toggleOpen},
			this.selectedCorpus(), this.state.open?E("span",{className:"mui-caret"}):null),
		E("ul",{className:ulclass,style:{zIndex:200}},
			this.props.corpora.map(this.renderItem)
			)
		)
	}
});

module.exports=CorpusSelector;