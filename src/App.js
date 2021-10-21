import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Post from "./pages/Post/"
import List from "./pages/List/"
import Edit from "./pages/Edit/"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={List} />
        <Route path="/friends" component={Post} />
        <Route path="/edit/:id" component={Edit} />
      </Switch>
    </Router>
  );
}

export default App;
