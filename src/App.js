import logo from './logo.svg';
import './App.css';
import HomePage from './pages/Homepage';
import ProductPage from './pages/Productpage';
import CartPage from './pages/CartPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/Signin';
import Login from './pages/Login';
import OrderHistory from './pages/OrderHistory';
import AllProductPage from './pages/AllProductPage';
import Contact from './pages/Contact';
import ErrorPage from './pages/ErrorPage';
import Loading from './components/Loading.Component';
import Profile from './pages/Profile';
import Adminmenu from './pages/adminmenu';
import ShippingScreen from './pages/Shipping';
import Paypal from './pages/Paypal';
import Searchscreen from './pages/searchscreen';
import PlaceOrderScreen from './pages/placeOrder';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Login/>}/>
      <Route exact path='/AllProductPage' element={<AllProductPage/>}/>
      <Route exact path='/Contact' element={<Contact/>}/>
      <Route exact path='/Paypal' element={<Paypal/>}/>
      <Route exact path='/About' element={<About/>}/>
      <Route exact path='/shipping' element={<ShippingScreen/>}/>
      <Route exact path='/CartPage' element={<CartPage/>}/>
      <Route exact path='/Productpage' element={<ProductPage/>}/>
      <Route exact path='/Signin' element={<SignIn/>}/>
      <Route exact path='/HomePage' element={<HomePage/>}/>
      <Route exact path='/Loaing.Component' element={<Loading/>}/>
      <Route exact path='/OrderHistory' element={<OrderHistory/>}/>
      <Route exact path='/Profile' element={<Profile/>}/>
      <Route exact path='/adminmenu' element={<Adminmenu/>}/>
      <Route exact path='/searchpage' element={<Searchscreen/>}/>
      <Route exact path='/placeorderScreen' element={<PlaceOrderScreen/>}/>
      <Route exact path='*' element={<ErrorPage/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
