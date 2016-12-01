const React =require('react');
const E=React.createElement;
const MUITabs=require("./muitabs");
const TestTab=require("../containers/testtab");
const SearchTab=require("../containers/searchtab");
const ControlTabs=(props)=>{
	const panes=[
		E("div",{},E(SearchTab,props)),
		E("div",{},E(TestTab,props))
	]
	return E("div",{},
		E(MUITabs,{tabs:[["search","Search"],["bar","test"]],panes})
	)
}
module.exports=ControlTabs;