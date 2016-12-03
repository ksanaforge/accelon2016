const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const PT=React.PropTypes;
const CodeMirror=require("ksana-codemirror").Component;
const ExcerptNav=require("./excerptnav");
const ExcerptHeader=require("./excerptheader");
const styles={
	nav:{position:"absolute",top:"1.5em",width:"300px",right:18,zIndex:200}
}
const ExcerptView=React.createClass({
	propTypes:{
		excerpts:PT.array.isRequired
	}
	,text:""
	,updateExcerpts(excerpts){
		this.text="";
		this.group=[],linecount=0;
		excerpts.forEach((item)=>{
			this.group.push(linecount);
			linecount+=item.text.split("\n").length;
			this.text+=item.text+"\n";
		});
		this.cm.setValue(this.text);
		
		setTimeout(()=>{
			this.group.forEach((line,idx)=>{
				var domnode=document.createElement("span");
				ReactDOM.render( E(ExcerptHeader,{title:idx+1}), domnode);
				this.cm.doc.addLineWidget(line,domnode,{above:true,handleMouseEvents:true});
			});
		},10);
	}
	,componentWillReceiveProps(nextProps) {

		if (nextProps.excerpts!==this.props.excerpts) {
			console.log("update excerpts")
			this.updateExcerpts(nextProps.excerpts);
		}
	}
	,shouldComponentUpdate(){
		return false;
	}
	,componentDidMount(){
		this.updateExcerpts(this.props.excerpts);
	}
	,getCM(cm){
		if (cm) this.cm=cm.getCodeMirror();
	}
	,render(){
		return E("div",{style:{position:"relative"}},
			E(CodeMirror,{ref:this.getCM,value:"loading",theme:"ambiance"}),
			E("div",{style:styles.nav},E(ExcerptNav,{count:200}))
		);
	}
})
module.exports=ExcerptView;