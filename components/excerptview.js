const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const PT=React.PropTypes;
const CodeMirror=require("ksana-codemirror").Component;
const ExcerptNav=require("./excerptnav");
const ExcerptHeader=require("./excerptheader");
const {openCorpus}=require("ksana-corpus");

const styles={
	nav:{position:"absolute",top:"1.5em",width:"300px",right:18,zIndex:200}
}
const ExcerptView=React.createClass({
	propTypes:{
		excerpts:PT.array.isRequired,
		query:PT.object.isRequired,
		hitperbatch:PT.number.isRequired,
		goOccur:PT.func.isRequired
	}
	,getInitialState(){
		return {text:this.buildGroupText()}
	}
	,buildGroupText(excerpts){
		excerpts=excerpts||this.props.excerpts;
		this.group=[],linecount=0;
		var text="";
		excerpts.forEach((item)=>{
			this.group.push(linecount);
			linecount+=item.text.split("\n").length;
			text+=item.text+"\n";
		});
		this.group.push(linecount); //terminator
		return text;		
	}
	,cursorline:0
	,linewidgethandles:[]
	,excerptTitle(now){
		const cor=openCorpus(this.props.corpus);
		const tpos=this.props.query.filtered[now];
		const address=cor.fromTPos(tpos).kpos[0];
		var addressH=cor.stringify(address);
		addressH=addressH.substr(0,addressH.length-2);
		const title=(now+1)+"."+cor.articleOf(address).articlename + " "+addressH;
		return title;
	}
	,addGroupHeader(){
		const goOccur=this.props.goOccur;
		const batch=Math.floor(this.props.now/this.props.hitperbatch);
		const start=this.props.hitperbatch*batch;
		const totalline=this.cm.lineCount()-1;
		if (!this.props.corpus)return;
		this.linewidgethandles.forEach((lw)=>lw.clear());
		this.linewidgethandles=[];
		this.group.forEach((line,idx)=>{
			if (this.group[idx]==totalline)return;//last group is only for terminator
			const now=start+idx;
			const title=this.excerptTitle(now);
			var domnode=document.createElement("span");
			ReactDOM.render( E(ExcerptHeader,{title,now,goOccur}), domnode);
			linewidgethandle=this.cm.doc.addLineWidget(line,domnode,{above:true,handleMouseEvents:true});
			this.linewidgethandles.push(linewidgethandle);
		});
	}
	,highlight(){
		if (!this.props.corpus||!this.state.text)return;
		const cor=openCorpus(this.props.corpus);
		for (let i=0;i<this.props.excerpts.length;i++) {
			const excerpt=this.props.excerpts[i];
			const linebreaks=excerpt.linebreaks;
			const getrawline=(line)=>excerpt.rawtext[line] ;
			for(let j=0;j<excerpt.phrasehits.length;j++) {
				const hits=excerpt.phrasehits[j].hits;
				const phraselengths=this.props.query.phrasepostings[j].lengths;
				const linecharr=hits.map((hit,idx)=>{
					const phraselength=phraselengths[idx]||phraselengths;//should be kpos width
					var from=cor.toLogicalPos(excerpt.linebreaks,hit,getrawline);
					var to=cor.toLogicalPos(excerpt.linebreaks,hit+phraselength,getrawline);
					from.line+=this.group[i];
					to.line+=this.group[i];
					this.cm.markText(from,to,{className:"hl hl"+j});
				});
			}
		}
	}
	,markText(){
		this.addGroupHeader();
	}
	,componentDidUpdate(){
		this.markText();
		this.highlight();
		const caretline=this.cm.getCursor().line;
		const line=this.group[this.props.now % this.props.hitperbatch];
		const group=this.getGroupByLine(caretline);
		if (line!==caretline && line<this.cm.lineCount()) {
			this.cm.setCursor({line});
		}
		this.ready=true;
	}
	,componentDidMount(){
		this.markText();
		this.highlight();
		this.ready=true;
	}
	,componentWillUnmount(){
		this.linewidgethandles.map((w)=>w.clear());//just incase
	}
	,excerptchanged(nextProps){
		if (!this.props.excerpts || !nextProps.excerpts
			||!this.props.excerpts.length || !nextProps.excerpts.length) return true;

		const nextFirst=nextProps.excerpts[0].linetpos[0];
		const first=this.props.excerpts[0].linetpos[0];

		const nextlast=nextProps.excerpts[nextProps.excerpts.length-1].linetpos[0];
		const last=this.props.excerpts[this.props.excerpts.length-1].linetpos[0];

		return (nextFirst!==first && nextlast!==last);
	}
	,componentWillReceiveProps(nextProps) {
		if (this.excerptchanged(nextProps) && nextProps.excerpts.length) {
			this.ready=false;
			this.setState({text:this.buildGroupText(nextProps.excerpts)});
		}
	}
	,shouldComponentUpdate(nextProps,nextState){
		const r= (this.excerptchanged(nextProps)||this.props.now!==nextProps.now);
		return r;
	}
	,getCM(cm){
		if (cm) this.cm=cm.getCodeMirror();
	}
	,gobatch(batch) {
		this.props.goOccur(batch*this.props.hitperbatch);
	}
	,getGroupByLine(line){
		for (let i=1;i<this.group.length;i++) {
			if (this.group[i]>line) return i-1;
		}
		return 0;
	}
	,onCursorActivity(cm){
		if (!this.ready)return;
		const line=cm.getCursor().line;
		const group=this.getGroupByLine(line);
		const batch=Math.floor(this.props.now / this.props.hitperbatch);
		const newnow=this.props.hitperbatch*batch + group;
		if (newnow!==this.props.now) {
			this.props.goOccur(newnow);
		}
	}
	,render(){
		const count=(this.props.query.filtered||{}).length||0;
		const batch=Math.floor(this.props.now/this.props.hitperbatch);
		return E("div",{style:{position:"relative"}},
			E(CodeMirror,{ref:this.getCM,value:this.state.text,theme:"ambiance"
				,onCursorActivity:this.onCursorActivity}),
			E("div",{style:styles.nav},E(ExcerptNav,
				{batch,count,hitperbatch:this.props.hitperbatch,gobatch:this.gobatch}))
		);
	}
})
module.exports=ExcerptView;