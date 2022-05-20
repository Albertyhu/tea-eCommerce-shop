import React, { createRef, useEffect } from 'react'; 
import './home.css'; 
import '../../images/pouring_tea.jpg'
import { Link } from "react-router-dom";
import '../../style/button.css';  
import '../../style/myStyle.css'; 
import Header from '../../base_elements/header.js';
import Footer from '../../base_elements/footer.js';
import TeaCharacter from '../../base_elements/logo/Tea_chinese_character.png'; 
import CartPanel from '../cart/cartPanel.js'; 
import HamburgerPanel from '../../base_elements/hamburgerPanel.js'

const Home = props => {
    const { openPanel, openHamburger } = props;
    var windowWidth;  

    return (
        <div id="home_mainContainer">
            <div id='home_innerContainer'>
                <CartPanel openPanel={openPanel} />
                <HamburgerPanel openHamburger={openHamburger}/>
                <Header windowWidth={windowWidth} />
                <div id ="centerElements">
                    <div id="titleContainer">
                        <img src={TeaCharacter} id="tea_chinese_character" />
                        <h1 id="title">Your Peace Of Mind Is Only One Cup Away</h1>
                        <p>Start your mornings with mental clarity.</p>
                        <p>Browse our collection of authentic tea leaves.</p>
                    </div>
                    <div id="buttonContainer">
                        <Link to="/product_page" style={{textDecoration: "none"}}><div id = "shopNowButton">Shop Now</div></Link>
                        </div>
                </div>
                <Footer />
            </div>
        </div>
        )
}

export default Home; 


