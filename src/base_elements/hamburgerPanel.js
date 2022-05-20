import React, { useEffect, useState, useContext} from 'react'; 
import { MyContext } from '../components/contextItem.js'; 
import SlidingPanel from 'react-sliding-side-panel';
import { Link } from 'react-router-dom'; 
import HomeIcon from '../images/icon/Home-black.png';
import ShoppingIcon from '../images/icon/price-tag-black.png';
import CartIcon from '../images/icon/shopping-cart-dark.png'; 
import CloseIcon from '../images/icon/cancel-round-dark.png';
import Logo from './logo/Earth Tone-black-transparent.png'; 

const HamburgerPanel = props => {
    const { openHamburger } = props;
    const { closeHamburgerPanel, openCartPanel, getHamburgerRef  } = useContext(MyContext)
    var hamburgerRef = getHamburgerRef(); 

    useEffect(() => {
        const checkIfClickedOutside = event => {
            if (openHamburger && hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
                closeHamburgerPanel(); 
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => { document.removeEventListener("mousedown", checkIfClickedOutside)}
    }, [openHamburger])

    return (
        <SlidingPanel
            type={'right'}
            isOpen={openHamburger}
            size={50}
            noBackdrop={true}
        >
            <div className="panel-container" id="hamburgerPanel" ref={hamburgerRef}>
                <div><img src={Logo} id="logoHamburger"/></div>
                <Link to="/tea-eCommerce-shop" className="hamburgerLinks" onClick={closeHamburgerPanel} ><img src={HomeIcon} className = 'burgerIcon' /><div>Home</div></Link>
                <Link to="/product_page" className="hamburgerLinks" onClick={closeHamburgerPanel} ><img src={ShoppingIcon} className='burgerIcon' /><div>Shop</div></Link>
                <div onClick={() => {
                    closeHamburgerPanel();
                    openCartPanel();
                }} className="hamburgerLinks"><img src={CartIcon} className='burgerIcon' /><div>Cart</div></div>
                <div onClick={closeHamburgerPanel} className="hamburgerLinks"><img src={CloseIcon} className='burgerIcon' /><div>Close Menu</div></div>
            </div>
        </SlidingPanel>
    )
}

export default HamburgerPanel; 