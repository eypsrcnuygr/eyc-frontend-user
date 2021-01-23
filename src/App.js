import { HashRouter, Route, Switch } from 'react-router-dom';
import AppForm from './containers/AppForm';
import Items from './components/Items';
import Item from './components/Item';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact render={props => <Items {...props} />} />
        <Route path="/logged_in" exact render={props => <AppForm {...props} />} />
        <Route path={['/items', '/items/:id']} exact render={props => <Item {...props} />} />
      </Switch>
  </HashRouter>
  );
}

export default App;
