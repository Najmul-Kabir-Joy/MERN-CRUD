import logo from './logo.svg';
import './App.css';
import Addproduct from './Components/Addproduct/Addproduct';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Productlist from './Components/Productlist/Productlist';
import UpdateProduct from './Components/UpdateProduct/UpdateProduct';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Productlist></Productlist>
          </Route>
          <Route path='/addproduct'>
            <Addproduct></Addproduct>
          </Route>
          <Route path='/productlist'>
            <Productlist></Productlist>
          </Route>
          <Route path="/update/:id">
            <UpdateProduct></UpdateProduct>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
