const React=require("react");
const E=React.createElement;
const {Provider}=require('react-redux');
const App=require('./containers/app');
const configureStore=require('./store/configurestore');
const store = configureStore();

const Accelon=function(opts){
	return E(Provider,{store},E(App,opts));
}
module.exports=Accelon;