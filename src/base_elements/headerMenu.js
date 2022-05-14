import React from 'react'; 
import { Link } from "react-router-dom";
import '../style/button.css';
import { MyContext } from '../components/contextItem.js';

const HeaderMenu = () => {
    const { toggleCartPanel } = React.useContext(MyContext);
    return (
        <div id="headerMenu" style={{flexDirection: "flex-end"}}>
            <Link to="/tea-eCommerce-shop" className = "menuLinks"><div>Home</div></Link>
            <Link to="/product_page" className="menuLinks"><div>Shop</div></Link>
            <div id="cartButton" onClick={toggleCartPanel}>Cart</div>
        </div>
        )
}

export default HeaderMenu; 