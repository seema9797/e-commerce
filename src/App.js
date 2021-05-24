
import React,{useState,useEffect} from 'react'
import Navbar from './components/Navbar/Navbar'
import Products from './components/products/Products'
import {commerce} from './lib/commerce';
import Cart from './components/Cart/Cart';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Checkout from './components/CheckoutForm/Checkout/Checkout'
function App() {
  
const [mobileOpen, setMobileOpen] = React.useState(false);
const[products,setProducts]=useState([]);
const[cart,setCart]=useState({});
const [order, setOrder] = useState({});
const [errorMessage, setErrorMessage] = useState('');


const fetchCart=async ()=>{
  setCart(await commerce.cart.retrieve())
}


const fetchProducts =async ()=>{
  const {data}=await commerce.products.list();

  setProducts(data);
}

const handleAddToCart =async(productId,quntity)=>{
  const {cart}=await commerce.cart.add(productId,quntity);
  setCart(cart);
}
const handleUpdateCartQty =async (productId,quntity)=>{
  const cart=await commerce.cart.update(productId,{quntity});
  setCart(cart)
}

const handleRemoveFromCart =async (productId)=>{
  const {cart} =await commerce.cart.remove(productId);
   setCart(cart);
}

const refreshCart = async () => {
  const newCart = await commerce.cart.refresh();

  setCart(newCart);
};

const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
  try {
    const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

    setOrder(incomingOrder);

    refreshCart();
  } catch (error) {
    setErrorMessage(error.data.error.message);
  }
};

const handleEmptyCart =async ()=>{
   const {cart}=await commerce.cart.empty();
   setCart(cart);
}

useEffect(()=>{
   fetchProducts();
   fetchCart();

},[])


console.log(cart);

  return (
    <Router>
    <div className="App">
      <Navbar totalItems={cart.total_items}/>
      <Switch>
        <Route exact path="/">
           <Products products={products} onAddToCart={handleAddToCart}/>
        </Route>
        <Route exact path="/cart">
           <Cart cart={cart}
         onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart}
           />
        </Route>

        <Route path="/checkout" exact>
            <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
          </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
