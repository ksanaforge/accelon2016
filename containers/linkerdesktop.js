const React=require("react");
const E=React.createElement;
const LinkerTab=require("../components/linkertab");
const CorpusView=require("../components/corpusview");
const {openCorpus}=require("ksana-corpus");
const {OPEN_RIGHT,OPEN_LEFT}=require("../actions/linkarticle");
const LinkerDesktop=React.createClass({
	getInitialState(){
		return {ready:false}
	}
	,componentWillReceiveProps(nextProps){
		if (!this.state.ready&&nextProps.corpora[nextProps.corpus1] && nextProps.corpora[nextProps.corpus2]) {
			if (!nextProps.rightarticle && !nextProps.leftarticle) {
				this.props.fetchArticle(nextProps.corpus1,"59p9.0301",OPEN_LEFT);
				this.props.fetchArticle(nextProps.corpus2,"",OPEN_RIGHT);				
			}

			if (nextProps.leftarticle&&nextProps.rightarticle) {
				this.setState({ready:true})
			}
		}
	}
	,componentWillMount(){
		this.props.openCorpus(this.props.corpus1);
		this.props.openCorpus(this.props.corpus2);
	}
	,render(){
		if (!this.state.ready) {
			return E("loading");
		}
		const styles={
			container:{display:"flex",width:"100%"},
			lefttab:{flex:this.props.leftFlex||6},
			righttab:{flex:this.props.rightFlex||4},
			corpustab:{flex:16,display:"flex"},
			linkertab:{flex:2}
		}
		const props1=Object.assign({},this.props,this.props.leftarticle);
		const props2=Object.assign({},this.props,this.props.rightarticle);
		return E("div",{style:styles.container},
			E("div",{style:styles.corpustab},
				E("div",{style:styles.lefttab},E(CorpusView,props1)),
				E("div",{style:styles.righttab},E(CorpusView,props2))
			),
			E("div",{style:styles.linkertab},E(LinkerTab,this.props))
		);
	}
});


module.exports=LinkerDesktop;