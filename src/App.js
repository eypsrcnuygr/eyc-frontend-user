import { HashRouter, Route, Switch } from 'react-router-dom';
import AppForm from './containers/AppForm';
import Items from './containers/Items';
import Item from './containers/Item';
import GroupByItem from './containers/GroupByItems';
import AllItems from './containers/AllItems';
import Basket from './containers/Basket';
import User from './containers/User';
import AboutUs from './components/AboutUs';
import Bank from './components/Bank';
import Contract from './components/Contract';
import Conditions from './components/Conditions';
import Security from './components/Security';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact render={props => <Items {...props} />} />
        <Route path="/logged_in" exact render={props => <AppForm {...props} />} />
        <Route path={['/items', '/items/:id']} exact render={props => <Item {...props} />} />
        <Route path={['/groups', '/groups/:group']} exact render={props => <GroupByItem {...props} />} />
        <Route path="/all" exact render={props => <AllItems {...props} />} />
        <Route path="/basket" exact render={props => <Basket {...props} />} />
        <Route path="/user" exact render={props => <User {...props} />} />
        <Route path="/AboutUs" exact render={props => <AboutUs {...props} />} />
        <Route path="/Bank" exact render={props => <Bank {...props} />} />
        <Route path="/Contract" exact render={props => <Contract {...props} />} />
        <Route path="/Conditions" exact render={props => <Conditions {...props} />} />
        <Route path="/Security" exact render={props => <Security {...props} />} />
      </Switch>
  </HashRouter>
  );
}

export default App;
