const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const CMView=require("./cmview");
const {openCorpus}=require("ksana-corpus");
/*
const addressHashTag=require("../units/addresshashtag");
const decorations=require("../decorations/");
const decorateBond=require("../decorations/bond");
*/
const CorpusView=React.createClass({
	propTypes:{
		corpus:PT.string.isRequired,
		address:PT.string.isRequired,
		text:PT.array.isRequired,
		layout:PT.bool,
		focus:PT.bool, //currectly visible
		decorations:PT.array,
		onViewReady:PT.func,
		onViewLeaving:PT.func,
		onCursorActivity:PT.func,
		onViewport:PT.func
	}
	,getInitialState(){
		return {text:"",linebreaks:[],pagebreaks:[]};
	}
	,componentDidMount(){
		/*
		this.context.listen("highlightAddress",this.highlightAddress,this);
		this.context.listen("charWidget",this.charWidget,this);
		this.context.listen("lineWidget",this.lineWidget,this);
		this.context.listen("addBond",decorateBond.addBond,this);
		this.context.listen("removeBond",decorateBond.removeBond,this);
		this.context.listen("setActiveBond",decorateBond.setActiveBond,this);
		this.context.listen("clearSelection",this.clearSelection,this);
		*/
		//if (!this.cor) return;
		//var address=addressHashTag.getAddress(this.cor.meta.name);
		//if (!address)  address=this.props.address;
		//address&this.goto({address,cor:this.cor,corpus:this.cor.meta.name});
		this.loadtext();
	}
	,loadtext(props){
		props=props||this.props;
		const {corpus,article,fields,text,address,layout}=props;
		this.cor=openCorpus(corpus);
		this.layout(article,text,address,layout);
	}
	,decorate(){
		for (let field in this.props.fields) {
			const pos=this.props.fields[field].pos, value=this.props.fields[field].value;
			const decorator=this.props.decorators[field];
			if (!decorator) continue;

			for (let i=0;i<pos.length;i++) {
					const r=this.toLogicalRange(pos[i]);
					decorator(this.cm,this.cor,r.start,r.end,i+1,value[i]);
			}
		}
	}
	,textReady(){
		console.log("text ready")
		this.scrollToAddress(this.props.address);
		this.decorate();
	}
	,componentWillUnmount(){
		this.cm.setValue("");
	}
	,shouldComponentUpdate(nextProps,nextState){
		return (nextProps.corpus!==this.props.corpus
			||nextProps.address!==this.props.address
			||nextProps.layout!==this.props.layout
			||nextState.text!==this.state.text);
	}
	,componentWillReceiveProps(nextProps){//cor changed
		if (nextProps.corpus!==this.props.corpus
			||nextProps.address!==this.props.address
			||nextProps.layout!==this.props.layout){

			if (nextProps.article.at===this.props.article.at
				&& nextProps.layout==this.props.layout
				&&nextProps.corpus==this.props.corpus) {
				this.scrollToAddress(nextProps.address);
			} else {
				this.loadtext(nextProps);
			}
		}
		if (this.cm && nextProps.focus) {
			this.cm.focus();
		}
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
		const firstline=this.cor.bookLineOf(this.props.article.start); //first of of the article
		const text=this.cm.doc.getLine(linech.line);
		const lb=this.state.linebreaks[linech.line];
		if (!text) return this.props.article.start;
		return this.cor.fromLogicalPos(text,linech.ch,lb,firstline,this.getRawLine);
	}
	/*
	,viewLeaving(article){
		const corpus=this.corpus,cor=this.cor,side=this.props.side;
		decorateBond.hideBonds();
		this.props.onViewLeaving&&this.props.onViewLeaving({article,cor,corpus,side,cm:this.cm});
	}
	,viewReady(article){
		const corpus=this.corpus,cor=this.cor,side=this.props.side;
		const toLogicalRange=this.toLogicalRange;
		this.props.onViewReady&&this.props.onViewReady({article,cor,corpus,side,cm:this.cm,toLogicalRange});
	}
	,onLoaded(res){
		res.address&&this.scrollToAddress(res.address);
		this.decorate();
		this.viewReady(res.article);
	}
	*/
	,getRawLine(line){
		return this.props.text[line];
	}
	,lineWidget(opts){
		if (opts.corpus!==this.corpus)return;
		const linech=this.toLogicalPos(opts.address);
		if (linech.line==-1)return;
		if (this.linewidget) this.linewidget.clear();
		this.linewidget=this.cm.setBookmark(linech,{widget:opts.widget,handleMouseEvents:true});
	}
	,scrollToAddress(address){
		const r=this.cor.toLogicalRange(this.state.linebreaks,address,this.getRawLine);
		if (!r || r.start.line<0)return;
		if (this.viewer) this.viewer.jumpToRange(r.start,r.end);		
	}
	,highlightAddress(address){
		this.highlight&&this.highlight.clear();
		if (!address) return;
		const r=this.cor.toLogicalRange(this.state.linebreaks,address,this.getRawLine);
		this.highlight=this.cm.markText(r.start,r.end,{className:"highlight",clearOnEnter:true});
	}
	,layout(article,rawlines,address,playout){
		const cor=this.cor;
		const layouttag="p";

		if (!address){
			//scroll to the selection after layout
			address=this.kRangeFromCursor(this.cm);
		}
		var book=cor.bookOf(article.start);

		const changetext=function(layout){
			const text=layout.lines.join("\n");

			this.setState({text,linebreaks:layout.linebreaks,
				pagebreaks:layout.pagebreaks,article},()=>{
					this.textReady();
				}
			);
		}

		//TODO, put layouttag to article field
		//pass in via props

		if (!playout) {
			changetext.call(this, cor.layoutText(rawlines,article.start) );
		} else {
			cor.getBookField(layouttag,book,function(book_p){
				if (!book_p) {
					console.log(layouttag,book)
					debugger;
				}
				const p=cor.trimField(book_p,article.start,article.end);
				changetext.call(this, cor.layoutText(rawlines,article.start,p.pos) );
			}.bind(this));
		}
	}
	,charWidget(opts){
		if (opts.corpus!=this.corpus)return;
		const linech=this.toLogicalPos(opts.address);
		if (this.charwidget)this.charwidget.clear();
		this.charwidget=this.cm.setBookmark(linech,{widget:opts.widget,handleMouseEvents:true});
	}
	,kRangeFromSel(cm,from,to){
		if (!from||!to)return 0;
		const f=this.cor.fromLogicalPos.bind(this.cor);
		const firstline=this.cor.bookLineOf(this.props.article.start); //first of of the article
		const s=f(cm.doc.getLine(from.line),from.ch,this.state.linebreaks[from.line],firstline,this.getRawLine);
		const e=f(cm.doc.getLine(to.line),to.ch,this.state.linebreaks[to.line],firstline,this.getRawLine);
		return this.cor.makeKRange(s,e);
	}
	,kRangeFromCursor(cm){
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
		evt.target.value="@"+this.cor.stringify(krange)+';';
		evt.target.select();//reselect the hidden textarea
	}
	,getCaretText(cm){ //get caretText for checking dictionary
		const from=cm.getCursor();
		var ch=from.ch;
		if (ch>2) ch-=2; //include two char before
		//should check punc backward
		var caretText=cm.doc.getRange({line:from.line,ch},{line:from.line+1,ch:256});
		caretText=caretText.replace(/\r?\n/g,"");
		const m=caretText.match(/^[.？,。，！；「」『』—－：、（）｛｝【】《》]*(.*?)[.？,。，！；「」『』—－：、（）｛｝【】《》]/);
		if (m){
			caretText=m[1];
		}
		return caretText;
	}
	,detectSelection(cm){
		const sels=cm.listSelections();	
		if (sels.length>0){
			const sel=sels[0];
			var ranges=[];
			for (let i=0;i<sels.length;i++) {
				ranges.push(this.kRangeFromSel(cm,sel.head,sel.anchor));
			}

			const selectionText=cm.doc.getSelection();
			const cursor=cm.getCursor();
			const cursorrange=this.kRangeFromCursor(cm);
			const r=this.cor.parseRange(cursorrange);
			this.props.setSelection({
					corpus:this.props.corpus,id:this.props.id,
					caretText:this.getCaretText(cm),selectionText,
					ranges, caretpos:r.start, cursor:{line:cursor.line,ch:cursor.ch}
				});
		}
	}
	,onCursorActivity(cm){
		clearTimeout(this.cursortimer);
		this.cursortimer=setTimeout(function(){
			this.detectSelection(cm);
			this.props.onCursorChanged&&this.props.onCursorChanged(cm);
		}.bind(this),300);
	}
	,onViewportChange(cm,from,to){
		//decorateBond.onViewportChange.call(this,cm,from,to);
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