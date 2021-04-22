import './App.css';
import Login from './Pages/Login/Login'
// import ResetPassword from './Pages/ResetPassword/ResetPassword';
import { BrowserRouter as Router, Route, Link, Navlink, Switch, BrowserRouter,Redirect } from 'react-router-dom';
import Signup from './Pages/Signup/Signup';
import Appbar from './Components/Appbar/Appbar'
import DashboardAdmin from './Pages/DashboardAdmin/DashboardAdmin';
import LoginPart from './Components/LoginPart/LoginPart';
import AdminLogin from './Pages/AdminLogin/Main'
import { ProtectedRoute } from "./ProtectedRoute";
import UserDashboard from './Pages/UserPanel/Userpanel'
import OrderSucess from './Pages/Ordersucess/ordersucess';
import Cart from './Pages/Cart/cart';

function App() {
  const Routing =()=>{
    return(
    <Router>
      <div>
        <Switch>
         {/* <Redirect  exact path="/" to="/login" /> */}
         <Route exact path="/" component={Signup} ></Route>         
         <ProtectedRoute   path="/adminpanel" component={DashboardAdmin} />
         <Route exact path="/userdashboard" component={UserDashboard} ></Route>         
         <Route exact path="/ordersucess" component={OrderSucess} ></Route>         
         <Route exact path="/cart" component={Cart} ></Route>         
        
         </Switch>
      </div>
    </Router>)
  }
  return (
    <>
     < Routing />
    </>
  );
}

export default App;
