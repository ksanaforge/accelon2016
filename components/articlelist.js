const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const {openCorpus}=require("ksana-corpus");

const ArticleList=React.createClass({
	shouldComponentUpdate(nextProps) {
		return nextProps.corpus!==this.props.corpus && nextProps.corpus;
	}
	,propTypes:{
		close:PT.func.isRequired,
		menux:PT.number.isRequired,
		menuy:PT.number.isRequired,
		corpus:PT.string.isRequired,
		article:PT.object.isRequired
	}
	,onMouseEnter(){
		clearTimeout(this.closetimer);
	}
	,onMouseLeave(){
		clearTimeout(this.closetimer);
		this.closetimer=setTimeout(()=>{
			this.props.close();
		},500);
	}
	,goArticle(e){
		const start=parseInt(e.target.dataset.start);
		this.props.onSelectItem( start );
	}
	,renderItem(article,key) {
		const selected=this.props.article.start==article.start;
		return E("li",{key},E("a",
			{style:selected?styles.selected:{},"data-start":article.start,href:"#"
					,onClick:this.goArticle},article.articlename));
	}
	,render(){
		const cor=openCorpus(this.props.corpus);
		const articles=cor.groupArticles(this.props.address);
		const style=Object.assign({},styles.container,{left:this.props.menux,top:this.props.menuy});
		return E("div",{style,onMouseLeave:this.onMouseLeave},
			E("ul",{className:"mui-dropdown__menu mui--is-open"},
				articles.map(this.renderItem)
			)
		)
	}
});
const styles={
	container:{position:"absolute",zIndex:200},
	selected:{color:"blue",background:"#afafff",disabled:true,cursor:"default"}
}
module.exports=ArticleList;