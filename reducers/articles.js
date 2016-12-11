const {OPEN_AT,FETCH_FAILED,SET_ACTIVE_ARTICLE,CLOSE_ARTICLE,CLONE_ARTICLE} 
  = require('../actions/articles');
const {TOGGLE_LAYOUT,UPDATE_ARTICLE }=require("../actions/article");
const {SEARCH_DONE}=require("../actions/search");
const rightButton=require("../components/tabclonebutton");
const initialArticles=[
  {view:require("../components/corpusview")
  ,corpus:"",article:{}
  ,title:"ResultView",id:'resultview',rawlines:["a","b"],rightButton,address:"1p1"}
]


module.exports=function articles(state = initialArticles , action = {}) {
	const A=action;
  if (OPEN_AT===A.type) { //TODO open at position
		var newstate=state.slice();
    const {corpus,title,address,article,rawlines,fields,id}=action;
    var obj={title,corpus,address,article,rawlines,fields,id};
    newstate.push(obj);
		return newstate;
  } else if (CLOSE_ARTICLE===A.type) {
    return state.filter((o)=>o.id!==A.id);
  } else if (TOGGLE_LAYOUT===A.type) {
    return state.map((o)=>(o.id==A.id)?Object.assign({},o,{layout:!o.layout}):o);
  } else if (UPDATE_ARTICLE===A.type) {
    const {title,address,article,rawlines,corpus}=action;
    return state.map((o)=>(o.id==A.id)?Object.assign({},o,{corpus,title,address,article,rawlines}):o);
  } else if (CLONE_ARTICLE===A.type) {
    var articles=state.filter((o)=>o.id===A.clonefrom);
    if (!articles.length)return state;
    const article=articles[0];

    var newstate=state.slice();
    const address=A.address||article.address;
    obj=Object.assign({},article,{id:A.id,view:null,rightButton:null,address});
    newstate.push(obj);
    return newstate;
  } else {
  	return state;
  }
};