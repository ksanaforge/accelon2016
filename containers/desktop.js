const React =require('react');
const E=React.createElement;
const MainTabs=require("./maintabs");
const ControlTabs=require("../components/controltabs");
const CorpusViewOptions=require("./corpusviewoptions");
const TocNav=require("./tocnav");

const Desktop=React.createClass({
	componentDidMount(){
		this.props.stockcorpora.forEach((corpus)=>{
			this.props.openCorpus(corpus.id||corpus.name);	
		});
	}
	,render(){
		const styles={
			container:{display:"flex",width:"100%"},
			maintabs:{flex:this.props.leftFlex||6},
			controltabs:{flex:this.props.rightFlex||4}
		}

		const props=Object.assign({},this.props,{viewOptions:CorpusViewOptions,nav:TocNav});
		return E("div",{style:styles.container},
			E("div",{style:styles.maintabs},E(MainTabs,props)),
			E("div",{style:styles.controltabs},E(ControlTabs,this.props))
		);
	}
});


module.exports=Desktop;