import React, { useState, useEffect } from 'react';
import SlidingPanel from 'react-sliding-side-panel';
import { MyContext } from '../../components/contextItem.js';
import '../../style/button.css'; 
import './cart.css';
import RenderTeaItems from './renderTeaItems.js'; 
import uuid from 'react-uuid'; 

const CartPanel = props => {
    const { openPanel } = props; 
    const { closeCartPanel, getCart, getRef, calculateTotalCost, calculateTotalItems } = React.useContext(MyContext);
    const [cart, setCart] = useState([])
    const [totalCost, setTotalCost] = useState(0);
    const [subtotal, setSubTotal] = useState(0); 
    const [totalItems, setTotalItems] = useState(0); 
    

   const ref = getRef(); 

    useEffect(() => {
        var cartItems = getCart()
        setCart([...cartItems])
        setSubTotal(calculateTotalCost());
        setTotalItems(calculateTotalItems()); 

    /*code for allowing user to click outside the cart panel to close it*/
        const checkIfClickedOutside = e => {
            if (openPanel && ref.current && !ref.current.contains(e.target)) {
                closeCartPanel();
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [openPanel])
   
    const [screenWidth, setScreenWidth] = useState(window.innerWidth); 
    const [cartPanelWidth, setCartPanelWidth] = useState(50); 
    const handleResize = () => {
        setScreenWidth(window.innerWidth); 
        setCartPanelWidth(screenWidth >= 1000 ? 50 : 100); 

        if (screenWidth >= 1000 && cartPanelWidth !== 50) {
            setCartPanelWidth(50)
        }
        else if (screenWidth < 1000 && cartPanelWidth === 50) {
            setCartPanelWidth(100)
        }
    }
    window.addEventListener("resize", handleResize)
    useEffect(() => {
        if (screenWidth >= 1000 && cartPanelWidth !== 50) {
            setCartPanelWidth(50)
        }
        else if (screenWidth < 1000 && cartPanelWidth === 50) {
            setCartPanelWidth(100)
        }
    }, [screenWidth])
         

    useEffect(() => {

        return () => {
            setCart([]);
        }
    },[])
    return (
        <div >
        <SlidingPanel
                type={'right'}
                isOpen={openPanel}
                size={cartPanelWidth}
                panelContainerClassName="cartPanelContainer"
                noBackdrop={true}
        >
                <div className="panel-container" ref={ref}>
                    <h1>Shopping Cart</h1>
                    {cart.length > 0 ?
                        (<div id="cartList">
                            <div><b>Number of items in cart:</b> {totalItems}</div>
                            <div><b>Current Total Cost:</b> ${subtotal.toFixed(2)}</div>
                            {
                               cart.map(item => <RenderTeaItems
                                    image={item.image}
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    stock={item.stock}
                                    key={uuid()}
                                    />)
                            }
                        </div>)
                            :
                        <p>Your shopping cart is currently empty.</p>
                    }
                <div id="cartButton" onClick={closeCartPanel}>Close</div>
            </div>
            </SlidingPanel>
            </div>
        )
}
export default CartPanel; 