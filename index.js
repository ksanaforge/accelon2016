const React=require("react");
const E=React.createElement;
const {Provider}=require('react-redux');

const Apps={
	"linker":require('./containers/linker'),
	"default":require('./containers/app')
}
const Stores={
	"linker":require("./store/linkerstore"),
	"default":require("./store/configurestore")
}

const Accelon=function(opts){
	const App=Apps[opts.desktop||"default"];
	if (!App) {
		throw "unknown desktop "+opts.desktop;
	}

	const store = Stores[opts.desktop||"default"]();

	return E(Provider,{store},E(App,opts));
}
module.exports=Accelon;