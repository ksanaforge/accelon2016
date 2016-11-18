const React =require('react');
const E=React.createElement;
const MUITabs=require("./muitabs");
const TestTab=require("../containers/testtab");
const ControlTabs=(props)=>{
	const panes=[
		E("div",{},E(TestTab,props)),
		E("div",{},"foo1")
	]
	return E("div",{},
		E(MUITabs,{tabs:[["foo","Foo!"],["bar","Bar!"]],panes})
	)
}
module.exports=ControlTabs;