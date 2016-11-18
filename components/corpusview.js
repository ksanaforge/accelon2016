const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const CMView=require("./cmview");
const {openCorpus}=require("ksana-corpus");
/*
const defaultrule=require("../defaultrule");
const addressHashTag=require("../units/addresshashtag");
const decorations=require("../decorations/");
const decorateBond=require("../decorations/bond");
*/
const CorpusView=React.createClass({
	/*
	contextTypes:{
		action:PT.func.isRequired,
		listen:PT.func.isRequired,
		unlistenAll:PT.func.isRequired
	}
	*/
	propTypes:{
		corpus:PT.string.isRequired,
		address:PT.string.isRequired,
		text:PT.array.isRequired,
		decorations:PT.array,
		seq:PT.number.isRequired,
		onViewReady:PT.func,
		onViewLeaving:PT.func,
		onCursorActivity:PT.func,
		onViewport:PT.func
	}
	,getInitialState(){
		return {text:"",startkpos:1,article:{},layout:'p',linebreaks:[],pagebreaks:[]};
	}
	,componentDidMount(){
		/*
		this.context.listen("goto",this.goto,this);
		this.context.listen("toggleLayout",this.toggleLayout,this);
		this.context.listen("highlightAddress",this.highlightAddress,this);
		this.context.listen("nextArticle",this.nextArticle,this);
		this.context.listen("prevArticle",this.prevArticle,this);
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
		const {corpus,article,text,address}=this.props;
		this.cor=openCorpus(corpus);
		this.layout(article,text,address);
	}
	,componentWillUnmount(){
		//this.context.unlistenAll();
		//this.viewLeaving&&this.viewLeaving(this.state.article);
	}	,componentWillReceiveProps(nextProps){//cor changed
		if (nextProps.corpus!==this.corpus
			||nextProps.address!==this.props.address){
			const {article,text,address,corpus}=nextProps;
			this.cor=openCorpus(corpus);
			this.layout(article,text,address);
		}
	}	
	,clearSelection(){
		const cursor=this.cm.getCursor();
		this.cm.doc.setSelection(cursor,cursor);
	}
	/*
	,goto(opts){
		opts=opts||{};
		const cor=opts.cor||this.cor;
		if (opts.corpus!==cor.meta.name) return;
		if (typeof opts.side!=="undefined" && this.props.side!==opts.side){
			return;
		}
		const range=cor.parseRange(opts.address);
		const article=cor.articleOf(range.start);
		if (!article)return;

		if (article.at==this.state.article.at){
			this.scrollToAddress(opts.address);
			return;
		}

		this.viewLeaving(this.state.article);
		
		cor.getArticleText(article.at,function(text){
			if (!text)return;
			this.layout(article,text,opts.address);
		}.bind(this));
	}
	*/
	,toLogicalPos(address){
		return this.cor.toLogicalPos(this.state.linebreaks,address,this.getRawLine);		
	}
	,toLogicalRange(range){
		return this.cor.toLogicalRange(this.state.linebreaks,range,this.getRawLine);
	}
	,fromLogicalPos(linech){
		const firstline=this.cor.bookLineOf(this.state.startkpos); //first of of the article
		const text=this.cm.doc.getLine(linech.line);
		const lb=this.state.linebreaks[linech.line];
		if (!text) return this.state.startkpos;
		return this.cor.fromLogicalPos(text,linech.ch,lb,firstline,this.getRawLine);
	}
	,decorate(){
		if (!this.props.decorations)return;
		this.props.decorations.forEach(function(d){
			decorations[d]&&decorations[d](this.cor,this.state.article,
				this.cm,this.toLogicalPos);
		}.bind(this));
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
		decorateBond.repaintBond.call(this);
	}
	,onLoaded(res){
		res.address&&this.scrollToAddress(res.address);
		this.decorate();
		this.viewReady(res.article);
	}
	*/
	,getRawLine(line){
		if (!this.state.text)return "";
		return this.state.text[line];
	}
	,lineWidget(opts){
		if (opts.corpus!==this.corpus)return;
		if (opts.seq!==this.props.seq)return;
		const linech=this.toLogicalPos(opts.address);
		if (linech.line==-1)return;
		if (this.linewidget) this.linewidget.clear();
		this.linewidget=this.cm.setBookmark(linech,{widget:opts.widget,handleMouseEvents:true});
	}
	,scrollToAddress(address){
		const r=this.cor.toLogicalRange(this.state.linebreaks,address,this.getRawLine);
		if (!r || r.start.line<0)return;
		this.viewer.jumpToRange(r.start,r.end);
	}
	,highlightAddress(address){
		this.highlight&&this.highlight.clear();
		if (!address) return;
		const r=this.cor.toLogicalRange(this.state.linebreaks,address,this.getRawLine);
		this.highlight=this.cm.markText(r.start,r.end,{className:"highlight",clearOnEnter:true});
	}
	,toggleLayout(opts){
		if (opts.corpus!==this.corpus||opts.seq!==this.props.side) return;
		const article=this.cor.articleOf(this.state.startkpos);
		this.layout(article,this.state.text);
	}
	,layout(article,text,address){
		const cor=this.cor;
		const seq=this.props.seq;
		const layouttag="p";

		if (!address){
			//scroll to the selection after layout
			address=this.kRangeFromCursor(this.cm);
		}
		var book=cor.bookOf(article.start);

		const changetext=function(layout){
			const text=layout.lines.join("\n");
			this.setState({text,linebreaks:layout.linebreaks,startkpos:article.start,
				pagebreaks:layout.pagebreaks,article});
		}

		if (this.state.layout=='') {
			cor.getBookField(layouttag,book,function(book_p){
				if (!book_p) {
					console.log(layouttag,book)
					debugger;
				}
				const p=cor.trimField(book_p,article.start,article.end);
				changetext.call(this, cor.layoutText(text,article.start,p.pos) );
			}.bind(this));
		} else {
			changetext.call(this, cor.layoutText(text,article.start) );
		}
	}
	,gotoArticle(opts,nav){
		const corpus=this.cor.meta.name;
		if (opts.corpus!==corpus) return;
		const r=this.cor.getArticle(this.state.article.at,nav);
		if(r) this.goto({corpus,address:r.start});
	}
	,nextArticle(opts){
		this.gotoArticle(opts,1);
	}
	,prevArticle(opts){
		this.gotoArticle(opts,-1);
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
		const firstline=this.cor.bookLineOf(this.state.startkpos); //first of of the article
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
			const range=this.kRangeFromSel(cm,sel.head,sel.anchor);
			const r=this.cor.parseRange(range);
			const selectionText=cm.doc.getSelection();
			/*
			this.context.action("selection",
				{cor:this.cor,corpus:this.corpus,
					caretText:this.getCaretText(cm),selectionText,
					article:this.state.article.articlename,
					side:this.props.side,
					start:r.start,end:r.end,range}
			);
			*/
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
	,setCM(cm){
		this.viewer=cm;
		this.cm=cm.getCodeMirror();
	}
	,render(){
		if (!this.state.text) return E("div",{},"loading");
		const props=Object.assign({},this.props,
			{ref:"cm",
			text:this.state.text,
			onCursorActivity:this.onCursorActivity,
			onCopy:this.onCopy,
			onViewportChange:this.onViewportChange,
			articlename:this.state.article.articlename
			}
		);
		return E(CMView,props);
	}
})
module.exports=CorpusView;