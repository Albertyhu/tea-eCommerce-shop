import React, { useState, useRef } from 'react'; 
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './screens/home_page';
import ProductPage from './screens/product_page'; 
import './style/myStyle.css'
import { MyContext } from './components/contextItem.js'; 
import { TeaData } from './components/teaData.js'; 
import CartPanel from './screens/cart/cartPanel.js'; 
import SlidingPanel from 'react-sliding-side-panel';

function App() {
    const [cart, setCart] = useState([])
    const [openPanel, setOpenPanel] = useState(false);
    //for users with small mobile devices 
    const [hamburgerPanel, setHamburgerPanel] = useState(false); 
    const [addProductMessage, setAddProductMessage] = useState(false); 
    const [message, setMessage] = useState(''); 
    const ref = useRef();
    const hamburgerRef = useRef()
    const messageRef = useRef() 
    const context = {
        addProduct: (product, productID, additionalStock) => {
            var newArr = [...cart]; 
            var obj = newArr.find(item => item.ID === productID)
            if (obj) {
                //add stock to existing product in cart
                var ind = newArr.indexOf(obj)

                newArr[ind].stock += additionalStock; 
            }
            else {
                //add new item to cart array
                newArr.push(product)
            }
            setCart([...newArr])
        },
        removeFromCart: (productID) => {
            var obj = cart.find(val => val.ID === productID)
            if (obj) {
                var newArr = cart.filter(item => item.ID !== productID)
                setCart([...newArr])
            }
 
        },
        updateCart: () => { },
        updateItemInCart: () => { }, 
        getCart: () => { return cart },
        toggleCartPanel: () => {
            setOpenPanel(!openPanel); 
        },
        openCartPanel: () => {
            setOpenPanel(true); 
        }, 
        closeCartPanel: () => {
            setOpenPanel(false);
        },
        openHamburgerPanel: () => {
            setHamburgerPanel(true)
        },
        closeHamburgerPanel: () => {
            setHamburgerPanel(false)
        },
        toggleHamburgerPanel: () => {
            setHamburgerPanel(!hamburgerPanel)
        },
        openAddProductMessage: () => {
            setAddProductMessage(true)
        },
        closeAddProductMessage: () => {
            setAddProductMessage(false)
           
        },
        //for closing Cart Panel when clicking outside it 
        getRef: () => { return ref; },
        getMessageRef: () => { return messageRef; },
        getHamburgerRef: () => { return hamburgerRef; },
        calculateTotalCost: () => {
            var total = 0; 
            cart.forEach(item => {
                total += (item.price * item.stock)
            })
            return total; 
        },
        calculateTotalItems: () => {
            var total = 0; 
            cart.forEach(item => {
                total += item.stock; 
            })
            return total; 
        },
    }


    return (
      <MyContext.Provider value = {context}>
      <div className="App" id="rootContainer" >
          <BrowserRouter>
              <Routes>
                        <Route
                            path="/tea-eCommerce-shop"
                            element={<Home
                                openPanel={openPanel}
                                openHamburger={hamburgerPanel} />}
                        /> 
                        <Route
                            path="/product_page"
                            element={<ProductPage
                                openPanel={openPanel}
                                addProductMessage={addProductMessage}
                                openHamburger={hamburgerPanel}
                            />} />
              </Routes>
          </BrowserRouter>    
      </div>
      </MyContext.Provider>
  );
}

export default App;
