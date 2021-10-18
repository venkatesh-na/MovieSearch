import Form from "./componets/Form"
import Movies from "./componets/Movies"
import Detail from "./componets/Detail";
import './App.css';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Router basename = {process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path = "/">
          <main>
                <h1 className = "heading">Movies Search</h1>
                <Form/>
                <Movies/>
          </main>
        </Route>
        <Route path = "/detail/:id" component = {Detail}/>
      </Switch>
    </Router>
  );
}
//when i use component attribute in Route component than only we get param object in Detail 
export default App;
