import { HashRouter, Route, Switch } from 'react-router-dom';
import AppForm from './containers/AppForm';
import Items from './components/Items';
import Item from './components/Item';
import GroupByItem from './components/GroupByItems';
import AllItems from './components/AllItems';
import Basket from './containers/Basket';
import User from './containers/User';

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
      </Switch>
  </HashRouter>
  );
}

export default App;
