const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const CMView=require("./cmview");
const {openCorpus}=require("ksana-corpus");
const selectionActivity=require("./selectionactivity");
const CorpusView=React.createClass({
	propTypes:{
		corpus:PT.string.isRequired,
		address:PT.string.isRequired,
		rawlines:PT.array.isRequired,
		article:PT.object.isRequired,
		layout:PT.bool, //layout with p?
		active:PT.bool, //in active tab
		onCursorActivity:PT.func,
		onViewport:PT.func,
		onCopyText:PT.func, //custom copy handler
		setSelection:PT.func, //used by selectionactivity
		updateArticleByAddress:PT.func
	}
	,getInitialState(){
		return {text:"",linebreaks:[],pagebreaks:[]};
	}
	,componentDidMount(){
		if (!this.props.corpus) {
			if(this.props.text) this.setState({text:this.props.text.join("\n")});
			return;
		}
		this.loadtext();
		//prepare actions for decorators
		for (let i in this.props) {
			if (typeof this.props[i]==="function") this.actions[i]=this.props[i];
		}
	}
	,loadtext(props){
		props=props||this.props;
		const {corpus,article,fields,rawlines,address,layout}=props;
		this.cor=openCorpus(corpus);
		this.markinview={};
		this.layout(article,rawlines,address,layout);
	}
	,markinview:{}//fast check if mark already render, assuming no duplicate mark in same range
	,actions:{} 
	,decorate(fromkpos,tokpos){
		var decorated=0;
		for (let field in this.props.fields) {
			if (!this.props.fields[field]) continue;
			const pos=this.props.fields[field].pos, value=this.props.fields[field].value;
			const decorator=this.props.decorators[field];
			if (!decorator) continue;

			for (let i=0;i<pos.length;i++) {
				const range=this.cor.parseRange(pos[i]);
				if (range.start<fromkpos || range.end>tokpos) continue;
				if (this.markinview[range.kRange+field]) continue; 

				const r=this.toLogicalRange(pos[i]);
				decorator({cm:this.cm,cor:this.cor,start:r.start,end:r.end,corpus:this.props.corpus,
					tabid:this.props.id,id:i+1,target:value[i],actions:this.actions});
				this.markinview[range.kRange+field]=true;
			}
		}
	}
	,textReady(){
		this.scrollToAddress(this.props.address);
	}
	,componentWillUnmount(){
		this.cm.getAllMarks().forEach((m)=>m.clear()); //might not need this
		this.cm.setValue("");
	}
	,shouldComponentUpdate(nextProps,nextState){
		return (nextProps.corpus!==this.props.corpus
			||nextProps.address!==this.props.address
			||nextProps.layout!==this.props.layout
			||nextState.text!==this.state.text);
	}
	,componentWillReceiveProps(nextProps){//cor changed
		const {corpus,address,layout,article}=this.props;
		if (nextProps.corpus!==corpus||nextProps.address!==address||nextProps.layout!==layout){
			if (nextProps.article.at===article.at&&nextProps.layout===layout&&nextProps.corpus===corpus) {
				this.scrollToAddress(nextProps.address);
			} else {
				this.loadtext(nextProps);
			}
		}
		if (this.cm && nextProps.active)this.cm.focus();
	}	
	,clearSelection(){
		const cursor=this.cm.getCursor();
		this.cm.doc.setSelection(cursor,cursor);
	}
	,toLogicalPos(address){
		return this.cor.toLogicalPos(this.state.linebreaks,address,this.getRawLine);		
	}
	,toLogicalRange(range){
		return this.cor.toLogicalRange(this.state.linebreaks,range,this.getRawLine);
	}
	,fromLogicalPos(linech){
		if (!this.cor)return;
		const firstline=this.cor.bookLineOf(this.props.article.start); //first of of the article
		const text=this.cm.doc.getLine(linech.line);
		const lb=this.state.linebreaks[linech.line];
		if (typeof text==="undefined") return this.props.article.end;
		return this.cor.fromLogicalPos(text,linech.ch,lb,firstline,this.getRawLine);
	}
	,getRawLine(line){
		return this.props.rawlines[line];
	}
	,scrollToAddress(address){
		const r=this.cor.toLogicalRange(this.state.linebreaks,address,this.getRawLine);
		if (!r || r.start.line<0)return;
		if (this.viewer) this.viewer.jumpToRange(r.start,r.end);		
	}
	,layout(article,rawlines,address,playout){
		const cor=this.cor;
		const layouttag="p";

		if (!address){ //scroll to the selection after layout
			address=this.kRangeFromCursor(this.cm);
		}
		var book=cor.bookOf(article.start);

		const changetext=function({lines,pagebreaks,linebreaks}){
			const text=lines.join("\n");
			this.setState({linebreaks,pagebreaks,article,text}, this.textReady );
		}

		if (!playout) {
			changetext.call(this, cor.layoutText(rawlines,article.start) );
		} else {
			cor.getBookField(layouttag,book,(book_p)=>{
				if (!book_p) {
					console.error(layouttag,book);
					return;
				}
				const p=cor.trimField(book_p,article.start,article.end);
				changetext.call(this, cor.layoutText(rawlines,article.start,p.pos) );
			});
		}
	}
	,kRangeFromSel(cm,from,to){
		if (!this.cor)return;
		if (!from||!to)return 0;
		const f=this.cor.fromLogicalPos.bind(this.cor);
		const firstline=this.cor.bookLineOf(this.props.article.start); //first of of the article
		const s=f(cm.doc.getLine(from.line),from.ch,this.state.linebreaks[from.line],firstline,this.getRawLine);
		const e=f(cm.doc.getLine(to.line),to.ch,this.state.linebreaks[to.line],firstline,this.getRawLine);
		return this.cor.makeKRange(s,e);
	}
	,kRangeFromCursor(cm){
		if (!cm)return;
		const sels=cm.listSelections();
		if (!sels.length) return null;

		var from=sels[0].anchor,to=sels[0].head,temp;
		if (from.line>to.line||(from.line==to.line && from.ch>to.ch)) {
			temp=from;from=to;to=temp;
		}
		return this.kRangeFromSel(cm,from,to);
	}
	,onCopy(cm,evt){
		/*1p178a0103-15 copy and paste incorrect*/
		/* TODO,  address error crossing a page, has line 30 */
		const krange=this.kRangeFromCursor(cm);
		if (this.props.onCopyText) { //for excerpt copy
			evt.target.value=this.props.onCopyText({cm,value:evt.target.value,krange,cor:this.cor});
			evt.target.select();
		} else { //default copy address
			evt.target.value="@"+this.cor.stringify(krange)+';';
			evt.target.select();//reselect the hidden textarea
		}
	}
	,onCursorActivity(cm){
		if (!this.cor) return;
		clearTimeout(this.cursortimer);
		this.cursortimer=setTimeout(()=>{
			selectionActivity.call(this,cm);
			this.props.onCursorActivity&&this.props.onCursorActivity(cm);
		},300);
	}
	,onViewportChange(cm,from,to){
		clearTimeout(this.viewporttimer);
		this.viewporttimer=setTimeout(()=>{
			const vp=cm.getViewport();
			const from=this.fromLogicalPos({line:vp.from,ch:0});
			const to=this.fromLogicalPos({line:vp.to,ch:0});
			this.decorate(from,to);
			this.onViewport&&this.onViewport(cm,vp.from,vp.to,from,to); //extra params start and end kpos
		},50);
	}
	,setCM(cmviewer){
		if (cmviewer) {
			this.viewer=cmviewer;
			this.cm=cmviewer.getCodeMirror();
		}
	}
	,render(){
		if (!this.state.text) return E("div",{},"loading");
		const props=Object.assign({},this.props,
			{ref:this.setCM,
			text:this.state.text,
			onCursorActivity:this.onCursorActivity,
			onCopy:this.onCopy,
			onViewportChange:this.onViewportChange,
			articlename:this.props.article.articlename
			}
		);
		return E(CMView,props);
	}
})
module.exports=CorpusView;