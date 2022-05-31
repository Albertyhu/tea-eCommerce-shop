import React, { useEffect, useState, useContext, onFocus } from 'react';
import '../style/myStyle.css'
import Logo from './logo/Earth Tone.png'
import HeaderMenu from './headerMenu.js'; 
import { MyContext } from '../components/contextItem.js';
import CartPanel from '../screens/cart/cartPanel.js'; 
import HamburgerIcon from '../images/icon/hamburger_menu_white.png';
import { Link } from 'react-router-dom'; 
import SecondaryHeaderBar from './SecondaryHeaderBar.js'; 

const Header = props => {
    const [normalMenu, setMenu] = useState(true); 
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
    const { openHamburgerPanel } = useContext(MyContext)

    const handleResize = () => {
        if (window.innerWidth <= 468)
            setMenu(false);
        else
            setMenu(true); 
    }
    
    useEffect(() => {
        if (screenWidth <= 468)
            setMenu(false);
        else
            setMenu(true); 
    }, [screenWidth])
    
    window.addEventListener('resize', handleResize)

    return (
        <div id="headerBar">
            <SecondaryHeaderBar />
            <div id="PrimaryHeaderBar">
                <Link to= "/tea-eCommerce-shop" id = "LogoContainer"><img src={Logo} id="earthTonelogo" /></Link>
                {normalMenu ?
                    <HeaderMenu />
                    :
                    <img src={HamburgerIcon} id="hamburgerIcon" onClick={openHamburgerPanel}/>
                    }

            </div>
    </div>
    )
}

export default Header; 