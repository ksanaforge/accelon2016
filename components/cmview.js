const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const CodeMirror=require("ksana-codemirror").Component;

const CMView=React.createClass({
	propTypes:{
		text:PT.string.isRequired
	}
	,componentDidMount(){
		this.loadText(this.props.text);
	}
	,shouldComponentUpdate(nextProps){
		return nextProps.text!==this.props.text;
	}
	,componentWillReceiveProps(nextProps){
		if (nextProps.text!==this.text) this.loadText(nextProps.text);
	}
	,loadText(newtext){
		this.text=newtext;
		this.cm.setValue(newtext);
	}
	,jumpToRange(from,to){
		const cm=this.cm;
		const cursor=cm.getCursor();
		if ((from.ch!==to.ch||from.line!==to.line)) {
			const s=cm.indexFromPos(from);const e=cm.indexFromPos(to);
			this.marktext&&this.marktext.clear&&this.marktext.clear();
			if (Math.abs(s-e)>1){
				this.marktext=cm.markText(from,to,{className:"gotomarker",clearOnEnter:true});					
			}
		}
		const vp=cm.getViewport();
		const vpm=cm.getOption("viewportMargin");
		const vpto=vp.to-vpm,vpfrom=vp.from-vpm;
		var line=from.line;

		cm.scrollIntoView({line:0,ch:0});
		line+=5;
		if(line>=cm.lineCount()-1)line=cm.lineCount()-1;
		cm.scrollIntoView({line,ch:0});

		cm.focus();
		cm.setCursor(from);
	}
	,scrollToText(t){
		var text=this.cm.getValue();
		var at=text.indexOf(t);
		if (at>-1) {
			var pos=this.cm.doc.posFromIndex(at);
			//scroll to last line , so that the paragraph will be at top
			cm.scrollIntoView({line:cm.doc.lineCount()-1,ch:0})
			if (pos.line) pos.line--;
			cm.scrollIntoView(pos);
		}
	}
	,getAllMarks(){
		return this.cm.getAllMarks();
	}
	,markText(){
		return this.cm.doc.markText.apply(cm.doc,arguments);
	}
	,getLine(i){
		return this.cm.getLine(i);
	}
	,onCopy(cm,evt){
		this.props.onCopy&&this.props.onCopy(cm,evt);
	}
	,getCodeMirror(){
		return this.cm;
	}
	,setCM(cm){
		if (cm) this.cm=cm.getCodeMirror();
	}
	,render(){
		return E("div",{},
	  	E(CodeMirror,{ref:this.setCM,value:"",theme:this.props.theme||"ambiance",readOnly:true,
  	  onCursorActivity:this.props.onCursorActivity
  	  ,onCopy:this.onCopy
  	  ,extraKeys:this.props.extraKeys
  	  ,onViewportChange:this.props.onViewportChange})
  	 )
	}
})
module.exports=CMView;